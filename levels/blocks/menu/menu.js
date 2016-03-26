var $hamburger = $(".hamburger");
var $menu = $('.menu');
var $navigation = $('.menu__navigation');
$hamburger.on("click", function(e) {
    $hamburger.toggleClass("is-active");
    $menu.toggleClass("menu_state_opened");
});

$(function(){
    // Check the initial Poistion of the Sticky Header


    //menu.slicknav();
    var alias = $('.menu__stickyalias');
    var logo =$('.navigation__logo');
    var stickyHeaderTop = $menu.offset().top;

    $(window).scroll(function(){
        if( $(window).scrollTop() > stickyHeaderTop ) {
            $menu.removeClass('.menu_place_normal');
            $menu.addClass('menu_place_sticked');
            alias.css('display', 'block');
            //logo.show();
        } else {
            $menu.addClass('.menu_place_normal');
            $menu.removeClass('menu_place_sticked');
            alias.css('display', 'none');
            //logo.hide();
        }
    });
});

