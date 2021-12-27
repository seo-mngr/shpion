@@include('modules/fancybox/jquery.fancybox.min.js')
@@include('modules/materialize/materialize.min.js')
@@include('modules/wow/wow.min.js')
@@include('modules/slick/slick.js')


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

});