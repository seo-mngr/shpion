$(document).ready(function() {
  
	/* непрозрачный хедер при скролле страницы */
  var header = document.querySelector(".header"),
      start_point = 0;
  
  if (header) {
    window.addEventListener("scroll", function() {
      var cur_scroll_position = window.pageYOffset || document.documentElement.scrollTop;
      start_point < cur_scroll_position ? header.classList.add("header_fill") : header.classList.remove("header_fill")
    }, false)
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


});