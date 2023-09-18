/* HEADER */
/* NAV */
(function ($, root, undefined) {
    $(function () {
        "use strict";
        /* var templateUrl = "http://127.0.0.1:5500/"; */
        var templateUrl = "https://machip3r.github.io/panzaverde-landingpage/";

        $("html").on("click", ".trigger", function () {
            $(this).parent().toggleClass("active");
            return false;
        });

        $(".btt-button").on("click", function () {
            $("html, body").animate({ scrollTop: "0" }, 500);
        });

        $("#main-footer").on("click", "#menu-footer > li > a", function () {
            var parentFooter = $(this).parent();
            if (parentFooter.hasClass("active")) {
                parentFooter.removeClass("active");
            } else {
                $("#main-footer > li").removeClass("active");
                parentFooter.addClass("active");
            }
        });

        $("#hamburger-menu").on("click", function () {
            $("#main-header .menu-header-menu-container, .menu-blog-menu-container").toggleClass("open");
        });
        $("#content").on("click", function () {
            $("#main-header .menu-header-menu-container, .menu-blog-menu-container").removeClass("open");
        })

        $("#main-header li").on("click", function () {
            $("#main-header .menu-header-menu-container").removeClass("open");
            $("#main-header .menu-blog-menu-container").removeClass("open");
            $("#close").attr("src", templateUrl + "/images/svg/Hambuger-Icon.svg");
        });
    });
})(jQuery, this);