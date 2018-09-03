function Giga(sSelector) {
    var g = this;
    g.init(sSelector);

    var h = window.screen.availHeight;
    var w = window.screen.availWidth;
    // console.log(window.screen.height, window.screen.availHeight);
    // console.log(window.screen.width, window.screen.height);
    var ScreenWidth = screen.width;
    var ScreenHeight = screen.height;
    // alert(ScreenWidth + 'x' + ScreenHeight);

    g.menuAccordion = g.findObj('#menu1');
    g.menuAccordionItems = g.menuAccordion.children('li');

    g.menuHamburger = g.findObj('.menuToggle');
    g.menuLink = g.findObj('.menu');
    g.showHideSubMenu = function(event) {
        event.preventDefault();
        // console.log('event.target :', event.target);
        if ($(event.target).hasClass('accordion__link')) {
            // console.info('accordion__link working');
            g.menuAccordionItems.children("ul").stop().slideUp();
            $(this).children("ul").stop().slideToggle();
        }
    }
    g.showHideHamburger = function(event) {
        event.preventDefault();
        console.log('g.menuHamburger :', g.menuHamburger);
        $(g.menuLink).stop().slideToggle(300);
    }

    $(window).resize(function() {
        if ($(window).width() >= 710) {
            g.menuLink.css(
                'display', 'block'
            );
        } else {
            g.menuLink.css(
                'display', 'none'
            );
        }
    });

    // 	, function() {
    // 		g.menuLink.css(
    // 				'display : block'
    // 		);
    // }


    //** *****************    events   *****************    */
    g.menuAccordionItems.click(g.showHideSubMenu);
    g.menuHamburger.click(g.showHideHamburger);
}
Giga.prototype = new Component();