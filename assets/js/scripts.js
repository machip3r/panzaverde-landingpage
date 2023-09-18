(function ($, root, undefined) {
  $(".accordion-btn").on('click', function () {
    const accordionBtn = $(this);
    const accordionContent = accordionBtn.next('.accordion-content');
    const desktopContentSpan = $('.desktop-content > p');
    const accordionContainer = $('.accordion-container');

    if ((accordionContainer).hasClass('desktop')) {
      $(".accordion-btn").removeClass('active');
      accordionBtn.addClass("active");
      const content = accordionContent.text();
      desktopContentSpan.fadeOut('fast', function () {
        desktopContentSpan.text(content).fadeIn('fast');
      });
    } else if ((accordionContainer).hasClass('mobile')) {
      $('.accordion-content').not(accordionContent).slideUp();
      accordionContent.slideToggle();
    }
  });

  // Function with stuff to execute
  function resizeContent() {
    const firstAccordionItem = $('.accordion-item:first-child');
    const accordionBtn = firstAccordionItem.find('.accordion-btn');
    const accordionContent = firstAccordionItem.find('.accordion-content p');
    const windowWidth = $(window).width();

    accordionBtn.addClass("active");
    const contentLoad = accordionContent.text();

    if (windowWidth > 660) {
      $('.value-props > div').addClass('container');
      $('.accordion-content').hide();
      $('.accordion-container').removeClass('mobile').addClass('desktop');
      $('.desktop-content p').text(contentLoad);
      $('.desktop-content').show();

    } else {
      $('.value-props > div').removeClass('container');
      $('.accordion-item:first-child > .accordion-content').show();
      $('.accordion-container').removeClass('desktop').addClass('mobile');
      $('.desktop-content').hide();
    }
  }

  // Eventlistener
  $(window).load(function () {
    resizeContent();
  })
  window.addEventListener("resize", debounce(resizeContent, 150));
})(jQuery, this);

(function ($, root, undefined) {
  $("#primary-menu li.menu-item").each(function () {
    $(this).attr(
      "data-gtm",
      '{"event": "main_nav_click", "nav_type": "top nav", "nav_text": "' +
      $(this).text() +
      '"}'
    );
  });

  $("#menu-footer li.menu-item").each(function () {
    $(this).attr(
      "data-gtm",
      '{"event": "main_nav_click", "nav_type": "bottom nav", "nav_text": "' +
      $(this).text() +
      '"}'
    );
  });


  /* var pathName = location.pathname;
  switch (pathName) {
    case "/fitness-meal-delivery/":
      gtmData.item_name = "Protein +";
      gtmData.ecommerce.detail.products[0].name = "Protein +";
      gtmData.ecommerce.detail.products[0].id = "PP-X";
      gtmData.ecommerce.detail.products[0].category = "Protein +";
      window.dataLayer.push(gtmData);
      break; */
})(jQuery, this);

(function ($, root, undefined) {
  $(".location-features .feature-text .accordion-content")
    .not(":first")
    .css("display", "none");

  if ($("#how-it-works").length) {
    $(".hiw-hero__scroll").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: $(".hiw-steps").offset().top - 100,
        },
        500
      );
    });
    $(".hiw-steps__scroll").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: $(".hiw-steps__container .scrollsection-" + $(this).data().scroll + "").offset().top - 250,
        },
        500
      );
    });

    setTimeout(function () {
      $(".accordion-content:first").css("display", "none");
      $("div.hiwFaq:first").css("display", "block");
    }, 100);
    if (location.hash === "#hiw-tabs2") {
      $(".resp-tabs-list .resp-tab-item:nth-child(2)").click();
    }
  }
  if ($(".location-page .location-name").length) {
    var pathName = (window.location.pathname).split('/', 3);
    var locationArray = pathName[ 2 ].split('-meal', 1);
    if (locationArray.indexOf("-")) {
      var locationName = locationArray[ 0 ].split('-');
    }
    $(".location-page span.location-name").append(locationName.join(" "));

  }
})(jQuery, this);

(function ($, root, undefined) {
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function showMobileMenu() {
    var lastScrollTop = 0;
    // var menuBottomBanner = $(".tab-content").find("#bottom-fixed-bar");
    var bottomBanner = $(".menu-page").length ? $(".tab-content").find("#bottom-fixed-bar") : $(".page").find("#bottom-fixed-bar");
    var firstTopPos = $(".menu-page").length ? $('.menu-item:eq(1)').offset().top : '';
    $(window).scroll(function (event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop || st < 20) {
        $("#menu_bar.fixed-top").css({
          position: "static",
        });
        (st > firstTopPos && st > 0 ? bottomBanner.css({ position: "sticky", bottom: 0 }) : bottomBanner.css({ position: "static" }));
      } else {
        bottomBanner.css({ position: "static" });
        if (window.matchMedia("screen and (max-width: 426px)").matches) {
          $("#menu_bar.fixed-top").css({
            position: "fixed",
            top: 60 + "px",
          });
        } else {
          $("#menu_bar.fixed-top").css({
            position: "fixed",
            top: 150 + "px",
          });
        }
      }
      lastScrollTop = st;
    });
  }

  if ($(".page-template-menu").length || $("#bottom-fixed-bar").length || $("#menu_bar").length) {
    showMobileMenu();
  }

  var debounceShowMobileMenu = debounce(showMobileMenu, 3000);
  window.addEventListener("resize", debounceShowMobileMenu);
})(jQuery, this);

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

    var allPanels = $(".accordion > dd");
    allPanels.hide();
    $(".accordion > dt").click(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this).next().slideUp();
        var tag = $(this).data("faq");
        tag.action = "collapse";
        window.dataLayer.push(tag);
      } else {
        allPanels.slideUp();
        $(".accordion > dt.active").removeClass("active");
        $(this).addClass("active").next().slideDown();
        var tag = $(this).data("faq");
        tag.action = "expand";
        window.dataLayer.push(tag);
      }
      return false;
    });

    var slickMainSettings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 300,
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 750,
          settings: "unslick",
        },
      ],
    };

    // ================  Homepage  ==============

    $(".homepage-js-accordion")
      .on("click", ".accordion-header", function () {
        if (!$(this).next().is(":visible")) {
          $(".accordion-header.active").removeClass("active").next().slideUp();
          $(this).addClass("active");
          $(this).next().slideDown("slow");
        } else {
          $(this).removeClass("active");

          $(this).next().slideUp("fast");
        }
      })
      .find(".accordion-content")
      .hide();

    $(".accordion-header:first").addClass("active");
    $(".accordion-content:first").css("display", "block");

    var $homeSlickMain = $(".steps .steps-container");
    var homeSlickMainSettings = {
      dots: true,
      arrows: false,
      infinite: false,
      speed: 300,
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    // $homeSlickMain.slick(homeSlickMainSettings);
    $(window).on("resize load", function () {
      if ($(window).width() > 993) {
        if ($homeSlickMain.hasClass("slick-initialized")) {
          $homeSlickMain.slick("unslick");
        }
        return;
      }
      if (!$homeSlickMain.hasClass("slick-initialized")) {
        return $homeSlickMain.slick(homeSlickMainSettings);
      }
    });

    $(".accordion-header[data-slide]").click(function () {
      var slideno = $(this).data("slide");
      $homeSlickMain.slick("slickGoTo", slideno - 1);
    });

    $(".steps .steps-container").on(
      "swipe",
      function (event, slick, direction) {
        var slickIndex = $(".steps-container .slick-current").data(
          "slick-index"
        );

        var step = slickIndex + 1;
        var idContent = "#step-" + step + "-content";

        $(idContent).slideDown("slow").css("display", "block");
        $(idContent).addClass("active");
        $(".accordion-content").not(idContent).slideUp("fast");
        $(".accordion-content").not(idContent).removeClass("active");
      }
    );
    var controller = new ScrollMagic.Controller();
    var wipeAnimation = new TimelineMax();
    wipeAnimation.fromTo(
      ".overflow",
      1,
      { width: "100%" },
      { width: "0%", ease: Linear.easeNone }
    );

    var scene = new ScrollMagic.Scene({
      triggerElement: ".save-hours__trigger",
      duration: "100%",
      triggerHook: "onLeave",
    })
      .setTween(wipeAnimation)
      .setPin(".save-hours__trigger")
      .addTo(controller);
    var macroParallax = function () {
      if ($(window).width() > 769) {
        $(".bar-container").each(function () {
          var child = $(this).find(".bar-animate");
          var value = $(this).find(".bar-value").text().match(/(\d+)/);
          if (value[ 0 ] > 100) {
            value[ 0 ] = 100;
          }
          var renderClass = "bar-" + value[ 0 ];
          new ScrollMagic.Scene({
            triggerElement: child,
            offset: 250,
          })
            .on("start", function () {
              child.addClass(renderClass);
            })
            .setPin(child)
            .addTo(controller);
        });
      } else {
        $(".bar-container").each(function () {
          var child = $(this).find(".bar-animate");
          var value = $(this).find(".bar-value").text().match(/(\d+)/);
          if (value[ 0 ] > 100) {
            value[ 0 ] = 100;
          }
          var renderClass = "bar-" + value[ 0 ];
          child.addClass(renderClass);
        });
      }
    };

    macroParallax();
    // On resize
    var debouncemacroParallax = debounce(macroParallax, 3000);

    window.addEventListener("resize", debouncemacroParallax);

    var parallaxFunc = function (position) {
      var start;
      var finish;
      if (position.horizontal) {
        start = { x: position.start };
        finish = { x: position.finish, ease: Linear.easeNone };
      } else {
        start = { y: position.start };
        finish = { y: position.finish, ease: Linear.easeNone };
      }
      if ($(window).width() > 769) {
        $(position.trigger).each(function () {
          var waterFallAnimation = new TimelineMax();
          var child = $(this).find(position.strClass);
          waterFallAnimation.fromTo(child, 1, start, finish);

          new ScrollMagic.Scene({
            triggerElement: this,
            duration: position.speed,
            triggerHook: "onEnter",
          })
            .setTween(waterFallAnimation)
            .setPin(child)
            .addTo(controller);
        });
      }
    };
    function runParallax() {
      // trigger, strClass, speed, start, finish, horizonta;

      // FOND PAGE
      parallaxFunc({
        trigger: ".odd > .ffp-grid",
        strClass: ".protein-img-slow",
        speed: "500%",
        start: "40%",
        finish: "-300%",
      });
      parallaxFunc({
        trigger: ".odd > .ffp-grid",
        strClass: ".protein-img-fast",
        speed: "300%",
        start: "90%",
        finish: "-300%",
      });
      parallaxFunc({
        trigger: "#fond-page .odd > .ffp-grid",
        strClass: ".protein-img-word",
        speed: "300%",
        start: "80%",
        finish: "-200%",
        horizontal: true,
      });

      // GUINNESS PAGE
      parallaxFunc({
        trigger: "#guinness .even > .ffp-grid",
        strClass: ".protein-img-fast",
        speed: "300%",
        start: "40%",
        finish: "-250%",
      });

      parallaxFunc({
        trigger: "#guinness .odd > .ffp-grid",
        strClass: ".protein-img-word",
        speed: "500%",
        start: "40%",
        finish: "-300%",
      });
      parallaxFunc({
        trigger: "#guinness .even > .ffp-grid",
        strClass: ".protein-img-word",
        speed: "300%",
        start: "80%",
        finish: "-200%",
        horizontal: true,
      });
    }

    runParallax();
    // On resize
    var debounceproteinParallax = debounce(runParallax, 3000);
    window.addEventListener("resize", debounceproteinParallax);

    if ($(".macro-animate__bar--athlete").length) {
      (function () {
        var gramTotal = 0;
        $(".bar-value").each(function () {
          gramTotal += parseInt($(this).text().match(/(\d+)/)[ 0 ]);
        });
        $(".macro-animate__bar--athlete").each(function () {
          var full = $(this).find(".bar-full");
          var value = $(this).find(".bar-value").text().match(/(\d+)/);
          new ScrollMagic.Scene({
            triggerElement: this,
            offset: -400,
          })
            .on("enter", function () {
              full.css("transition", "2s linear width");
              full.css("width", (value[ 0 ] / gramTotal) * 100 + "%");
            })
            .setPin(full)
            .addTo(controller);
        });
      })();
    }

    // Paleo page animation

    var macroAnimation = function () {
      if ($(window).width() > 769) {
        $(".macro-animate__bar").each(function () {
          var full = $(this).find(".bar-full");
          var value = $(this).find(".bar-value").text().match(/(\d+)/);
          if (value[ 0 ] > 100) {
            value[ 0 ] = 100;
          }
          new ScrollMagic.Scene({
            triggerElement: this,
            offset: -400,
          })
            .on("enter", function () {
              full.css("transition", "2s linear width");
              full.css("width", value[ 0 ] + "%");
            })
            .setPin(full)
            .addTo(controller);
        });
      } else {
        $(".macro-animate__bar").each(function () {
          var full = $(this).find(".bar-full");
          var value = $(this).find(".bar-value").text().match(/(\d+)/);
          if (value[ 0 ] > 100) {
            value[ 0 ] = 100;
          }
          full.css("transition", "2s linear width");
          full.css("width", value[ 0 ] + "%");
        });
      }
    };

    macroAnimation();
    // On resize
    var debouncemacroAnimation = debounce(macroAnimation, 3000);

    window.addEventListener("resize", debouncemacroAnimation);

    if ($(".meal-plan-tabs-v2").length) {
      var mealHeader = $(".meal-plan-tabs-v2 .header");
      $(".meals .append-here").first().append(mealHeader);
      var background_name = $(".tab-content").data("background");

      $(document).ready(function () {
        $("section.meal-plan-tabs-v2").css(
          "backgroundImage",
          "url(" + background_name + ")"
        );
      })

      $(".meal-plan-tabs-v2 .tab-link").click(function () {
        var mealName = $(this).data("plan");
        var textColor = $(this).data("textcolor");
        var background_name = $("#menu-" + mealName).data("background");

        $("section.meal-plan-tabs-v2").css(
          "backgroundImage",
          "url(" + background_name + ")"
        );
        $("div[data-planname=" + mealName + "]").append(mealHeader);

        if (textColor === "black") {
          $(this).closest(".tab-title").addClass("text-black");
          $(".mini-menu-title").removeClass("text-white");
          $(".append-here").addClass("text-black");
          $(".append-here").removeClass("text-white");
        } else {
          $(this).closest(".tab-title").removeClass("text-black");
          $(".mini-menu-title").addClass("text-white");
          $(".append-here").addClass("text-white");
          $(".append-here").removeClass("text-black");
        }
      });
    }

    window.addEventListener("resize", saveHoursHeaderMove);
    window.addEventListener("load", saveHoursHeaderMove);
    // =============== Homepage End==============

    // =============== Keto Page ================

    var mealInfoHeaderMove = debounce(function () {
      if ($(".meal-info .meal-info-header").length === 1) {
        if ($(window).width() < 769) {
          $(".meal-info .meal-info-header")
            .clone()
            .prependTo(".meal-info .meal-info-container .mobile-header");
        }
      }

      if ($(".meal-info .meal-info-header").length === 2) {
        if ($(window).width() > 768) {
          $(".meal-info .mobile-header .meal-info-header").remove();
        }
      }
    }, 100);

    window.addEventListener("resize", mealInfoHeaderMove);
    window.addEventListener("load", mealInfoHeaderMove);

    var parallaxHeaderMove = debounce(function () {
      if ($(".parallax .header").length === 1) {
        if ($(window).width() < 830) {
          $(".parallax .header").clone().prependTo(".parallax .mobile-header");
        }
      }

      if ($(".parallax .header").length === 2) {
        if ($(window).width() > 830) {
          $(".parallax .mobile-header .header").remove();
        }
      }
    }, 100);

    window.addEventListener("resize", parallaxHeaderMove);
    window.addEventListener("load", parallaxHeaderMove);

    var $slickMealVariety = $(".meals-container");

    $(window).on("resize load", function () {
      if ($(window).width() > 750) {
        if ($slickMealVariety.hasClass("slick-initialized")) {
          $slickMealVariety.slick("unslick");
        }
        return;
      }

      if ($(window).width() < 750) {
        $(".meals-list-container .tab-link").click(function () {
          $(".meals-container").slick("refresh");
        });
      }
    });

    var ketoSlickSettings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: ".main-meal-slider",
    };

    $(".main-meal-slider").slick(ketoSlickSettings);

    $(".meal-info .ingredients-button").click(function () {
      $(".meal-info .primary-container").addClass("mobile-opacity");
      $(".meal-info .ingredients-button").addClass("hide");
      $(".meal-info .close-button").addClass("show");
      $(".meal-info .close-button").removeClass("hide");
    });

    $(".meal-info .close-button").click(function () {
      $(".meal-info .close-button").addClass("hide");
      $(".meal-info .primary-container").removeClass("mobile-opacity");
      $(".meal-info .ingredients-button").removeClass("hide");
      $(".meal-info .close-button").removeClass("show");
    });

    $(".meal-info .meal-slider").mouseover(function () {
      if ($(window).width() > 769) {
        $(".meal-info .primary-container").addClass("mobile-opacity");
      }
    });
    $(".meal-info .meal-slider").mouseout(function () {
      if ($(window).width() > 769) {
        $(".meal-info .primary-container").removeClass("mobile-opacity");
      }
    });

    // ============== Keto Page End =============

    var $slickMain = $(
      ".front-page .fnl-popular-plans .four-col-container, .works .four-col-container,  " +
      "#meal-plans-page .works ul, .service-text-container .two-col-container, .fnl-infographic-section .info-block-container, .fnl-feature-list, .author-list .container, .meals-container"
    );
    $slickMain.slick(slickMainSettings);
    $(window).on("resize load", function () {
      if ($(window).width() > 750) {
        if ($slickMain.hasClass("slick-initialized")) {
          $slickMain.slick("unslick");
        }
        return;
      }
      if (!$slickMain.hasClass("slick-initialized")) {
        return $slickMain.slick(slickMainSettings);
      }
    });

    $("#tab-section").easyResponsiveTabs({
      type: "vertical",
      tabidentify: "blog-tab",
      closed: "accordion",
    });
    $("#hiw-tabs").easyResponsiveTabs({
      type: "vertical",
      tabidentify: "compare-tab",
      closed: "accordion",
      activetab_bg: "#00263E",
      inactive_bg: "#fff",
    });

    var $tabButtonItem = $(".tab-title .tab-link"),
      $tabSelect = $("#tab-select"),
      $tabContents = $(".tab-content"),
      activeClass = "current";

    $tabButtonItem.first().addClass(activeClass);
    $tabContents.not(":first").hide();
    $(".meal-plan-tabs-v2 .tab-content").first().show();
    $(".tab-content.current").css("display", "block");
    // Menu Page Anchor Links
    var planHash = location.hash;

    switch (planHash) {
      case "#keto":
        loadMenuPlan('keto');
        break;
      case "#paleo":
        loadMenuPlan('paleo');
        $(".tab-title").scrollLeft(300);
        break;
      case "#vegan-s":
        loadMenuPlan('vegan-s');
        $(".tab-title").scrollLeft(420);
        break;
      case "#whole30":
        loadMenuPlan('whole30');
        $(".tab-title").scrollLeft(420);
        break;
      case "#mediterranean":
        loadMenuPlan('mediterranean');
        $(".tab-title").scrollLeft(420);
        break;
      case "#vegan-l":
        loadMenuPlan('vegan-l');
        $(".tab-title").scrollLeft(420);
        break;
      case "#bulk":
        loadMenuPlan('bulk');
        $(".tab-title").scrollLeft(420);
        break;
    }

    if (planHash.includes("tab-section")) {
      var tabIndex = parseInt(planHash.replace(/\D/g, ""));
      $(".blog-tab")
        .eq(tabIndex + 1)
        .click();
    }
    // var mealClass = $(this).data("class");

    function loadMenuPlan(index) {
      $tabButtonItem.filter("." + index).addClass(activeClass);
      $tabButtonItem.first().removeClass(activeClass);
      $tabButtonItem.filter("." + index).find("a").click();
      $tabButtonItem.filter("." + index).find(".accordion-content").show();

      var menuTarget = "#" + index;
      $tabSelect.val(menuTarget);
      $tabContents.hide();
      $(menuTarget).show();


    }

    $tabButtonItem.find("a").on("click", function (e) {
      var target = $(this).attr("href");
      $tabButtonItem.removeClass(activeClass);
      $(this).parent().addClass(activeClass);
      $tabSelect.val(target);
      $tabContents.hide();
      $(target).show();
      e.preventDefault();
    });

    $tabSelect.on("change", function () {
      var target = $(this).val(),
        targetSelectNum = $(this).prop("selectedIndex");

      $tabButtonItem.removeClass(activeClass);
      $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
      $tabContents.hide();
      $(target).show();
    });


    //Press Navigation Component Functionality
    $("#press-tabs").change(function () {
      var target = $("#press-tabs").val();
      window.location =
        window.location.protocol + "//" + window.location.host + "/" + target;
    });

    //Footer Mobile Accordian Functionality
    $(document).ready(function () {
      $(
        ".menu-footer-menu-container-mobile .menu-footer-menu-container #menu-footer-mobile li a"
      ).click(function () {
        $(this)
          .toggleClass("active")
          .next(".sub-menu")
          .slideToggle()
          .closest("li")
          .siblings()
          .find("a")
          .removeClass("active")
          .next(".sub-menu")
          .slideUp();
      });
    });
  });

  $('.how-it-works-page .header a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $(this)
      .addClass("active")
      .closest("li")
      .siblings("li")
      .find("a")
      .removeClass("active");

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function updateAccordionImg(imgUrl) {
    $(".accordion-item__img").fadeOut();
    setTimeout(function () {
      $(".accordion-item__img").attr("src", imgUrl);
    }, 450);
    $(".accordion-item__img").fadeIn();
  }

  if ($(".js-serviceAccordion")) {
    $(document).ready(function () {
      var activeImg = $(".accordion-item__desc.active").data("img");
      $(".accordion-item__img").attr("src", activeImg);
    });
  }
  $(".js-serviceAccordion").on("click", ".accordion-item__header", function () {
    $(".accordion-item__desc.active").removeClass("active");
    $(this).siblings(".accordion-item__desc").addClass("active");
    if ($(window).width() > 679) {
      updateAccordionImg($(this).siblings(".accordion-item__desc").data("img"));
    }
  });

  //---------Navbar

  function newNavbarAction() {
    if (window.pageYOffset > 200) {
      $(".sticky").addClass("bg-white");
    }
    $(window).load(function () {
      $("#main-header").css("height", $(".header-banner").outerHeight() + "px");
    })
    window.addEventListener("scroll", function () {
      if ($(window).width() < 770) {
        var navbar = document.querySelector(".header-banner");
        if (navbar === null) return;
        navbar.classList[ window.scrollY > 110 ? "add" : "remove" ]("hide");
        if (window.pageYOffset > 110) {
          $("#main-header").removeAttr("style");
        }
        if (window.pageYOffset < 110) {
          $("#main-header").css("height", $(".header-banner").outerHeight() + "px");
        }
      }
      if (window.pageYOffset > 200) {
        $(".sticky").addClass("bg-white");
      } if (window.pageYOffset < 200) {
        $(".sticky").removeClass("bg-white");
      }
    });
  }


  function navScrollAction() {
    $(window).load(function () {
      $("#main-header").css("height", $(".sticky").height() + "px");
    });
    window.addEventListener("scroll", function () {
      if ($(window).width() < 770) {
        var navbar = document.querySelector(".header-banner");
        if (navbar === null) return;
        navbar.classList[ window.scrollY > 110 ? "add" : "remove" ]("hide");
        if (window.pageYOffset > 110) {
          $("#main-header").removeAttr("style");
        }
        if (window.pageYOffset < 110) {
          $("#main-header").css("height", $(".sticky").height() + "px");
        }
      }
    });
  }
  if ($(".new-navbar").length) {
    newNavbarAction();
  } else if ($(".header-banner").length) {
    navScrollAction();
  }


  var debounceNavAction = debounce(navScrollAction, 3000);
  window.addEventListener("resize", debounceNavAction);

  var debounceNewNavAction = debounce(newNavbarAction, 3000);
  window.addEventListener("resize", debounceNewNavAction);


  //---------MealOverView Tab

  var main_slide = $(".tab-title").data('main-slide');

  function loadMealTab(main_slide) {
    setTimeout(function () {
      $(".tab-link a." + main_slide).click();
    }, 1000);
  }
  loadMealTab(main_slide);

  var mini_menu_main_slide = $(".menu-grid__meals").data('main-slide');
  function loadMiniMenu(mini_menu_main_slide) {
    setTimeout(function () {
      $(".tab-link a." + mini_menu_main_slide).click();
    }, 1000);
  }
  loadMiniMenu(mini_menu_main_slide);


  if ($(".page-template-dashboard-guide").length) {
    $(".scroll-arrow").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: $("#magento-content-1").offset().top - 200,
        },
        500
      );
    });
    $(".magento-guide__hero--links a").on("click", function (e) {
      e.preventDefault();
      var componentID = $(this).attr("href");
      $("html, body").animate(
        {
          scrollTop: $(componentID).offset().top - 200,
        },
        500
      );
    });
  }
  // TODO: add back when quiz is in production
  // if ($("#meal-plan-quiz-container").length) {
  //   $("[data-fancybox]").fancybox({
  //     touch: false,
  //   });
  // }

  // Meal plans page with menu bar
  if ($("#meal-plans").length) {
    $(".anchor-scroll").on("click", function (e) {
      e.preventDefault();
      var componentID = $(this).attr("href");
      var headerHeight = jQuery(".sticky").height();
      $("html, body").animate(
        {
          scrollTop: $(componentID).offset().top - headerHeight,
        },
        500
      );
    });
  }

  // Column-image-text-and-description - dropdown on mobile
  if ($(".mobile-dropdown").length) {
    $(".image-and-text-content").on("click", function () {
      if ($(window).width() < 770) {
        $(".image-and-text-content").css("padding-bottom", "0");
        $(".description-container").removeClass("current");
        $(this).find(".description-container").toggleClass("current");
        $(".image-and-text-content").removeClass("active");
        $(this).toggleClass("active");

        var boxHeight = $(this).find(".description-container").height();
        $(this).css("padding-bottom", boxHeight + "px");
      }
    });
    // disable when screen size is bigger than tablet
    $(window).resize(function () {
      if ($(window).width() > 770) {
        $(".image-and-text-content").css("padding-bottom", "0");
        $(".description-container").removeClass("current");
        $(".image-and-text-content").removeClass("active");
      }
    });
  }

  //two-column-image-text wysiwyg color change
  if ($(".two-column-image-text .overlap_applied").length) {
    const wysiwygContainer = $(".two-column-image-text").find(".overlap_applied .content-block");
    wysiwygContainer.each(function () {
      var fontColor = $(this).data('fontcolor');
      $(this).find("p").css('color', fontColor);
    });
  }

  // Column-image-text-and-description - dropdown on mobile
  if ($(".mobile-dropdown").length) {
    $(".image-and-text-content").on("click", function () {
      if ($(window).width() < 770) {
        $(".image-and-text-content").css("padding-bottom", "0");
        $(".description-container").removeClass("current");
        $(this).find(".description-container").toggleClass("current");
        $(".image-and-text-content").removeClass("active");
        $(this).toggleClass("active");

        var boxHeight = $(this).find(".description-container").height();
        $(this).css("padding-bottom", boxHeight + "px");
      }
    });
    // disable when screen size is bigger than tablet
    $(window).resize(function () {
      if ($(window).width() > 770) {
        $(".image-and-text-content").css("padding-bottom", "0");
        $(".description-container").removeClass("current");
        $(".image-and-text-content").removeClass("active");
      }
    });
  }

  $(".accordion-header, .faqs-container.accordion dt").keyup(function (event) {
    if (event.keyCode === 13) {
      $(this).click();
    }
  });

  $(".faqs-container .accordion dt").keyup(function (event) {
    if (event.keyCode === 13) {
      $(this).click();
    }
  });


  $("#tab-section .tab-title").keyup(function (event) {
    if (event.keyCode === 13) {
      $(document.activeElement).focus();
      $("*:focus .tab-link").click();
    }
  });

  $(".primary-container img").attr('tabindex', '-1');

})(jQuery, this);

(function ($, root, undefined) {
  if ($(".page-template-senior-page").length) {
    $(
      ".steps-container .step:nth-child(5), .homepage-js-accordion li:nth-child(5), .trail"
    ).remove();
    $(".dot").remove();
  }
})(jQuery, this);

(function ($, root, undefined) {
  // HERO SLIDER
  $(".slick-hero__sliders div").slick({
    arrows: false,
    speed: 1000,
    accessibility: false,
    draggable: false,
    pauseOnHover: false,
    infinite: true,
    fade: true,
    cssEase: "linear",
  });

  recurSlick(2);
  function recurSlick(num) {
    setTimeout(function () {
      $(".slick-hero__sliders .slider-container:nth-child(1)").slick("next");
    }, 1000);
    setInterval(function () {
      num = num % 4;
      if (num == 0) {
        num = 4;
      }
      $(".slick-hero__sliders .slider-container:nth-child(" + num + ")").slick(
        "next"
      );
      num++;
    }, 3000);
  }

  // STEPS SLIDER
  $(".steps__main").slick({
    arrows: false,
  });
  $(".steps__second").slick({
    arrows: false,
    slidesToShow: 5,
  });

  $(
    "#fond-page .accordion-header[data-slide], .steps__second-image[data-slide]"
  ).click(function () {
    var slideno = $(this).data("slide");
    $(".steps__main").slick("slickGoTo", slideno - 1);
    $(".accordion-header, .steps__second-image").removeClass("active");

    $(".accordion-content").slideUp();
    $('.accordion-header[data-slide="' + slideno + '"]')
      .next()
      .slideDown("slow");
    $(
      '.accordion-header[data-slide="' +
      slideno +
      '"], .steps__second-image[data-slide="' +
      slideno +
      '"]'
    ).addClass("active");
  });

  $(".stepsV2 .steps__main").on("swipe", function () {
    var slickIndex = $(".steps__main .slick-current").data("slick-index") + 1;
    function runSlideUp(str) {
      $(str).slideUp("fast");
    }

    runSlideUp(".accordion-content");
    $(".accordion-header, .steps__second-image").removeClass("active");

    $("#step-" + slickIndex + "-content").slideDown("slow").css("display", "block");
    $("#step-" + slickIndex + ", #step-" + slickIndex + "-second").addClass("active");

  });
  if ($(".athlete-meals__slick").length) {
    $(".athlete-meals__slick").slick({
      arrows: false,
      infinite: true,
      slidesToScroll: 1,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 495,
          settings: {
            slidesToShow: 1,
            dots: true,
            // arrows: true,
            centerMode: true,
            centerPadding: "60px",
          },
        },
      ],
    });
  }

  // start of location page

  $(
    ".ladder-left .ladder-image__slider, .ladder-right .ladder-image__slider"
  ).slick({
    arrows: false,
    speed: 1000,
    accessibility: false,
    draggable: false,
    pauseOnHover: false,
    infinite: true,
    fade: true,
    cssEase: "linear",
    autoplaySpeed: 5000,
  });

  $(".ladder-mobile .ladder-image__slider").slick({
    arrows: false,
    speed: 1000,
    accessibility: false,
    draggable: false,
    pauseOnHover: false,
    mobileFirst: true,
    infinite: true,
    fade: true,
    cssEase: "linear",
    autoplaySpeed: 3000,
    autoplay: true,
  });

  setTimeout(function () {
    $(".ladder-left .ladder-image__slider").slick("next");
    $(".ladder-left .ladder-image__slider").slick("play");
  }, 500);

  setTimeout(function () {
    $(".ladder-right .ladder-image__slider").slick("next");
    $(".ladder-right .ladder-image__slider").slick("play");
  }, 3000);

  $(".feature-image__slider").slick();

  $(".location-features .accordion-header[data-slide]").click(function () {
    var slideno = $(this).data("slide");
    $(".feature-image__slider").slick("slickGoTo", slideno - 1);
    $(".accordion-header, .steps__second-image").removeClass("active");

    $(".accordion-content").slideUp();
    $('.accordion-header[data-slide="' + slideno + '"]')
      .next()
      .slideDown("slow");
    $(
      '.accordion-header[data-slide="' +
      slideno +
      '"], .steps__second-image[data-slide="' +
      slideno +
      '"]'
    ).addClass("active");
    $(".accordion-header")
      .closest(".single-step")
      .find(".button-toggle")
      .removeClass("line");
    $(this).closest(".single-step").find(".button-toggle").addClass("line");
  });

  $(
    ".feature-image__slider .slick-prev, .feature-image__slider .slick-next"
  ).click(function () {
    var slickIndex =
      $(".feature-image__slider .slick-current").data("slick-index") + 1;
    slickToSlide(slickIndex);
  });

  $(".location-features .feature-image__slider").on("swipe", function () {
    var slickIndex =
      $(".feature-image__slider .slick-current").data("slick-index") + 1;

    slickToSlide(slickIndex);
  });

  function slickToSlide(slickIndex) {
    $("#feature-step-" + slickIndex + "-content")
      .slideDown("slow")
      .css("display", "block");
    $("#feature-step-" + slickIndex).addClass("active");
    $("#feature-step-" + slickIndex)
      .closest("li")
      .siblings()
      .find(".accordion-content")
      .slideUp();
    $("#feature-step-" + slickIndex)
      .closest("li")
      .siblings()
      .find(".accordion-header")
      .removeClass("active");

    $(".accordion-header")
      .closest(".single-step")
      .find(".button-toggle")
      .removeClass("line");

    $(".accordion-header[data-slide=" + slickIndex + "]")
      .closest(".single-step")
      .find(".button-toggle")
      .addClass("line");
  }

  // fullscreen timeline carousel component
  var timeLineCarousel = $(".carousel-container");
  if (timeLineCarousel.length) {
    timeLineCarousel.slick({
      infinite: true,
      dots: false,
      autoplay: false,
      speed: 500,
      slidesToShow: 1,
      fade: true,
      cssEase: "ease-in",
      slidesToScroll: 1,
      appendArrows: timeLineCarousel.parent().find('.carousel-bottom .box .progressBarContainer')

    });
  }

  // review carousel component
  var reviewCarousel = $(".review-carousel--content");
  if (reviewCarousel.length) {
    reviewCarousel.slick({
      infinite: true,
      dots: false,
      arrows: true,
      asNavFor: ".review-carousel--container",
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button class="slick-prev"></button>',
      nextArrow: '<button class="slick-next"></button>',
      appendArrows: reviewCarousel.parent().find('.review-carousel--arrow-box'),

      responsive: [
        {
          breakpoint: 770,
          settings: {
            draggable: true,

          },
        },
      ],
    });
    $(".review-carousel--container").slick({
      infinite: true,
      dots: false,
      arrows: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: false,

    });
  }

  // icon-image-slider component
  var iconImageSlider = $(".image-slide-container");
  if (iconImageSlider.length) {
    iconImageSlider.slick({
      infinite: true,
      dots: false,
      arrows: false,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      fade: true,
      cssEase: "ease-in",
      slidesToScroll: 1,
    });
    function highlightIcon() {
      $(".icon-box").removeClass("icon-selected");
      var iconArray = $("#icon-image-slider.slick-active").data('icon').split(' ', 2);
      var iconList = iconArray.filter(function (el) {
        return el != null && el != ' ';
      });
      $.each(iconList, function (key, value) {
        if (value) {
          var box = $(".icon-box#" + value);
          box.addClass("icon-selected");
        }

      });
    }
    highlightIcon();
    iconImageSlider.on('afterChange', highlightIcon);
  }


  // about us page
  if ($(".timeline-container").length) {
    $(".timeline-container").slick({
      infinite: true,
      arrows: false,
      dots: false,
      autoplay: false,
      speed: 500,
      slidesToShow: 1,
      fade: true,
      cssEase: "ease-in",
      slidesToScroll: 1,
    });
  }
  //ticking machine
  var percentTime;
  var tick;
  var time = 1;
  var progressBarIndex = 0;

  $(".progressBarContainer .progressBar").each(function (index) {
    var progress = "<div class='inProgress inProgress" + index + "'></div>";
    $(this).html(progress);
  });
  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;
    tick = setInterval(interval, 10);
  }

  function interval() {
    if (
      $(
        '#slide-container .slick-track div[data-slick-index="' +
        progressBarIndex +
        '"]'
      ).attr("aria-hidden") === "true"
    ) {
      progressBarIndex = $(
        '#slide-container .slick-track div[aria-hidden="false"]'
      ).data("slickIndex");
      startProgressbar();

    } else {

      percentTime += 1 / (time + 5);
      $(".inProgress" + progressBarIndex).css({
        width: percentTime + "%",
      });
      $(".inProgress" + progressBarIndex)
        .closest("p")
        .addClass(".primary");
      if (percentTime >= 100) {
        $("#slide-container").slick("slickNext");
        progressBarIndex++;
        if (progressBarIndex > 2) {
          progressBarIndex = 0;
        }
        startProgressbar();
      }
    }
  }

  function resetProgressbar() {
    $(".inProgress").css({
      width: 0 + "%",
    });
    clearInterval(tick);
  }
  startProgressbar();
  // End ticking machine

  $(".progressBarContainer div").on('click', function () {

    clearInterval(tick);
    var goToThisIndex = $(this).find("span").data("slickIndex");
    $("#slide-container").slick("slickGoTo", goToThisIndex, false);
    startProgressbar();
  });

  // flip flop tab
  if ($(".flip-flop-tab").length) {
    $(".flip-flop-images").slick({
      asNavFor: ".flip-flop-tab__body",
      fade: true,
      arrows: false,
      draggable: false,
      accessibility: false,
      cssEase: "ease-in",
    });
    $(".flip-flop-tab__body").slick({
      arrows: false,
      accessibility: false,
      draggable: false,
      fade: true,
      cssEase: "ease-in",
    });
    $(".flip-flop-text__container .tab").on("click", function () {
      var slickIndex = $(this).data("slick-index");
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      $(".flip-flop-images").slick("slickGoTo", slickIndex);
    });
  }
  $(".slick-icons").slick({
    slidesToShow: 1,
    arrows: false,
    accessibility: false,
    draggable: false,
  });
  $("#intro-dish .meal-item__container").slick({
    slidesToShow: 3,
    slidesToScroll: 2,
    asNavFor: ".slick-icons",
    variableWidth: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  });

  $("#intro-dish-vegan .meal-item__container").slick({
    draggable: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          draggable: true,
        },
      },
    ],
  });


  // Sliders for Low Carb Page
  if ($(".low-carb__slider--container").length > 0) {
    $(".low-carb__slider--container").slick();
  }

  $(window).on("resize load", function () {
    if ($(window).width() > 1250) {
      if ($(".copy-box__slider").hasClass("slick-initialized")) {
        $(".copy-box__slider").slick("unslick");
      }
      return;
    }
    if (!$(".copy-box__slider").hasClass("slick-initialized")) {
      return $(".copy-box__slider").slick({
        dots: true,
        arrows: false,
        infinite: false,
        speed: 300,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      });
    }
  });

  // Sliders for Legacy SEO Page
  if ($(".legacy-seo__slider--container").length > 0) {
    return $(".legacy-seo__slider--container").slick({
      dots: true,
      arrows: false,
      infinite: false,
      speed: 300,
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }

  // Slider for Meal Plan Tab pop up component

  if ($("#ppc .tabMenuPopUp").length) {
    $("[data-fancybox]").fancybox({
      autoFocus: false,
      touch: false,
      scrolling: "hidden",
      afterLoad: function () {
        $(".tabMenuPopUp__container").slick({
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 425,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        });
        $("body").css({ "touch-action": "none" });
      },
      beforeClose: function () {
        $(".tabMenuPopUp__container").slick("unslick");
        $("body").css({ "overflow-y": "auto" });
      },
    });
  }
  // Start of Taste Fresh
  if ($("#tastefresh-page").length > 0 || $("#fnl-testimonial")) {
    $(".tf-cher__image--slider").slick({
      asNavFor: ".tf-cher__text--body",
      fade: true,
      arrows: false,
      draggable: false,
      accessibility: false,
      cssEase: "ease-in",
    });

    $(".tf-cher__text--body").slick({
      arrows: false,
      accessibility: false,
      draggable: false,
      fade: true,
      cssEase: "ease-in",
    });
    $(".tf-cher__tab").on("click", function () {
      var slickIndex = $(this).data("slick-index");

      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      $(".tf-cher__image--slider").slick("slickGoTo", slickIndex);
    });

    $(".tf-review__image--slider").slick({
      asNavFor: ".tf-review__content--slider",
      arrows: false,
    });
    $(".tf-review__content--slider").slick({
      asNavFor: ".tf-review__image--slider",
    });
    $(".tf-press__slick").slick({
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  if ($(".flip-flop__img--slick").length) {
    $(".flip-flop__img--slick").slick();
  }
})(jQuery, this);

(function ($, root, undefined) {
  if ($("#vegan-meal-delivery").length) {
    var logoLink = $("#item_title").data("logo-link");
    var plantLogo = $("<img />", {
      id: "Myid",
      src: logoLink,
      alt: "Plant Based Chicken",
      style: "display : inline-block"
    });

    plantLogo.appendTo(".append-plant-logo");

    $(".animate-vegan").click(function (e) {
      e.preventDefault();
      var x;
      if ($(window).width() > 425) {
        x = 200;
      } else {
        x = 100;
      }
      $("html, body").animate(
        {
          scrollTop: $("#intro-dish-vegan").offset().top - x,
        },
        1000
      );
    });
  }
})(jQuery, this);
