$(function(){
    // Check the initial Poistion of the Sticky Header
    var menu = $('.menu');
    //menu.slicknav();
    var alias = $('.menu__stickyalias');
    var logo =$('.navigation__logo');
    var stickyHeaderTop = menu.offset().top;

    $(window).scroll(function(){
        if( $(window).scrollTop() > stickyHeaderTop ) {
            menu.css({position: 'fixed', top: '0px', 'box-shadow': '0 10px 10px -10px black'});
            alias.css('display', 'block');
            logo.show();
        } else {
            menu.css({position: 'static', top: '0px', 'box-shadow': 'none'});
            alias.css('display', 'none');
            logo.hide();
        }
    });
});
