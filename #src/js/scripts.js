@@include('modules/fancybox/jquery.fancybox.min.js')
@@include('modules/materialize/materialize.min.js')
@@include('modules/wow/wow.min.js')
@@include('modules/slick/slick.js')
@@include('modules/masonry/masonry.pkgd.min.js')
//@@include('modules/formstyler/jquery.formstyler.min.js')
@@include('modules/formstyler/jquery.mfs.min.js')
@@include('modules/maskedinput/jquery.maskedinput.min.js')
@@include('modules/yall/yall.min.js')
@@include('modules/jgrowl/jquery.jgrowl.min.js')


$(document).ready(function() {

	/* fancybox модалки */
  $('.fancybox').fancybox();
  /* END fancybox модалки */

  /* анимация поисковой строки в шапке */
  if ($('.searchline.searchline_js_animated').length) {
  	let $searchline = $('.searchline.searchline_js_animated');
  	let $toggle_icon = $searchline.find('button.searchline__btn-icon, button.searchline__close');

  	$toggle_icon.on('click', function(e) {
  		var $current_searchline = $(this).closest('.searchline');
  		
  		$current_searchline.toggleClass('searchline_slide');
  		if ($current_searchline.hasClass('searchline_absolute')) {
  			setTimeout(function() {
  				$current_searchline.removeClass('searchline_absolute');
  			}, 100);
  		} else {
  			$current_searchline.addClass('searchline_absolute');
  		}
  	});
  }
  /* END анимация поисковой строки в шапке */

  /* функционал главного мобильного меню */
  if ( $(window).width() <= 992 ) {
	  $('.nav__mobile').on('click', function(e) {
	  	//console.log( $(e.target).closest('.mobile-menu-btn') );

	  	if ( $(e.target).closest('.mobile-menu-btn').hasClass('mobile-menu-btn') ) {
	  		var $mobile_menu_btn = $(e.target).closest('.mobile-menu-btn');

	  		if ( $mobile_menu_btn.hasClass('mobile-menu-btn_active') ) {
	  			if ( $mobile_menu_btn.hasClass('mobile-menu-btn_type_back') ) {
	  				$mobile_menu_btn.removeClass('mobile-menu-btn_type_back');
	  				$('.nav__wrap .nav__subnav').removeClass('nav__subnav_active');
	  			} else {
		  			$mobile_menu_btn.removeClass('mobile-menu-btn_active');
		  			$('body').removeClass('body_stop_scrolling');
		  			$('.nav__wrap').removeClass('nav__wrap_visible');
		  			$('.social-contacts.social-contacts_fixed').removeClass('social-contacts__nav-dominated-you');
		  			$('.nav__mobile-search-btn').removeClass('nav__mobile-search-btn_fixed');
		  		}
	  		} else {
	  			$mobile_menu_btn.addClass('mobile-menu-btn_active');
	  			$('body').addClass('body_stop_scrolling');
	  			$('.nav__wrap').addClass('nav__wrap_visible');
	  			$('.social-contacts.social-contacts_fixed').addClass('social-contacts__nav-dominated-you');
	  			$('.nav__mobile-search-btn').addClass('nav__mobile-search-btn_fixed');
	  		}

	  	} else if ( $(e.target).hasClass('nav__mobile-search-btn') ) {
	  		$('.nav__mobile-search').addClass('nav__mobile-search_active');
	  		$('.social-contacts.social-contacts_fixed').addClass('social-contacts__nav-dominated-you');
	  	} else if ( $(e.target).hasClass('searchline__close') ) {
	  		$('.nav__mobile-search').removeClass('nav__mobile-search_active');
	  		if ( !$('.mobile-menu-btn').hasClass('mobile-menu-btn_active') ) {
	  			$('.social-contacts.social-contacts_fixed').removeClass('social-contacts__nav-dominated-you');
	  		}
	  	}
	  });
	  $('.nav__item_has-subnav').on('click', function(e) {
	  	//console.log( $(e.target) );
	  	if ( $(e.target).hasClass('nav__item_has-subnav') ) {
	  		var $subnav = $(e.target).find('.nav__subnav');

	  		if ( $subnav.hasClass('nav__subnav_active') ) {
	  			$subnav.removeClass('nav__subnav_active');
	  			$('.mobile-menu-btn').removeClass('mobile-menu-btn_type_back');
	  			
	  		} else {
	  			$subnav.addClass('nav__subnav_active');
	  			$('.mobile-menu-btn').addClass('mobile-menu-btn_type_back');
	  		}
	  	}
	  });
	}
  /* END функционал главного мобильного меню */

	/* LazyLoad для картинок */
	{
		let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	  let isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	  if (isSafari || isMac) {
	    $('img').each(function (i) {
	      var $win = $(window);
	      var $marker = $(this);
	      //отслеживаем событие прокрутки страницы
	      $win.scroll(function () {
	        //Складываем значение прокрутки страницы и высоту окна, этим мы получаем положение страницы относительно нижней границы окна, потом проверяем, если это значение больше, чем отступ нужного элемента от верха страницы, то значит элемент уже появился внизу окна, соответственно виден
	        if ($win.scrollTop() + $win.height() >= $marker.offset().top) {
	          $marker.attr('src', $marker.attr('data-src'));
	        } else {
	        }
	      });
	    })
	  } else {
	    document.addEventListener("DOMContentLoaded", yall, true);
	  }
	}
	/* END LazyLoad для картинок */
  
	/* непрозрачный хедер при скролле страницы */
	{
	  let header = document.querySelector(".header"),
	      start_point = 0;
	  
	  function fillHeader() {
			var cur_scroll_position = window.pageYOffset || document.documentElement.scrollTop;
			start_point < cur_scroll_position ? header.classList.add("header_fill") : header.classList.remove("header_fill")
	  }
	  if (header) {
	    window.addEventListener("scroll", fillHeader, false)
	  }

	  // Запускаем при обновлении страницы
	  fillHeader();
  }
  /* END непрозрачный хедер при скролле страницы */
  
  /* карусель с лицензиями на старинце «О нас» */
  var $carousel = $('.carousel');

  if ($carousel.length) {
	  var carousel_param = {};
	  if ($(window).width() <= 992 && $(window).width() > 576) {
	  	carousel_param = {
	  		numVisible: 3,
		  	dist: -55,
		  	shift: -125,
		  	onCycleTo: carouselOnCycleTo,
	  	};
	  } else if ($(window).width() <= 576) {
	  	carousel_param = {
	  		numVisible: 3,
		  	dist: -55,
		  	shift: -143,
		  	onCycleTo: carouselOnCycleTo,
	  	};
	  } else {
	  	carousel_param = {
	  		numVisible: 3,
		  	dist: -55,
		  	shift: -50,
		  	onCycleTo: carouselOnCycleTo,
	  	};
	  }

	  $carousel.carousel(carousel_param);

	  function carouselOnCycleTo(elem) {
	  	let current_slide_num = $(elem).index() + 1;
	  			slides_total = this.count;
	  	$('.block-license__slider-pages').text('0'+current_slide_num+'/0'+slides_total);
	  }

	  $('.block-license__slider-nav').on('click', function(event) {
	  	if ($(event.target).hasClass('block-license__slider-btn_prev')) {
	  		$carousel.carousel('prev');
	  	} else {
	  		$carousel.carousel('next');
	  	}
	  });
	}
  /* END карусель с лицензиями на старинце «О нас» */

  /* кнопка прокрутки к верху страницы */
  $(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.to-top').fadeIn();
		} else {
			$('.to-top').fadeOut();
		}
	});
      
  $('.to-top').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
  });
  /* END кнопка прокрутки к верху страницы */

	/* слайдер на странице Лицензии */
	$(function() {  
		$('.block-license2__slider-pages-total').each(function(index, el) {
			var _col = $(this).closest('.block-license2__wrap').find('.block-license2__slider-item');
			$(this).text('0'+_col.length);
		});
		$('.block-license2__slider-btn').click(function(event) {
			var _section = $(this).closest('.block-license2__wrap');
			var _parent = _section.find('.block-license2__slider');
			var _current = 0;
			if ($(this).hasClass('block-license2__slider-btn_prev')) {
				_parent.slick('slickPrev');
				_current = _parent.slick('slickCurrentSlide');
			}
			if ($(this).hasClass('block-license2__slider-btn_next')) {
				_parent.slick('slickNext');
				_current = _parent.slick('slickCurrentSlide');
			}
			_section.find('.block-license2__slider-pages-current').text('0'+(_current+1));
		});
		$('.block-license2__slider').slick({
			fade: true,
			arrows: false,
			lazyLoad: 'ondemand',
		});
	});
	/* END слайдер на странице Лицензии */

	/* кнопка списка услуг на странице услуг */
	if ($('.services-links').length) {
		$('.services-links__btn-mob').on('click', function () {
			$('.services-links__list').slideToggle('slow');
			$(this).toggleClass('services-links__btn-mob_active');
		});
	}
	/* END кнопка списка услуг на странице услуг */

	/* фильтр услуг на странице услуг */
	if ($('.services-masonry__list').length) {
		$('.services-masonry__list').masonry({
			itemSelector: '.services-masonry__item',
			columnWidth: '.services-masonry__item',
			gutter: '.services-masonry__item_gutter_sizer',
		});

		$('.services-links__list').on('click touch','.services-links__item-link',function(e){
      e.preventDefault();
      console.log($('.services-links__list').length);
      $('.services-links__item-link').removeClass('services-links__item-link_active');
      $(this).addClass('services-links__item-link_active');
      $('.services-masonry__tab-container').fadeOut();
      $('.services-masonry__tab-container[data-id="'+$(this).data("click")+'"]').fadeIn(function() {
      	$('.services-masonry__list').masonry({
	        itemSelector: '.services-masonry__item',
	        columnWidth: '.services-masonry__item',
	        gutter: '.services-masonry__item_gutter_sizer',
	      });
      });
      
      // скроллим к списку услуг
			var id = $(this).attr('href'),
			top = $(id).offset().top - 100;
			$('body,html').animate({scrollTop: top}, 900);
		});
	}
	/* END фильтр услуг на странице услуг */

	/* FAQ */
	if ($('.block-faq').length) {
		$('.block-faq__question').click(function(event) {
		  var _item = $(this).closest('.block-faq__item');
		  if (_item.hasClass('block-faq__item_active')) {
		    _item.removeClass('block-faq__item_active');
		    _item.find('.block-faq__answer').slideUp('fast');
		  } else {
		    $('.block-faq__item').removeClass('block-faq__item_active');
		    $('.block-faq__answer').slideUp('fast');
		    _item.addClass('block-faq__item_active');
		    _item.find('.block-faq__answer').slideDown('fast');
		  }
		});
	}
	/* END FAQ */

	/* form free request */
	if ($('.form-free-request').length) {
		if ($('.form-free-request input[name="inn"]').length) {
			$('.form-free-request input[name="inn"]').mask("9999999999");
		}
		if ($('.form-free-request .form-free-request__select').length) {
			$('.form-free-request__select').mfs();
		}
	}
	/* END form free request */

	/* pricelist accordeon */
	if ($('.block-pricelist').length) {
		$('.block-pricelist__item-heading').on('click', function (e) {
		  e.preventDefault();
			// Add the correct active class
			if ($(this).parent(".block-pricelist__item").hasClass("block-pricelist__item_active")) {
				if ($(this).next(".block-pricelist__sublist-wrap_nested").length) {
					// закрываем все раскрытые вложенные списки
					$(this).parent(".block-pricelist__item_active").find(".block-pricelist__sublist-wrap").find(".block-pricelist__item").removeClass('block-pricelist__item_active');
					$(this).parent(".block-pricelist__item_active").find(".block-pricelist__sublist-wrap").slideUp('fast');
				} else {
					$(this).parent(".block-pricelist__item").removeClass('block-pricelist__item_active');
					$(".block-pricelist__sublist-wrap").slideUp('fast');
				}
			} else {
		    if ($(this).parent(".block-pricelist__item").hasClass('block-pricelist__item_active')) {
		      // Remove active classes
		      if ($(this).next(".block-pricelist__sublist-wrap_nested").length) {
		        $(this).next(".block-pricelist__sublist-wrap_nested").parent(".block-pricelist__item").removeClass('block-pricelist__item_active');
		      } else {
		        $('.block-pricelist__item').removeClass('block-pricelist__item_active');
		      }
		    } else {
		      if ($(this).next(".block-pricelist__sublist-wrap_nested").length) {
		        if ($(this).next(".block-pricelist__sublist-wrap").is(":visible")) {
		          $(this).next(".block-pricelist__sublist-wrap").slideUp('fast');
		          $(this).parent(".block-pricelist__item").removeClass('block-pricelist__item_active');
		        } else {
		          //alert("dssd");
		          // $(this).parent(".accordion-item").removeClass('active');
		          $(this).parent(".block-pricelist__item").addClass('block-pricelist__item_active');
		        }
		      } else {
		        $('.block-pricelist__item').removeClass('block-pricelist__item_active');
		        $(this).parent(".block-pricelist__item").addClass('block-pricelist__item_active');
		      }
		    }

		    if ($(this).next(".block-pricelist__sublist-wrap_nested").length) {
		      if ($(this).next(".block-pricelist__sublist-wrap").is(":hidden")) {
		      	$(this).parent(".block-pricelist__item").closest(".block-pricelist__sublist-wrap").find(".block-pricelist__item").removeClass('block-pricelist__item_active');
		        $(this).parent(".block-pricelist__item").addClass('block-pricelist__item_active');
		        $(this).find(".accordion-icon").addClass('aa');
		        $(this).parent(".block-pricelist__item").closest(".block-pricelist__sublist-wrap").find(".block-pricelist__sublist-wrap_nested").slideUp('fast');
		        $(this).next(".block-pricelist__sublist-wrap_nested").slideDown(100);
		      } else {
		      	$(this).parent(".block-pricelist__item").removeClass('block-pricelist__item_active');
		        $(this).find(".accordion-icon").removeClass('aa');
		        $(this).next(".block-pricelist__sublist-wrap").slideUp('fast');
		        $(this).parent(".block-pricelist__item").removeClass('block-pricelist__item_active');
		      }
		    } else {
		      $(".block-pricelist__sublist-wrap").slideUp('fast');
		      var $content = $(this).next();
		      $content.slideDown(100);
		      $('.block-pricelist__item .content').not($content).slideUp('fast');
		    }
		  }
		  $(".accordion-content_1").parents(".accordion").find(".accordion-item.active").find(".heading").find(".accordion-icon").addClass("accordion-icon_2");
		  $(".accordion-content_1").parents(".accordion").find(".accordion-item.active").find(".heading").css({
		    "background-color": "#032745"
		  });
		  $(".accordion-content_1").parents(".accordion").find(".accordion-item.active").find(".accordion-content").find(".heading").css({
		    "background-color": "#081d2f"
		  });
		  setTimeout(ff, 400, $(this));

		  function ff(el) {
		    var destination = el.offset().top;
		    //console.log(destination.top);
		    $('html,body').animate({
		      scrollTop: destination
		    }, 300);
		  }

		});
	}
	/* END pricelist accordeon */

	/* conversion events */
	function gtag_report_conversion_vi(url) {
    var callback = function () {
        console.log('gtag_report_conversion_vi');
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-788332171/fZUICMbulekBEIv98_cC',
        'event_callback': callback
    });
    return false;
  }
  $(document).on('click touch', 'a[href*="viber:"]', function(e){
      gtag_report_conversion_vi();
  });

  function gtag_report_conversion_wa(url) {
    var callback = function () {
        console.log('gtag_report_conversion_wa');
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-788332171/rapRCMeO9egBEIv98_cC',
        'event_callback': callback
    });
    return false;
  }
  $(document).on('click touch', 'a[href*="wa.me"]', function(e){
      gtag_report_conversion_wa();
  });
  
  function gtag_report_conversion_tg(url) {
    var callback = function () {
        console.log('gtag_report_conversion_tg');
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-788332171/JXQUCLzwlekBEIv98_cC',
        'event_callback': callback
    });
    return false;
  }
  $(document).on('click touch', 'a[href*="t.me"]', function(e){
      gtag_report_conversion_tg();
  });
  
  function gtag_report_conversion_zayavka(url) {
    var callback = function () {
        console.log('gtag_report_conversion_zayavka');
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-788332171/M28zCM7qlekBEIv98_cC',
        'transaction_id': '',
        'event_callback': callback
    });
    return false;
  }
  $(document).on('click touch', '#main-when .holder .col.second .button', function(e){
      gtag_report_conversion_zayavka();
  });

  function gtag_report_conversion_consult(url) {
    var callback = function () {
        console.log('gtag_report_conversion_consult');
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-788332171/hrLYCJTjlekBEIv98_cC',
        'transaction_id': '',
        'event_callback': callback
    });
    return false;
  }
  $(document).on('click touch', '.mainpage_vs .header-main-button a:first-child, .order-block-inner .button ', function(e){
      gtag_report_conversion_consult();
  });
  /* END conversion events */

  /* ВСПЛЫВАЮЩИЕ ОКНА */
	// Вызов всплывающего окна
	$('[data-popup]').click(function(event) {
		var _popup_id = $(this).attr('data-popup');
		callPopup(_popup_id);
	});
	// Закрытие попапа при клике вне области
	$('.popup-main').mouseup(function (e){
	  var div = $(".popup-content");
	  if (!div.is(e.target) && div.has(e.target).length === 0) {
	    closePopup($(this));
	  }
	});
	// Закрытие при клике на кнопку
	$('.popup-close,._js_close').click(function(event) {
	  closePopup($(this));
	});

	function callPopup(_id){
	  $('body').addClass('lock-body');
	  $('.body-site-wrapper,.top-nav').addClass('blur');
	  $(_id).fadeIn('fast');
	}
	function closePopup(_object) {
	  _object.closest('.popup-main').fadeOut('fast');
	  $('body').removeClass('lock-body');
	  $('.body-site-wrapper,.top-nav').removeClass('blur');
	}
	$("#jGrowl").remove();
	//AjaxForm.Message.success = function() {};
	$(document).on('submit', '.ajax_form', function() {
	    // Здесь любой код для проверки формы при отправке
	    // Я просто печатаю её в консоли бразуреа
	    //console.log(this);
	    
	    // Результатом работы будет выставление глобальной переменной
	   // afValidated = false; // Или true, если валидация пройдена
	    /*if (afValidated===true){
	        
	    }*/
	});
	$(document).on('af_complete', function(event, response) {
    var form = response.form;
    //var af_action=form.find("input[name='af_action']").val();
    //form.find("input[name='af_action']").remove();
     
    // проверяем id формы
    //form.parents('.modal').modal('hide');
	  if (form.attr('id')=='form_vsdadata') {

	  } else {
      if (form.attr('id') == 'feedback') {
          grecaptcha.reset();
      }
      //form.append('<input type="hidden" name="af_action" value="'+af_action+'">');
      //alert(form.find(".error").length);
      //$.fancybox.close();
      setTimeout(ff1,300);
      function ff1() {
        //alert(form.find(".error").length);
        if (form.find(".error").length>0) {

        } else {
	        $.fancybox.close();
	        setTimeout(ff,400);
	        /*
	        console.log("reset");
	        form[0].reset();
	        */
        }
      }

      function ff(){
        //console.log(form.find(".error").length);
        $("#popup-success").css({"display":"block"});

        setTimeout(ff1,2000);
        function ff1(){
          $("#popup-success").fadeOut();
          location.reload(true);
        }
      }
	  }
  });
  /* END ВСПЛЫВАЮЩИЕ ОКНА */

  /* убираем ссылки на текущую страницу */
  var getUri=window.location.pathname.slice(1);

  // главное меню, первый уровень
  $("a[href*='"+getUri+"'].nav__link").parent("li").addClass("nav__item_active");
  $("a[href*='"+getUri+"'].nav__link").removeAttr("href");

  // главное меню, второй уровень
  $("a[href*='"+getUri+"'].nav__subnav-link").parent("li").addClass("nav__subnav-item_active");
  $("a[href*='"+getUri+"'].nav__subnav-link").removeAttr("href");

  // меню в подвале
	$("a[href*='"+getUri+"'].footer__nav-link").parent("li").addClass("footer__nav-item_active");
	$("a[href*='"+getUri+"'].footer__nav-link").removeAttr("href");

	// сайдбар в категории услуг
  $("a[href*='"+getUri+"'].side-nav__link").parent("li").addClass("side-nav__list-item_active");
  $("a[href*='"+getUri+"'].side-nav__link").removeAttr("href");
  /* END убираем ссылки на текущую страницу */

});