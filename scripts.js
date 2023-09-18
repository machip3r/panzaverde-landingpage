/**
 *
 * Accessibilty Fixes
 *
 */

(function ($, root, undefined) {
  $(function () {
    "use strict";

    //Navigation Menu

    // Homepage
    $(".works .container .four-col-container .col").removeAttr(
      "aria-describedby"
    );
    $(
      ".fnl-service-content .container .service-text-container .two-col-container .col"
    ).removeAttr("aria-describedby");
    $(
      ".fnl-checklist .container .fnl-infographic-section .info-block-container .info-block"
    ).removeAttr("aria-describedby");
    $(".fnl-popular-plans .container .four-col-container .col").removeAttr(
      "aria-describedby"
    );
    $(document).keypress(function (event) {
      var keycode = event.keyCode ? event.keyCode : event.which;
      if (keycode == "13") {
        $(this).click();
      }
    });
  });
})(jQuery, this);

(function ($, root, undefined) {

    if ($(".single-post").length) {
        $(".entry-content p a.anchor-link").on("click", function (e) {
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
  })(jQuery, this);
(function ($, root, undefined) {
  // Press Page
  if ($(".press-release__slider").length) {
    $(".press-release__slider").slick({
      infinite: false,
      variableWidth: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  if ($(".fnl-jobs .card-slide__container").length) {
    $(".card-slide__container").slick({
      slidesToShow: 3,
      draggable: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
  if ($(".card-slide__container").length) {
    var scrolled = 0;
    var containerWidth = $(".card-slide__container").width();

    $(".press-scroll-right").on("click", function () {
      if (containerWidth <= scrolled) {
        return;
      }
      scrolled += 400;
      $(".card-slide__container").animate({
        scrollLeft: scrolled,
      });
    });
    $(".press-scroll-left").on("click", function () {
      if (scrolled >= 0) {
        scrolled -= 400;
      }
      $(".card-slide__container").animate({
        scrollLeft: scrolled,
      });
    });
  }

  if ($(".news__article").length) {
    var lengthOfArticles = $(".news__article").length;
    var articleCount = 9;
    $(".load-more").click(function () {
      $(".news__article:lt(" + articleCount + ")").css("display", "flex");
      articleCount += 5;
      if (articleCount >= lengthOfArticles) {
        $(this).remove();
      }
    });
  }

    // Culture Page
    if ((".fnl-culture").length > 0) {
      $(".card").on("click", function () {
       var cardNumber =  $(this).data("card");
       var hiddenCard = $("#hidden-card-" + cardNumber);
       hiddenCard.removeClass("invis");
       $(".card-slide__container").addClass("inset-0");
      });

      $(".hidden-card__back-button").on("click", function () {
        $(".hidden-card").addClass("invis");
        $(".card-slide__container").removeClass("inset-0");
      });
    }

  // Jobs Page
  if (jQuery("[data-department]").length > 0) {
    $(".department-name").on("click", function () {
      $(".department-name").removeClass("active");
      $(this).addClass("active");
      toggleDepartments($(this).data("name"));
    });
  }
  function toggleDepartments(department) {
    if (department === "All Departments") {
      $("[data-department]").fadeIn();
      return;
    }
    $("[data-department]").fadeOut();
    setTimeout(function () {
      $("[data-department='" + department + "']").fadeIn();
    }, 500);
  }
})(jQuery, this);

(function ($, root, undefined) {
  $("#tab-select").on('change', function () {
    let value = this.value;
    let regex = /[a-zA-z]+-/g;
    let hash = value.replace(regex,'');
    window.location.hash = "#tab-section"+hash;
    location.reload();
});

// Debounce
function debounce(func, time){
  var time = time || 100; // 100 by default if no param
  var timer;
  return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
  };
}

$(".accordion-btn").on('click', function () {
  const accordionBtn = $(this);
  const accordionContent = accordionBtn.next('.accordion-content');
  const desktopContentSpan = $('.desktop-content > p');
  const accordionContainer = $('.accordion-container');

    if((accordionContainer).hasClass('desktop')){
      $(".accordion-btn").removeClass('active');
      accordionBtn.addClass("active");
      const content = accordionContent.text();
      desktopContentSpan.fadeOut('fast', function () {
        desktopContentSpan.text(content).fadeIn('fast');
      });
    }else if((accordionContainer).hasClass('mobile')) {
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

  }else {
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
window.addEventListener("resize", debounce( resizeContent, 150));

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
  if ($("#whole30-meal-delivery").length) {
    renderComparisonTab();
  }
  function renderComparisonTab() {
    if ($(window).width() < 769) {
      $("#whole30-meal-delivery #comparison__item-1").css("display", "none");
      $(".tab-links a.tab-0").click();

      $(".tab-links a").on("click", function (e) {
        e.preventDefault();
        var color = $(this).data('color');
        var tabId = $(this).attr('href');
       
        $(".comparison__item").css("display", "none");
        $(".tab-links a").css({"color" : "#bcc2d1" , "border-bottom" : "none"});

        $(tabId).css("display", "block");
        $(this).css({"color" : color , "border-bottom" : "2px solid" + color});

 
      })
    }

    if ($(window).width() > 769) {
      $("#whole30-meal-delivery #comparison__item-1").css("display", "block");
    }
  }

  var debounceComparisonTab = debounce(renderComparisonTab, 500);
  window.addEventListener("resize", debounceComparisonTab);
})(jQuery, this);

(function ($, root, undefined) {
  function triggerGTMImpression() {
    $.fn.isInViewport = function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    var menuArray = [];
    var menuTagArray = [];
    $(".meal-item").each(function () {
      if ($(this).isInViewport()) {
        if ($(this).data("impressions") === false) {
          $(this).data("impressions", true);
          menuArray.push($(this).data("menuitem"));
          menuTagArray.push($(this).data("menutag"));
        }
      }
    });
    if (menuArray.length > 0) {
      window.dataLayer.push({
        event: "eec_product_impresssion",
        item_list_name: "Menu",
        ecommerce: {
          currency: "USD",
          impressions: menuArray,
        },
      },
      {
        event: "view_item_list",
        ecommerce: {
          items: menuTagArray,
        },
      });
    }
  }

  if($(".menu-page").length){
    $(".meal-item").on("click", function () {
        window.dataLayer.push({
          event: "view_item",
          ecommerce: {
            items: $(this).data("menutag"),
          },
        })
      })
    }


  //meal plans page CTA
  if($("#meal-plans").length){
    $(".view-plan-container a.btn").on("click", function () {
        window.dataLayer.push({
          event: "viewed_meal_plan",
          item_category: $(this).data("planname"),

        });
    })
  }

  $("body").on("click", "[data-gtm]", function (e) {
    var login =
      '<img src="/wp-content/uploads/2021/05/my_account.svg" alt="Account Login Logo">';
    var getStarted =
      '<img src="/wp-content/themes/fresh-n-lean/images/bolt/green-bolt.png" alt="FNL green bolt">';
    var tag = $(this).data("gtm");
    if (typeof tag === "string") {
      if (tag.includes(login) || tag.includes(getStarted)) {
        tag = tag.replace(login, "");
        tag = tag.replace(getStarted, "");
      }
      tag = JSON.parse(tag);
    }
    window.dataLayer.push(tag);
  });

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
  if ($(".mealpop-images").length > 0) {
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

    triggerGTMImpression();
    var debounceGTM = debounce(triggerGTMImpression, 1000);
    window.addEventListener("scroll", debounceGTM);

    $(".mealpop-images").on("afterChange", function () {
      var mealPop = $(this).parent();
      var mealName = mealPop.data("name");
      var mealClass = mealPop.data("plan");
      var datagtm = {
        event: "gallery_browse",
        meal_name: mealName,
        plan_name: mealClass,
      };
      window.dataLayer.push(datagtm);
    });
  }

  if ($(".recipe-search").length > 0) {
    $(".recipe-search").submit(function () {
      window.dataLayer.push({
        event: "recipe_search",
        action: "find recipe",
        search_term: $(".recipe-search-input").val(),
      });
    });
  }

  $(document).on("click", ".subscription-container-form button", function () {
    window.dataLayer.push({
      event: "newsletter_signup",
      action: "sign up",
      url: window.location.href,
    });
  });

  var gtmData = {
    event: "eec_product_detail",
    item_name: "",
    ecommerce: {
      currency: "USD",
      detail: {
        products: [
          {
            name: "",
            id: "",
            category: "",
            variant: "Meal Plan",
          },
        ],
      },
    },
  };

  var pathName = location.pathname;
  switch (pathName) {
    case "/fitness-meal-delivery/":
      gtmData.item_name = "Protein +";
      gtmData.ecommerce.detail.products[0].name = "Protein +";
      gtmData.ecommerce.detail.products[0].id = "PP-X";
      gtmData.ecommerce.detail.products[0].category = "Protein +";
      window.dataLayer.push(gtmData);
      break;
    case "/keto-meal-delivery/":
      gtmData.item_name = "Keto";
      gtmData.ecommerce.detail.products[0].name = "Keto";
      gtmData.ecommerce.detail.products[0].id = "K-X";
      gtmData.ecommerce.detail.products[0].category = "Keto";
      window.dataLayer.push(gtmData);
      break;
    case "/paleo-meal-delivery/":
      gtmData.item_name = "Paleo";
      gtmData.ecommerce.detail.products[0].name = "Paleo";
      gtmData.ecommerce.detail.products[0].id = "P-X";
      gtmData.ecommerce.detail.products[0].category = "Paleo";
      window.dataLayer.push(gtmData);
      break;
    case "/vegan-meal-delivery/":
      gtmData.item_name = "Vegan";
      gtmData.ecommerce.detail.products[0].name = "Vegan";
      gtmData.ecommerce.detail.products[0].id = "V-X";
      gtmData.ecommerce.detail.products[0].category = "Vegan";
      window.dataLayer.push(gtmData);
      break;
    case "/low-carb-meal-delivery/":
    case "/low-carb-service-page/":
      gtmData.item_name = "Vegan Low Carb";
      gtmData.ecommerce.detail.products[0].name = "Vegan Low Carb";
      gtmData.ecommerce.detail.products[0].id = "LC-X";
      gtmData.ecommerce.detail.products[0].category = "Vegan Low Carb";
      window.dataLayer.push(gtmData);
      break;
    case "/whole30/":
      gtmData.item_name = "Whole30";
      gtmData.ecommerce.detail.products[0].name = "Whole30";
      gtmData.ecommerce.detail.products[0].id = "WTA-X";
      gtmData.ecommerce.detail.products[0].category = "Whole30";
      window.dataLayer.push(gtmData);
      break;
    case "/mediterranean-diet-meal-delivery/":
      gtmData.item_name = "Mediterranean Diet";
      gtmData.ecommerce.detail.products[0].name = "Mediterranean Diet";
      gtmData.ecommerce.detail.products[0].id = "MD-X";
      gtmData.ecommerce.detail.products[0].category = "Mediterranean Diet";
      window.dataLayer.push(gtmData);
      break;
  }
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
          scrollTop:$(".hiw-steps__container .scrollsection-" + $(this).data().scroll +"").offset().top - 250,
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
  if($(".location-page .location-name").length) {
    var pathName = (window.location.pathname).split('/', 3);
    var locationArray = pathName[2].split('-meal', 1);
    if(locationArray.indexOf("-")) {
     var locationName = locationArray[0].split('-');
    }
  $(".location-page span.location-name").append(locationName.join(" "));

  }
})(jQuery, this);

// hiw-steps__grid

if (document.getElementById("meal-plan-quiz-container")) {
  var quizBox = document.getElementById("meal-plan__quiz");
  var resultBox = document.getElementById("result-container");
  var button = document.getElementById("quiz-start");
  var question = document.getElementById("question");
  var progressBar = document.getElementById("progress-bar");
  var extraDescription = document.getElementById("extra-description");

  var score = {
    ProteinPlus: 0,
    Paleo: 0,
    Keto: 0,
    Vegan: 0,
    LowCarb: 0,
    veganOnly: 0,
    excludeKeto: 0,
    addBulk: 0,
  };

  button.onclick = quizStart;
  document.getElementById("quiz-restart").onclick = quizStart;
  document.getElementById("quiz-back").onclick = goBack;

  function quizStart() {
    progressBar.style.display = "flex";
    resultBox.style.display = "none";
    // introBox.style.display = "none";
    quizBox.style.display = "block";
    document.getElementById("quiz-back").classList.add("d-none");

    score = {
      ProteinPlus: 0,
      Paleo: 0,
      Keto: 0,
      Vegan: 0,
      LowCarb: 0,
      veganOnly: 0,
      excludeKeto: 0,
      addBulk: 0,
    };

    setupQuestion();
  }

  // constant to store all the questions and answers
  var questions = {
    question0: {
      question: "Which of the following sounds most like you?",
      option0: {
        type: "string",
        content: "I don't have time to cook or meal prep",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
      option1: {
        type: "string",
        content: "I need to eat more healthy",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
      option2: {
        type: "string",
        content: "I need energy boosting meals for work out",
        mealPlans: ["ProteinPlus", "ProteinPlus", "Paleo", "Paleo", "Keto"],
      },
      option3: {
        type: "string",
        content: "I want to lose weight",
        mealPlans: ["Paleo", "Keto", "Keto", "Vegan", "LowCarb", "LowCarb"],
      },
    },
    question1: {
      question: "What best describes your meal plan goal?",
      option0: {
        type: "string",
        content: "I want to cut carbs",
        mealPlans: ["Paleo", "Keto", "Keto", "LowCarb", "LowCarb"],
      },
      option1: {
        type: "string",
        content: "I need to reduce calories",
        mealPlans: [
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
      option2: {
        type: "string",
        content: "I want to increase protein",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Vegan",
        ],
      },
      option3: {
        type: "string",
        content: "I want a balanced diet",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
    },
    question2: {
      question: "How important is macronutrient to you?",
      option0: {
        type: "string",
        content: "Very Important",
        mealPlans: ["addBulk"],
      },
      option1: {
        type: "string",
        content: "Not very important",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
      option2: {
        type: "empty",
        content: "empty",
        mealPlans: ["ProteinPlus"],
      },
      option3: {
        type: "empty",
        content: "empty",
        mealPlans: ["ProteinPlus"],
      },
    },
    question3: {
      question: "Select preferred protein type",
      option0: {
        type: "string",
        content: "Animal Protein",
        mealPlans: ["ProteinPlus", "Protein", "Paleo", "Paleo", "Keto", "Keto"],
      },
      option1: {
        type: "string",
        content: "Vegan Protein",
        mealPlans: ["veganOnly"],
      },
      option2: {
        type: "string",
        content: "Both",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "LowCarb",
        ],
      },
      option3: {
        type: "empty",
        content: "empty",
        mealPlans: ["Protein"],
      },
    },
    question4: {
      question: "Select a diet restriction/ preference that apply",
      option0: {
        type: "string",
        content: "Dairy-free",
        mealPlans: ["excludeKeto"],
      },
      option1: {
        type: "string",
        content: "Nut allergy",
        mealPlans: ["excludeKeto"],
      },
      option2: {
        type: "string",
        content: "Gluten-free",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
      option3: {
        type: "string",
        content: "None",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
    },
    question5: {
      question: "Select preferred carb option",
      option0: {
        type: "string",
        content: "Brown rice and pasta",
        mealPlans: ["ProteinPlus", "Protein", "Vegan", "Vegan"],
      },
      option1: {
        type: "string",
        content: "Fiber-rich carbs like sweet potato",
        mealPlans: ["ProteinPlus", "Paleo", "Paleo", "Vegan", "Vegan"],
      },
      option2: {
        type: "string",
        content: "No carb or low level of carb",
        mealPlans: ["Keto", "Keto", "LowCarb", "LowCarb"],
      },
      option3: {
        type: "empty",
        content: "empty",
        mealPlans: [
          "ProteinPlus",
          "ProteinPlus",
          "Paleo",
          "Paleo",
          "Keto",
          "Keto",
          "Vegan",
          "Vegan",
          "LowCarb",
          "LowCarb",
        ],
      },
    },
  };

  // constant to store the description for each type of traveller
  var result = {
    ProteinPlus: ["The Meal For You to Optimize Your Fitness."],
    Paleo: ["The Meal For You to Enjoy Nature's Whole Foods."],
    Keto: ["The Meal For You to Chew the Fat and Cut the Carbs."],
    Vegan: ["The Meal For You to Cut the Meat and Eat Really Clean."],
    LowCarb: ["The Meal to Cut the Carbs and Cut the Meat."],
  };

  // for keep track of the current question
  var currentQn = 0;
  var storeLastQuestion;

  // for setting up each of the questions
  function setupQuestion() {
    // find out the current percentage of completion and updates the css
    var progress = 16.67 + currentQn * 16.67;
    var progressbar = document.getElementById("progress");
    progressbar.style.width = progress + "%";
    progressbar.innerText = currentQn + 1 + "/6";

    // get the current questions content
    var qn = questions["question" + currentQn];
    var qnText = document.getElementById("question");
    qnText.innerText = qn.question;

    // updates each of the options for the current question
    for (var i = 0; i < 4; i++) {
      var option = document.getElementById("option" + i);
      option.style.display = "flex";
      var content = option.getElementsByClassName("content")[0];
      var qnOption = qn["option" + i];

      if (qnOption.type === "empty") {
        option.style.display = "none";
      }
      var htmlStr = "<p>" + qnOption.content + "</p>";
      content.innerHTML = htmlStr;
    }
    if (currentQn > 0) {
      document.getElementById("quiz-back").classList.remove("d-none");
    } else {
      document.getElementById("quiz-back").classList.add("d-none");
    }
  }

  // to unselect all of the options
  function resetOptions() {
    var btn = document.getElementsByTagName("input");
    btn[0].checked = false;
    btn[1].checked = false;
    btn[2].checked = false;
    btn[3].checked = false;
  }

  // to select the option that is clicked
  function select(element) {
    var btn = element.getElementsByTagName("input")[0];
    btn.checked = true;
    next();
  }

  function goBack() {
    currentQn = currentQn - 1;
    resetOptions();
    storeLastQuestion.forEach(function (item) {
      score[item]--;
    });
    setupQuestion();
  }

  // get the next questions, or display result if all questions were answered
  function next() {
    // get the current select option
    var ans = $("input[name=answer]:checked").val();
    var qn = questions["question" + currentQn];
    // get the personality type for the option selected
    storeLastQuestion = qn["option" + ans].mealPlans;
    // increase the score of the personality by one
    qn["option" + ans].mealPlans.forEach(function (item) {
      score[item]++;
    });
    // increase the question count by 1
    currentQn = currentQn + 1;
    // unselect all options
    resetOptions();
    // check if quiz is completed
    if (currentQn < 6) {
      // if quiz not completed, setup the next question
      setupQuestion();
    } else {
      // else quiz is completed
      // assume that the highest score is the adventurous personality
      // and go through each of the personality type, and update the highest score and personality
      progressBar.style.display = "none";
      if (score.excludeKeto > 0) {
        delete score.Keto;
        delete score.excludeKeto;
      }
      if (score.veganOnly > 0) {
        delete score.ProteinPlus;
        delete score.Paleo;
        delete score.Keto;
      }
      if (score.addBulk > 0) {
        extraDescription.style.display = "block";
        extraDescription.innerText =
          "You can add snack and side items to make your meal plan macro perfect";
      }

      var sortable = [];
      for (var plans in score) {
        sortable.push([plans, score[plans]]);
      }

      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });

      resultBox.style.display = "block";
      quizBox.style.display = "none";

      function getCTALink(plan) {
        var returnLink;
        switch (plan) {
          case "ProteinPlus":
            returnLink = "https://order.freshnlean.com/fnl/plans/protein";
            break;
          case "Keto":
            returnLink = "https://order.freshnlean.com/fnl/plans/keto";
            break;
          case "Paleo":
            returnLink = "https://order.freshnlean.com/fnl/plans/paleo";
            break;
          case "Vegan":
            returnLink =
              "https://order.freshnlean.com/fnl/plans/vegan-standard";
            break;
          case "LowCarb":
            returnLink =
              "https://order.freshnlean.com/fnl/plans/vegan-low-carb";
            break;
          default:
            returnLink = "https://order.freshnlean.com/fnl/";
            break;
        }
        return returnLink;
      }

      function getPageLink(plan) {
        var returnLink;
        switch (plan) {
          case "ProteinPlus":
            returnLink = "https://www.freshnlean.com/fitness-meal-delivery/";
            break;
          case "Keto":
            returnLink = "https://www.freshnlean.com/keto-meal-delivery/";
            break;
          case "Paleo":
            returnLink = "https://www.freshnlean.com/paleo-meal-delivery/";
            break;
          case "Vegan":
            returnLink = "https://www.freshnlean.com/vegan-meal-delivery/";
            break;
          case "LowCarb":
            returnLink = "https://www.freshnlean.com/low-carb-meal-delivery/";
            break;
          default:
            returnLink = "/";
            break;
        }
        return returnLink;
      }

      // get the description of the personality and update the result page
      document.getElementById("personality-part-1").innerText =
        "100% match with";
      document.getElementById("personality-type-1").innerText =
        sortable[0][0] + " meal plan";
      document
        .getElementById("mealplan-btn-1")
        .setAttribute("href", getCTALink(sortable[0][0]));
      document
        .getElementById("learn-more-1")
        .setAttribute("href", getPageLink(sortable[0][0]));

      document.getElementById("personality-part-2").innerText =
        Math.floor((sortable[1][1] / sortable[0][1]) * 100) + "% match with";
      document.getElementById("personality-type-2").innerText =
        sortable[1][0] + " meal plan";
      document
        .getElementById("mealplan-btn-2")
        .setAttribute("href", getCTALink(sortable[1][0]));
      document
        .getElementById("learn-more-2")
        .setAttribute("href", getPageLink(sortable[1][0]));
      currentQn = 0;
    }
  }
}

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

  

  


  function addStickyButt(planName) {
    if (planName.indexOf('-') > 0) {
    planName = planName.split('-')[0];
    var planClass = planName;
    var planCTA = 'https://orders.freshnlean.com/fnl/plans/' + planName
    if (planName === 'fitness' ) {
      planName = 'protein';
      planClass = planName;
      planCTA = 'https://orders.freshnlean.com/fnl/plans/protein';
    }
    if (planName === 'vegan' ) {
      planCTA = 'https://orders.freshnlean.com/veganmenu/plans/';
      planClass = 'vegan-s';
    }
    if (planName === 'low' ) {
      planName = 'low-carb';
      planCTA = 'https://orders.freshnlean.com/fnl/plans/vegan-low-carb';
      planClass = 'vegan-l'
    } 
    if (planName === 'mediterranean') {
      planCTA = 'https://orders.freshnlean.com/fnl/plans/mediterranean-diet';
    }
    } else { 
       planName = planName.split('/')[0];
       planClass = planName;
      if (planName === 'whole30') {
      planCTA = 'https://orders.freshnlean.com/wholethirty/plans/wta';
    }  else {
      planCTA = 'https://orders.freshnlean.com/fnl/plans/';
      planClass = 'primary';
    }
  }

    if ($(window).width() < 2769) {
      $("#primary").append(
        '<div class="menu-grid__meals--cta t-center menu-grid__meal--cta--service"><div class="menu__cta-container"> <a href="/menu/#' +
          (planName === 'low-carb' ? planClass : planName) +
          '" class="btn btn--' +
          planClass +
          '">VIEW MENU</a> <a href="' +
          planCTA +
          '" class="btn border-btn--' +
          planClass +
          '">Start ' +
          planName.toUpperCase() +
          " Meal Plan</a></div></div>"
      );
      var lastScrollTop = 0;
      $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st < lastScrollTop) {
          $("#bottom-fixed-bar").css({
            position: "relative",
          });
        } else {
          $("#bottom-fixed-bar").css({
            position: "sticky",
            bottom: 0,
            zIndex: 99,
          });
        }
        lastScrollTop = st;
      });
    }
  }

  if (
    $(".page-template-template-howitworks").length ||
    $(".page-template-howitworks").length ||
    $(".page-template-template-faqs").length
  ) {
    var planName = document.referrer.includes('meal-delivery') || document.referrer.includes('whole30') ? document.referrer.split('.com/')[1] : '' ;
    addStickyButt(planName);
  }

  // Ians Menu JS
  $(".toggle-entrees").on("click", function () {
    var element = $(this);
    var meal_class = element.data("class");
    var num;
    if ($(window).width() < 426) {
      num = 7;
    } else if ($(window).width() < 993) {
      num = 3;
    } else if ($(window).width() < 2222) {
      num = 4;
    } else {
      num = 5;
    }
    $(
      "#" + meal_class + "-entree .meal-item:nth-child(n+" + num + ")"
    ).slideToggle("slow");
    element.toggleClass("less");
  });

  $(".toggle-breakfast").on("click", function () {
    var element = $(this);
    $(".breakfast-section .meal-item:nth-child(n+4)").slideToggle(
      "slow",
      function () {
        element.toggleClass("less");
      }
    );
  });

  $(".breakfast-scroll").on("click", function () {
    var mealClass = $(this).data("class");
    $("html, body").animate(
      {
        scrollTop: $("#" + mealClass + "-breakfast").offset().top - 200,
      },
      2000
    );
  });

  $(".mealpop-more__button").on("click", function () {
    $(this).toggleClass("current");
    $(".mealpop-more__info").slideToggle("fast", function () {
      $(".mealpopup").scrollTop(900);
    });
  });

  //carousel mini menu
  var miniMenuSlickSettings = {
    dots: true,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: false,
    rows: 2,

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  $(".main-slide").slick(miniMenuSlickSettings);

  $("ul.tab-title li").on("click", function () {
    $("ul.tab-title li").removeClass("current");
    $(".tab-content").removeClass("current");
    $(this).addClass("current");

    $(".main-slide").slick("setPosition");
  });

  //mealpopup
  $(".meal-item").on("click", function () {
    var popupData = $(this).find("div.popup-data").data();
    var mealTitle = popupData["mealtitle"];
    var mealClass = popupData["mealclass"];
    var mealPlan = popupData["mealplan"];
    var mainImage = popupData["mainimage"];
    var secondImage = popupData["secondimage"];
    var heatingInstruction = popupData["heating"];
    var nutritionFact = popupData["nutritionfact"];
    var protein = popupData["protein"];
    var calories = popupData["calories"];
    var carbs = popupData["carbs"];
    var fat = popupData["fat"];
    var ingredient = $(this).find("div.popup-data-ingredient").text();
    var proteinIcon = popupData["proteinicon"];
    var proteinType = popupData["proteintype"]
    var benefits = popupData["benefits"];
    var benefit = benefits.split(", ");
    var promo = $(this).find("div.popup-data-promo").data("promo");
    var promoCart = $(this).find("div.popup-data-promo").data("cart");
    var specialTemplate = popupData["template"];
    $("#mealpopup").css("display", "block");
    $(".mealpop-images").css("z-index", "0");
    $(".popup_background").css("display", "block");
    $("body").css("overflow", "hidden");
    $(".mealpop-plan").attr("class", "mealpop-plan");
    $(".mealpop-benefits").attr("class", "mealpop-benefits");
    $(".mealpopup .mealpop").attr({
      "data-plan": mealClass,
      "data-name": mealTitle,
    });

    // Images
    $(".main-image").css("background-image", "url(" + mainImage + ")");
    if (secondImage.length) {
      $(".mealpop-images").append(
        "<div><div style='background-image:url(" +
          secondImage +
          ")'></div></div>"
      );
    }

    // Header
    $(".mealpop-plan").addClass(mealClass);
    $(".mealpop-plan").text(mealPlan);
    $(".mealpop-name h4").empty();
    $(".mealpop-name h4").attr('aria-label', 'Meal Name');

    if (mealTitle.indexOf("append-plant-logo") > 0) {
      var logoLink = $("#item_title").data("logo-link");
      var plantLogo = $("<img />", {
        id: "Myid",
        src: logoLink,
        alt: "Plant Based Chicken",
        style: "display : inline-block",
      });

      mealTitle = $.parseHTML(mealTitle);
      $(".mealpop-name h4").append(mealTitle);

      plantLogo.appendTo(".mealpop-header .append-plant-logo");
    } else {
      $(".mealpop-name h4").text(mealTitle);
    }

    // Benefits Tag
    $(".mealpop-benefits").empty();
    $(".mealpop-benefits").addClass(mealClass);
    if(benefits){
      $(benefit).each(function () {
        $(".mealpop-benefits").append("<div class='benefit'>" + this + "</div>");
      });
    }
    // Macro Section
    $(".render-calories").attr("class", "render-calories");
    $(".render-calories").addClass(mealClass);
    $(".render-calories").text(calories);
    $(".mealpop-macros").attr("class", "mealpop-macros");
    $(".mealpop-macros").addClass(mealClass);
    $(".mealpop-macros").attr({
      "data-macros": "[" + protein + "," + fat + "," + carbs + "]",
      "data-mealClass": mealClass,
    });
    $(".mealpop-protein").attr("data-macro", protein);
    $(".mealpop-protein h3").text(protein);
    $(".mealpop-protein h3").attr('aria-label', 'Meal Protein Total');
    $(".mealpop-fat").attr("data-macro", fat);
    $(".mealpop-fat h3").text(fat);
    $(".mealpop-fat h3").attr('aria-label', 'Meal Fat Total');
    $(".mealpop-carb").attr("data-macro", carbs);
    $(".mealpop-carb h3").text(carbs);
    $(".mealpop-carb h3").attr('aria-label', 'Meal Carb Total');
    var carbTitle = mealClass === "keto" ? "Total CARBS" : "CARBS";
    $(".mealpop-carb h4").text(carbTitle);
    $(".mealpop-carb h4").attr('aria-label', 'Meal Title');
    $(".mealpop-protein").attr("class", "mealpop-protein");
    $(".mealpop-protein").addClass(mealClass);
    //need to modify
    $(".mealpop-protein img").attr({
      src: proteinIcon,
      alt: proteinType + " icon",
    }).on('error', function() {
      $(this).off('error').attr("src", "../../wp-content/themes/fresh-n-lean/images/menu/icons/plant-icon.svg");
    });

    // CTA Button
    var loop = $(this).find(".popup-button").length;
    $(".mealpop-cta__container").empty();
    for (var index = 0; index < loop; index++) {
      var popupDataCta = $(this)
        .find("div.popup-data-cta-" + index)
        .data();
      var ctaUrl = popupDataCta.url;
      var ctaTitle = popupDataCta.title;
      var ctaStyle = popupDataCta.style;
      if (specialTemplate === "special-template") {
        ctaUrl = ctaUrl;
        ctaTitle = ctaTitle;
      } else {
        ctaUrl =
          promo === ""
            ? ctaUrl
            : ctaUrl.indexOf("order") > 0
            ? ctaUrl.replace(
                /(fnl*[-].[a-zA-Z]+|fnl|wholethirty|veganmenu)+/,
                promoCart
              ) + promo
            : ctaUrl;
        ctaTitle =
          promo === ""
            ? ctaTitle
            : ctaUrl.indexOf("order") > 0
            ? "ClAIM OFFER NOW"
            : ctaTitle;
      }

      if (ctaUrl.indexOf("order") > 0) {
        var data_gtm_type =
          'data-gtm=\'{"event":"cta_click", "button_text":"' +
          ctaTitle +
          '", "url":"' +
          ctaUrl +
          "\" }'";
      } else {
        data_gtm_type =
          'data-gtm=\'{"event":"start_meal", "button_text":"' +
          ctaTitle +
          '", "plan_name":"' +
          mealClass +
          '", "order_starts":"1" }\'';
      }

      $(".mealpop-cta__container").append(
        "<a " +
          data_gtm_type +
          " href='" +
          ctaUrl +
          "' class='btn " +
          ctaStyle +
          "--" +
          mealClass +
          "'>" +
          ctaTitle +
          "</a>"
      );
    }

    //ingredients list
    $(".mealpop-info__ingredients p").text(ingredient);
    $(".mealpop-more__button").attr(
      "data-gtm",
      '{ "event": "ingredients_n_more", "action": "expand", "meal_name":"' +
        mealTitle +
        '"}',
    );
    $(".mealpop-more__button").attr("tabindex", "0");
    // Nutrition Fact
    $(".nutrition-fact-img").attr("src", nutritionFact);
    $(".nutrition-fact-img").attr("alt", mealTitle);

    //heating Instruction
    const heatingStyle = heatingInstruction === 1 ? 'none' : 'block';
    $(".mealpop-info__heating").css("display", heatingStyle);

    $(".fancybox-close-small, .popup_background").on("click", function () {
      $(".popup_background").css("display", "none");
      $("#mealpopup").css("display", "none");
      $("body").css("overflow", "scroll");

      $(".mealpop .mealpop-images").slick("unslick");
      $(".mealpop-more__info").css("display", "none");
      $(".mealpop-more__button").removeClass("current");
      $(".mealpopup").unbind("scroll");

      $(".mealpop-images div:nth-child(2)").remove();
    });

    $(".fancybox-close-small").attr("tabindex","0").css({
      'outline' : '3px solid #2A9DD4 !important',
      'border-radius' : '5px !important',
      'box-shadow' : '0 0 0 1px rgb(51, 160, 255), 0 0 0 4px rgb(189, 224, 255)'
    });

    $(".mealpop .mealpop-images").slick({
      dots: true,
    });

    //macro
    if ($(window).width() < 769) {
      $(".mealpopup").css({ transform: "translate(-50%, -47%)" });
    } else {
      $(".mealpopup").css("height", "auto");  
    }
    $(".mealpopup").on("scroll", function () {
      if (window.matchMedia('(max-width: 831px)').matches) {
        if($(this).scrollTop() < 0){
          $(".fancybox-close-small").css({position: "fixed", top: "0"});
        }else{
          $(".fancybox-close-small").css({position: "absolute", top: $(this).scrollTop()});
        }
      }else {
        $(".fancybox-close-small").css("top", $(this).scrollTop());
      }
    }); 

    var total = protein + carbs + fat;
    var mealClass = $(this).data("mealclass");
    var color;
    switch (mealClass) {
      case "protein":
        color = "#c44c42";
        break;
      case "paleo":
        color = "#ce762f";
        break;
      case "keto":
        color = "#ffb83c";
        break;
      case "vegan-s":
        color = "#7f9466";
        break;
      case "whole30":
        color = "#60b5c1";
        break;
      case "vegan-l":
        color = "#789dd1";
        break;
      case "mediterranean":
        color = "#093ac1";
        break;
      default:
        color = "#00bf6f";
        break;
    }

    var macros = [protein, fat, carbs];
    $.each(macros, function (index, value) {
      var decimal = value / total;
      var percent = decimal.toFixed(2);
      var degree;
      var shade;
      if (percent >= 0.5) {
        degree = Math.floor(90 + 360 * percent) - 180;
        shade = color;
      } else {
        degree = Math.floor(90 + 360 * percent);
        shade = "#eeeef7";
      }
      var number = index + 1;
      $(".mealpop-macros div:nth-child(" + number + ")").css({
        "background-image":
          "linear-gradient(" +
          degree +
          "deg, transparent 50%, " +
          shade +
          " 50%),linear-gradient(90deg, #eeeef7 50%, transparent 50%)",
      });
    });

    //mealpop button focus
    const buttons = Array.from(document.querySelectorAll('.mealpop button, .mealpop-content button, .mealpop-cta__container a, .mealpop-images button'));
    $(document).keydown(function(event) {
      if (event.which === 9 || event.keyCode === 9 || event.shiftKey && event.keyCode == 9) {
        if (document.activeElement === buttons[buttons.length-1]) {
          buttons[0].focus();
        }
        else if(document.activeElement === buttons[0]){
          buttons[buttons.length-1].focus();
        }
      }
    });

  });
})(jQuery, this);
(function ($, root, undefined) {
  if ($(".fnl-body__grid").length) {

    $(".render-slide").on("click", function () {

      $(".fnl-body__grid").removeClass("bg-left");
      $(".fnl-body__grid").addClass("bg-center");
      $(".back-button").removeClass("hidden");
      $(".fnl-body__front").addClass("hidden");

      var buttonName = $(this).attr("data-fnl-body");
      $(".fnl-body__reveal").css("display", "none");
      $("." + buttonName).css("display", "grid");
      $(".fnl-body__grid").removeClass("grayscaled");
    });
    $(".back-button").on("click", function () {
      $(".fnl-body__grid").removeClass("bg-center");
      $(".fnl-body__grid").addClass("bg-left");
      $(".fnl-body__front").removeClass("hidden");
      $(".fnl-body__reveal").css("display", "none");
      $(".fnl-body__grid").addClass("grayscaled");
      $("#other-header").removeClass("active");
      $("#other-body__block").css("display", "none");
      $(".fnl-header").addClass("active");
      $("#fnl-body__block").css("display", "block");
      $(".back-button").addClass("hidden");

    });
    $("#fnl-header").on("click", function () {
      $(".fnl-body__grid").removeClass("grayscaled");
    });
    $("#other-header").on("click", function () {
      $(".fnl-body__grid").addClass("grayscaled");
    });

    $("#ou-load-more").on("click", function () {
      $(this).addClass("hidden");
      $(".fnl-oh__stories--card").removeClass("hidden");
    });

    $(".life-hacks__slider").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    });
  }
})(jQuery, this);

if (document.getElementById("fnl-podcast")) {
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  var player;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
      width: "100%",
      videoId:
        document.getElementsByClassName("videoInPlayList")[0].dataset.video,
      playerVars: {
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
  var playerReady = false;

  document.getElementById("podcast-header").innerHTML =
    document.getElementsByClassName("videoInPlayList")[0].dataset.title;
  document.getElementById("podcast-description").innerHTML =
    document.getElementsByClassName("videoInPlayList")[0].dataset.description;

  // 4. The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    playerReady = true;
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      console.log("video ended");
    }
  }
  var videoInList = document.getElementsByClassName("videoInPlayList");
  var renderNewVideo = function () {
    player.loadVideoById(this.dataset.video, 0, "default");
    document.getElementById("podcast-header").innerHTML = this.dataset.title;
    document.getElementById("podcast-description").innerHTML =
      this.dataset.description;
  };
  for (var i = 0; i < videoInList.length; i++) {
    videoInList[i].addEventListener("click", renderNewVideo, false);
  }
}

(function ($, root, undefined) {
  if ($(".company-gallery").length) {
    $("[data-fancybox]").fancybox({
      smallBtn: true,
    });
  }
})(jQuery, this);

(function ($, root, undefined) {
  // DOUBLE CHECK BUT MIGHT BE SAFE TO DELETE
  if ($(".page-template-ppc-menu").length) {
    $("img.logo").parent().attr("href", "/tastefresh87");
  }

  if ($(".tf-mealplan").length) {
    $(".tf-mealplan__tabs li").click(function () {
      var category = $(this).attr("aria-plan");
      $(".tf-mealplan__tabs li").attr("aria-selected", false);
      $(this).attr("aria-selected", true);
      if (category === "all") {
        $(".mealplan-card").css("display", "inline-block");
      } else {
        $(".mealplan-card").css("display", "none");
        $("." + category).each(function () {
          $(this).css("display", "inline-block");
        });
      }
      $("#tf-scroll").scrollLeft(40);
    });

    setTimeout(function () {
      $(".force-block").css("display", "block");
    }, 800);

    var overflowContainer = document.getElementById("tf-scroll");
    overflowContainer.scrollTop = 100;
    overflowContainer.scrollLeft = 150;

    var pos = { top: 0, left: 0, x: 0, y: 0 };

    overflowContainer.addEventListener("mousedown", function (e) {
      overflowContainer.style.cursor = "grabbing";
      overflowContainer.style.userSelect = "none";
      pos = {
        // The current scroll
        left: overflowContainer.scrollLeft,
        top: overflowContainer.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      overflowContainer.addEventListener("mousemove", mouseMoveHandler);
      overflowContainer.addEventListener("mouseup", mouseUpHandler);
    });

    var mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      var dx = e.clientX - pos.x;
      var dy = e.clientY - pos.y;

      // Scroll the element
      overflowContainer.scrollTop = pos.top - dy;
      overflowContainer.scrollLeft = pos.left - dx;
    };

    var mouseUpHandler = function () {
      overflowContainer.style.cursor = "grab";
      overflowContainer.style.removeProperty("user-select");
      overflowContainer.removeEventListener("mousemove", mouseMoveHandler);
    };
    if ($(window).width() < 426) {
      $("#tf-scroll").scrollLeft(40);
    }
  }

  if ($(".page-id-53210").length) {
    setTimeout(function () {
      $("#tab-4-rebrand").click();
    }, 800);
  }

//tastefresh UTM   
$.ajax({
    url: "/wp-json/api/v1/promos",
    type: "GET",
    success: function (res) {
      insertUTMCode(JSON.parse(res));
    },
  });

  function insertUTMCode(dataList) {
  if ($(".page-with-utm").length) {
    const utmParam = window.location.search;
    const searchParam = new URLSearchParams(utmParam);
    const utmcode = searchParam.get('utm_medium');
    const utmDetail = dataList.find(function(item) {
      if(Object.values(item)[0].toLowerCase() === utmcode.toLowerCase()) {
        return item;
      } 
    });

    if(Object.keys(utmDetail).length > 0) { 
      //update hero copy
      const utmPageHero = $(".page-with-utm .hero-full").find("h1.header");
      utmPageHero.text(utmDetail["hero_copy"]);
      //update CTA
      $('.page-with-utm a.btn').each( function() {
        const oldButtonUrl = $(this).attr('href');
        const newButtonUrl = oldButtonUrl.split('?')[0];

      //Vegan page vegan button
        if (utmParam.indexOf('vegan') > 0 && newButtonUrl.indexOf("vegan-standard") > 0 ){
           $(this).attr('href', newButtonUrl + '?promo=' + utmDetail["promo"]); 
           $(this).text(utmDetail["hero_copy_button"]);
        }
      //regular tastefresh page
       if(utmParam.indexOf('vegan') < 0) {
        $(this).attr('href', newButtonUrl + '?promo=' + utmDetail["promo"]); 
        $(this).text(utmDetail["hero_copy_button"]);
      }

    });
    }
  }
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

  function setDescriptionLocation(width) {
    if (width < 768) {
      $(".recipe-description").insertAfter(".recipe-categories");
    } else {
      $(".recipe-description").insertAfter(".recipe-info-container");
    }
  }

  if ($(".recipe-ingredients").length) {
    var steps = recipeSteps;
    $(".recipe-step").on("click", function () {
      // Update selected img
      var idx = $(this).data("step");
      $(".js-stepImg").attr({
        src: steps[idx].image.url,
        alt: steps[idx].image.alt,
      });

      // Update selected class
      $(".recipe-step").removeClass("selected");
      $(this).addClass("selected");
    });
  }

  if ($(".recipe-tab-list").length) {
    var tabby = Tabby("[data-tabs]");
  }

  if ($(".recipe-content").length) {
    var moveElement = debounce(function () {
      var width = $(window).width();
      setDescriptionLocation(width);
    }, 250);

    window.addEventListener("resize", moveElement);
    setDescriptionLocation($(window).width());
  }
  $(".js-openFilter").on("click", function () {
    $(this).toggleClass("active");
    $(".recipe-filter-container").slideToggle();
  });

  $(".js-shareBtn").on("click", function () {
    if ($(".a2a-popup").hasClass("open")) {
      return;
    }
    $(".a2a-popup").toggle(300, function () {
      $(this).focus().addClass("open");
    });
  });

  $(".a2a-popup").on("blur", function () {
    $(".a2a-popup").toggle(300, function () {
      $(".a2a-popup").removeClass("open");
    });
  });
})(jQuery, this);

(function ($, root, undefined) {
  $(function () {
    "use strict";
    var templateUrl = myScript.template_url;

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

    

    $(".js-accordion")
      .on("click", ".accordion-header", function () {
        console.log("clicking");
        if ($(this).hasClass("active")) {
          return;
        }
        if (!$(this).next().is(":visible")) {
          var closingTab = $(".accordion-header.active").data("faq");
          if (closingTab !== undefined) {
            closingTab.action = "collapse";
            window.dataLayer.push(closingTab);
          }
          $(".accordion-header.active").removeClass("active").next().slideUp();
          $(this).addClass("active");
          $(this).next().slideDown("slow");
          var tag = $(this).data("faq");
          tag.action = "expand";
          window.dataLayer.push(tag);
        }
      })
      .find(".accordion-content")
      .hide();
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

(function ($, root, undefined) {
  if ($(".page-template-senior-page").length) {
    $(
      ".steps-container .step:nth-child(4), .homepage-js-accordion li:nth-child(4), .trail"
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

      $("#step-"+ slickIndex +"-content").slideDown("slow").css("display", "block");
      $("#step-"+ slickIndex +", #step-"+ slickIndex +"-second").addClass("active");
  
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
      appendArrows:timeLineCarousel.parent().find('.carousel-bottom .box .progressBarContainer')
     
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
      appendArrows:reviewCarousel.parent().find('.review-carousel--arrow-box'),

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
        $.each( iconList, function( key, value ) {
          if(value) {
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
    if ($(window).width() > 993) {
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
