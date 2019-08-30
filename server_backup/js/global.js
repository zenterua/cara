var _functions = {};

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr, headerH, bannerH, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style;

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
		headerH = $('header').height();
		$('.fullSize .cellView').css({height: winH});
		bannerH = $('.pageBanner').height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/

	// Check if mobile mobile device
	if(_ismobile) $('body').addClass('mobile');

	// Main set time out for content loaded
	setTimeout( function() {
		// Add class after page loaded
		$('body').addClass('loaded');

		// Page calculations functuin
		_functions.pageCalculations();

		// Custom select init
		$('.SelectBox').SumoSelect();

		// Delate main page loader
		$('#loader-wrapper').fadeOut(300);

		if(!$('.hamburger').is(':visible')) mainNavList();

		// Swiper init function
		_functions.initSwiper();

		// Run video
	    runVideo();

	    // Header animation scroll
	    headerScrolled();

	}, 700);

	/*==============================*/
	/* 04 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
		if(!$('.hamburger').is(':visible')) mainNavList();
		runVideo();
	};
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 05 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();

		// Header animation scroll
	    headerScrolled();

	    // Run video
		runVideo();

		// Hide drop menu drop down after scroll and hide closelayer
		$('.dropDowm').removeClass('active');
		$('.closeLayer').removeClass('active');
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();
	};

	/*=====================*/
	/* 06 - swiper sliders */
	/*=====================*/

	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) }, 1500: {slidesPerView: parseInt($t.attr('data-lg-slides'), 10)} } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        keyboardControl: true,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_isFF)?($t.data('parallax'), 0): ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				centeredSlides: ($t.is('[data-centered]'))?parseInt($t.data('centered'), 10):0,
				freeMode: ($t.is('[data-free-mode]'))?$t.data('free-mode'): false,
				disableOnInteraction: false,
				preventClicks: false
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});
		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).parent().find('.swiper-control-top').attr('id')];
		});
	};

	function mainNavList() {
		var navListW = 0,
			listInter = 0,
			logoW = $('#logo').outerWidth(),
			inquireW = $('.inquire').outerWidth(),
			navList = $('nav li'),
			brandsW = $('.brands').outerWidth(),
			headerNavW = winW - logoW - inquireW - brandsW + 30,
			headerNavWrapW = winW - logoW - inquireW - 30;

			$('nav li').each(function() {
				if($('.hamburger').is(':visible')) return false;
				if ( headerNavW - 200 > navListW ) {
					navListW += $('nav li').eq(listInter).outerWidth();
					listInter ++;	
					$('.navWrapper').css({width: headerNavWrapW - 30 });
					$('nav').css({width: navListW});
				}else {
					$('nav').css({width: navListW});
					$('nav.swiper-container').css({width: navListW});
					$('nav.swiperMainWrapper').removeClass('hideTransform');
					$('.navWrapper').css({width: headerNavWrapW - 30 });
					setTimeout(function() {
						swipers['swiper-' + $('nav li').closest('.swiperMainWrapper').find('.swiper-container').attr('id')].update();
					},1000);
					
				}	
			});
	}
	/*==============================*/
	/* 07 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(){
		if ( $(this).hasClass('play-button') ) { //Check if video popup
	 		var videoSrc = $(this).attr('data-video-src');
				setTimeout(function() {
					$('.popupContent').find('iframe').attr('src', videoSrc + '??modestbranding=1;iv_load_policy=0;modestbranding=1;showinfo=0&amp;autoplay=1');
				},700);
				$('.popupContent').removeClass('active');
			}
		$('.popupContent').removeClass('active');
		$('.popupWrapper, .popupContent[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popupWrapper .buttonClose, .popupWrapper .layerClose', function(){
		$('.popupWrapper, .popupContent').removeClass('active');
		$('.popupContent').find('iframe').attr('src', '');
		$('html').removeClass('overflow-hidden');
		setTimeout(function(){
			$('.ajax-popup').remove();
		},300);
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}

	//Tabs
	var tabsFinish = 0;
	$('.tab-menu').on('click', function() {
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabs-block'),
        	tabsMenu = tabsWrapper.find('.tab-menu'),
        	tabsItem = tabsWrapper.find('.tab-entry'),
        	index = tabsMenu.index(this),
        	currentHtml = $(this).find('span').html();
        
        tabsItem.filter(':visible').fadeOut(function(){
        	tabsItem.eq(index).fadeIn(function(){
        		tabsFinish = 0;
        	});
        });
        tabsMenu.removeClass('active');
        $(this).addClass('active');
        if( !$('.hamburger').is(':visible')) return false;
        $('.tabMenuResponsive .as').html(currentHtml);
        $(this).closest('.tabMenuWrapper').slideToggle(350);
        $('.tabMenuResponsive i').removeClass('iconRotate');
    });

	//Accordeon
	$('.accordeon-title').on('click', function(){
		$(this).closest('.accordeon').find('.accordeon-title').not(this).removeClass('active').next().slideUp();
		$(this).addClass('active').next().slideDown();
	});

	// Scroll top button
	$('.scrollTopButton').on('click', function() {
		$('body, html').animate({scrollTop: 0}, 666);
	});

	// Start video
	$('.play-button').on('click', function() {
		$(this).closest('.video-container').addClass('play');
	});

	// Mute sound main page banner
	$('.mute').on('clicl', function() {
		$(this).toggleClass('active');
	});

	//Hamburger
	$('.hamburger').on('click', function() {
		$(this).toggleClass('hamburgerActive');
		$('.navWrapper').toggleClass('active');
		if ($('.leftSideBar').length ) $('.leftSideBar').removeClass('show');
	});

	// Header navigation 
	$('.brands').on('click', function() {
		if( !$('.hamburger').is(':visible')) return false;
		$(this).find('i').toggleClass('iconRotate');
		$('.dropDowm').slideToggle(350);
	});
	$('.tabMenuResponsive').on('click', function() {
		if( !$('.hamburger').is(':visible')) return false;
		$(this).find('i').toggleClass('iconRotate');
		$(this).closest('.tabs-block').find('.tabMenuWrapper').slideToggle(350);
	});

	// Scroll banner down
	$('.scrollDown').on('click', function() {	
		$('html, body').animate({scrollTop: $(this).closest('.cellView').outerHeight() -55 }, 666);
	});

	$('.scrollTo').on('click', function() {
		$('body, html').animate({scrollTop: $('.formWrapper').offset().top}, 888);
	});

	// brand drop down
	$('.brands').on('click', function() {
		$('.dropDowm').toggleClass('active');
		$('.closeLayer').addClass('active');
	});

	// Close layer
	$('.closeLayer').on('click', function() {
		$(this).removeClass('active');
		$('.dropDowm').removeClass('active');
	});

	// Clear map brands
	$('.clearCheckboxs').on('click', function() {
		$('.checkboxEntry input').prop('checked', false); 
	})

	// Hide map nav
	$('.closeSideBar').on('click', function() {
		$('.leftSideBar').removeClass('show');
	});

	$('.openSideBar').on('click', function() {
		$('.leftSideBar').addClass('show');
	});

	// Video
	function videoBannerVisible() {
		if ( $(window).scrollTop() < $(window).height() /2 || $('.videoWindow').offset().top < $(window).scrollTop() + ( $('.videoWindow').outerHeight() /2 ) && $(window).scrollTop() < $('.videoWindow').offset().top +  ( $('.videoWindow').outerHeight() /2 ) ) {
			setTimeout(function() {
				$('.videoBanner').addClass('videoActive');
				$('video')[0].play();
			}, 800);
			
		} else {
			$('.videoBanner').removeClass('videoActive');
			$('video')[0].pause();
		}
	}

	// Header scrolled
	function headerScrolled() {
		if (winScr > headerH) {
			$('header').addClass('scrolled');
		} else {
			$('header').removeClass('scrolled');
		}	
	}

	// Run video
	function runVideo() {
		if ( !_ismobile && $('.videoBanner').length && !$('.hamburger').is(':visible') ) videoBannerVisible();
	}


});