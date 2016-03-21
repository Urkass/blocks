var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    path = require('path'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    url = require('gulp-css-url-adjuster'),
    handlebars = require('gulp-compile-handlebars'),
    flatten = require('gulp-flatten'),
    inlineImagePath = require('gulp-inline-image-path'),
    merge = require('merge-stream'),
    fs = require('fs');
//var pagesSrces

var params = {
    out: 'dist/',
    htmlSrc: ['levels/pages/*.{handlebars,hbs,html}'],
    levels: ['levels/blocks'],
    node_modules:
        [
            'node_modules/owl-carousel-2',
            'node_modules/font-awesome/',
            'node_modules/jquery'
        ],
    fonts:
        [
            'fonts/'
        ]
};

gulp.task('server', function() {
    browserSync.init({
        server: '',
        port: 9000
    });
    gulp.watch('levels/pages/**/*.{html,hbs,handlebars}', ['html']);
    gulp.watch(params.levels.map(function(level) {
        var hbsGlob = level + '/**/*.hbs';
        return hbsGlob;
    }), ['html']);
    gulp.watch(params.levels.map(function(level) {
        var cssGlob = level + '/**/*.scss';
        return cssGlob;
    }), ['css']);
    gulp.watch(params.levels.map(function(level) {
        var jsGlob = level + '/**/*.js';
        return jsGlob;
    }), ['js']);

});

gulp.task('html', function() {
    var templateData = {
            firstName: 'Kaanon'
        },
        options = {
            ignorePartials: false, //ignores the unknown footer2 partial in the handlebars template, defaults to false
            batch : [].concat.apply([], params.levels.map(function(dirName) {
                return fs.readdirSync(dirName).filter(function(file) {
                    //console.log(fs.statSync(path.join(dirName, file)).isDirectory());
                    return + fs.statSync(path.join(dirName, file)).isDirectory();
                }).map(function (item){
                    console.log(path.resolve(dirName) + '/' + item);
                    return path.resolve(dirName) + '/' + item;
                });
            })),
            helpers : {
                capitals : function(str){
                    return str.toUpperCase();
                }
            }
        };

    return gulp.src(params.htmlSrc)
        .pipe(handlebars(templateData, options))
        .pipe(rename({extname: ".html"}))
        .pipe(inlineImagePath({path:"dist/images"}))
        .pipe(gulp.dest(''))
        .pipe(reload({ stream: true }));
});


gulp.task('css', function() {
    var variblesStream = gulp.src('levels/varibles/vars.scss');
    var scssStream = gulp.src(params.levels.map(function(dirName) {
        var cssGlob = path.resolve(dirName) + '/**/*.{scss, css}';
        console.log(cssGlob);
        return cssGlob;

    }));
    var fontsStream = gulp.src('levels/varibles/fonts.css');
    //var libsStream = gulp.src(params.css_libs.map(function(dirName) {
    //    var libsGlob = path.resolve(dirName);
    //    console.log(libsGlob);
    //    return libsGlob;
    //}));
    var varandscssMerge = merge(variblesStream, scssStream)
        .pipe(autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
        }))
        .pipe(concat("style.scss"))
        .pipe(sass().on('error', sass.logError))
        .pipe(url({
            prepend: 'images/'
        }));

    return merge(fontsStream, varandscssMerge)
        .pipe(concat("style.css"))
        .pipe(gulp.dest(params.out))
        .pipe(reload({ stream: true }));
});

gulp.task('css-minify', function () {
    gulp.src(params.out + 'style.css')
        .pipe(minifyCss())
        .pipe(gulp.dest(params.out))
});

gulp.task('images', function() {
    gulp.src(params.levels.map(function(dirName) {
            var imgGlob = path.resolve(dirName) + '/**/*.{jpg,gif,jpeg,png,svg}';
            console.log(imgGlob);
            return imgGlob;
        }))
        .pipe(flatten())
        .pipe(gulp.dest(params.out + 'images/'));
});
gulp.task('img-optim', function () {
    gulp.src(params.out + 'images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(params.out + 'images'));
});
gulp.task('fonts', function() {
    gulp.src(params.fonts.map(function(dirName) {
            var fontsGlob = path.resolve(dirName) + '/**';
            console.log(fontsGlob);
            return fontsGlob;
        }))
        .pipe(gulp.dest(params.out + 'fonts/'));
});
gulp.task('js', function() {
    var jsStream = gulp.src(params.levels.map(function(dirName) {
        var jsGlob = path.resolve(dirName) + '/**/*.js';
        console.log(jsGlob);
        return jsGlob;

    }));
    //var libsStream = gulp.src(params.js_libs.map(function(dirName) {
    //    var libsGlob = path.resolve(dirName);
    //    console.log(libsGlob);
    //    return libsGlob;
    //}));
    return merge(jsStream)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(params.out))
        .pipe(reload({ stream: true }));
});
gulp.task('js-uglify', function () {
    gulp.src(params.out + '*.js')
        .pipe(uglify())
        .pipe(gulp.dest(params.out))
});

gulp.task('clean', function () {
    del([params.out]);
});

gulp.task('default', ['build', 'server']);
gulp.task('build', ['html', 'css', 'images', 'js', 'fonts']);
gulp.task('production', ['img-optim', 'js-uglify', 'css-minify', 'server']);
