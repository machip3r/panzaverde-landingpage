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

      $(".js-zip-pop-input").on("keyup change input keydown", function () {
        $(".js-zip-pop-content").text($(this).val());
      });
      $(".js-zip-pop-close").on("click", function () {
        $.fancybox.close();
        return false;
      });
      $(".js-zip-slide").on("click", function () {
        var $zipInput = $(".js-zip-pop-input"),
          zipCode = $zipInput.val(),
          isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipCode);
        if (isValidZip) {
          $zipInput.removeClass("error");
          $(this).parent().parent().find(".slide-message").slideDown();
        } else {
          $zipInput.addClass("error");
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
            if (value[0] > 100) {
              value[0] = 100;
            }
            var renderClass = "bar-" + value[0];
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
            if (value[0] > 100) {
              value[0] = 100;
            }
            var renderClass = "bar-" + value[0];
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
            gramTotal += parseInt($(this).text().match(/(\d+)/)[0]);
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
                full.css("width", (value[0] / gramTotal) * 100 + "%");
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
            if (value[0] > 100) {
              value[0] = 100;
            }
            new ScrollMagic.Scene({
              triggerElement: this,
              offset: -400,
            })
              .on("enter", function () {
                full.css("transition", "2s linear width");
                full.css("width", value[0] + "%");
              })
              .setPin(full)
              .addTo(controller);
          });
        } else {
          $(".macro-animate__bar").each(function () {
            var full = $(this).find(".bar-full");
            var value = $(this).find(".bar-value").text().match(/(\d+)/);
            if (value[0] > 100) {
              value[0] = 100;
            }
            full.css("transition", "2s linear width");
            full.css("width", value[0] + "%");
          });
        }
      };

      macroAnimation();
      // On resize
      var debouncemacroAnimation = debounce(macroAnimation, 3000);

      window.addEventListener("resize", debouncemacroAnimation);

      // Guinness Animation
      if ($(".page-template-guinness").length) {
        new ScrollMagic.Scene({
          triggerElement: $(".speed-km"),
          offset: 650,
        })
          .on("start", function () {
            $(".speed-km").addClass("trigger");
          })
          .setPin($(".speed-container"))
          .addTo(controller);

        $(".scroll-for-more").on("click", function () {
          $("html, body").animate(
            {
              scrollTop: $(".guinness-bio").offset().top - 200,
            },
            500
          );
        });
      }

      if ($("#athlete-homepage").length) {
        new ScrollMagic.Scene({
          triggerElement: $(".profile__list"),
          offset: 400,
        })
          .on("enter", function () {
            setTimeout(function () {
              $(
                ".athlete__profiles.container a:nth-child(3n+1) .profile__container"
              ).addClass("animate");
            }, 100);
            setTimeout(function () {
              $(
                ".athlete__profiles.container a:nth-child(3n+2) .profile__container"
              ).addClass("animate");
            }, 200);
            setTimeout(function () {
              $(
                ".athlete__profiles.container a:nth-child(3n+3) .profile__container"
              ).addClass("animate");
            }, 300);
          })
          .setPin($(".athlete__profiles"))
          .addTo(controller);
      }

      if ($(".athlete-content__image").length) {
        new ScrollMagic.Scene({
          triggerElement: $(".athlete-content__image"),
          offset: 4000,
        })
          .on("enter", function () {
            setTimeout(function () {
              $(".athlete-content__image img").addClass("animate");
            }, 100);
          })
          .setPin($("athlete-content"))
          .addTo(controller);
      }

      if ($(".athletes-nutrition .video-container img").length) {
        new ScrollMagic.Scene({
          triggerElement: $(".video-container"),
          offset: 2000,
        })
          .on("enter", function () {
            setTimeout(function () {
              $(".athletes-nutrition .video-container img").addClass("animate");
            }, 100);
          })
          .setPin($(".athletes-nutrition"))
          .addTo(controller);
      }

      $(".animation-card__container").slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1.6,
              slidesToScroll: 1,
            },
          },
        ],
      });

      // meal plan overview component

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

      var imageTextCtaHeaderMove = debounce(function () {
        if ($(".image-and-text-cta .header").length === 1) {
          if ($(window).width() < 769) {
            $(".image-and-text-cta .header")
              .clone()
              .prependTo(".image-and-text-cta .mobile-header");
          }
        }

        if ($(".image-and-text-cta .header").length === 2) {
          if ($(window).width() > 768) {
            $(".image-and-text-cta .mobile-header .header").remove();
          }
        }
      }, 100);

      window.addEventListener("resize", imageTextCtaHeaderMove);
      window.addEventListener("load", imageTextCtaHeaderMove);

      var imageTextCtaHeaderMove2 = debounce(function () {
        if ($(".image-and-text-cta2 .header").length === 1) {
          if ($(window).width() < 769) {
            $(".image-and-text-cta2 .header")
              .clone()
              .prependTo(".image-and-text-cta2 .mobile-header");
          }
        }

        if ($(".image-and-text-cta2 .header").length === 2) {
          if ($(window).width() > 768) {
            $(".image-and-text-cta2 .mobile-header .header").remove();
          }
        }
      }, 100);

      window.addEventListener("resize", imageTextCtaHeaderMove2);
      window.addEventListener("load", imageTextCtaHeaderMove2);

      var saveHoursHeaderMove = debounce(function () {
        if ($(".save-hours .header").length === 1) {
          if ($(window).width() < 769) {
            $(".save-hours .header")
              .clone()
              .prependTo(".save-hours .mobile-header");
          }
        }

        if ($(".save-hours .header").length === 2) {
          if ($(window).width() > 768) {
            $(".save-hours .mobile-header .header").remove();
          }
        }
      }, 100);

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

        var menuTarget  = "#" + index;
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
        if(navbar === null) return;
        navbar.classList[window.scrollY > 110 ? "add" : "remove"]("hide");
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
          if(navbar === null) return;
          navbar.classList[window.scrollY > 110 ? "add" : "remove"]("hide");
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
        $(".tab-link a." + main_slide ).click();
      }, 1000);
    }
    loadMealTab(main_slide);

    var mini_menu_main_slide = $(".menu-grid__meals").data('main-slide');
    function loadMiniMenu(mini_menu_main_slide) {
      setTimeout(function () {
        $(".tab-link a." + mini_menu_main_slide ).click();
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
        var  headerHeight = jQuery(".sticky").height();
        $("html, body").animate(
          {
            scrollTop: $(componentID).offset().top - headerHeight,
          },
          500
        );
      });
    }

  // Column-image-text-and-description - dropdown on mobile
  if ($(".mobile-dropdown").length ) {
    $(".image-and-text-content").on("click", function () {
      if($(window).width() < 770){
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
    $(window).resize(function() {
      if($(window).width() > 770){
        $(".image-and-text-content").css("padding-bottom", "0");
        $(".description-container").removeClass("current");
        $(".image-and-text-content").removeClass("active");
      }
    });
  }

    //two-column-image-text wysiwyg color change
    if ($(".two-column-image-text .overlap_applied").length) {
    const wysiwygContainer= $(".two-column-image-text").find(".overlap_applied .content-block");
    wysiwygContainer.each( function() {
      var fontColor = $(this).data('fontcolor');
      $(this).find("p").css('color' , fontColor);
    });
    }

  // Column-image-text-and-description - dropdown on mobile
  if ($(".mobile-dropdown").length ) {
    $(".image-and-text-content").on("click", function () {
      if($(window).width() < 770){
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
    $(window).resize(function() {
      if($(window).width() > 770){
        $(".image-and-text-content").css("padding-bottom", "0");
        $(".description-container").removeClass("current");
        $(".image-and-text-content").removeClass("active");
      }
    });
  }

  $(".accordion-header, .faqs-container.accordion dt").keyup(function(event) {
    if (event.keyCode === 13) {
        $(this).click();
    }
  });

  $(".faqs-container .accordion dt").keyup(function(event) {
    if (event.keyCode === 13) {
        $(this).click();
    }
  });


  $("#tab-section .tab-title").keyup(function(event) {
    if (event.keyCode === 13) {
      $(document.activeElement).focus();
      $("*:focus .tab-link").click();
    }
  });

  $(".primary-container img").attr('tabindex', '-1');

  })(jQuery, this);