@@include('modules/fancybox/jquery.fancybox.min.js')
@@include('modules/materialize/materialize.min.js')
@@include('modules/wow/wow.min.js')
@@include('modules/slick/slick.js')
@@include('modules/masonry/masonry.pkgd.min.js')


$(document).ready(function() {
  
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
	if ($('.services-links').length) {
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

});