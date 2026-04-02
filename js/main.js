/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	// nav.find('li a').on("click", function() {   

   	// // update the toggle button 		
   	// toggleButton.toggleClass('is-clicked'); 
   	// // fadeout the navigation panel
   	// nav.fadeOut();   		
   	     
  	// });

   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	// var sections = $("section"),
	// navigation_links = $("#main-nav-wrap li a");	

	// sections.waypoint( {

    //    handler: function(direction) {

	// 	   var active_section;

	// 		active_section = $('section#' + this.element.id);

	// 		if (direction === "up") active_section = active_section.prev();

	// 		var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

    //      navigation_links.parent().removeClass("current");
	// 		active_link.parent().addClass("current");

	// 	}, 

	// 	offset: '25%'
	// });


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	// $('.smoothscroll').on('click', function (e) {
	 	
	//  	e.preventDefault();

   	// var target = this.hash,
    // 	$target = $(target);

    // 	$('html, body').stop().animate({
    //    	'scrollTop': $target.offset().top
    //   }, 800, 'swing', function () {
    //   	window.location.hash = target;
    //   });

  	// });  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

	$('#go-top').on('click', function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, scrollSpeed);
});

$(document).ready(function() {
    var $indicator = $('.nav-indicator');

    // Centers the line under the link text
    function moveIndicator($liElement) {
        if (!$liElement.length) return;

        var $link = $liElement.find('a');
        // var $navWrapper = $('.main-navigation'); // Target the actual UL container
        var navLeft = $('.main-navigation').offset().left;

        // Calculate position relative to the UL container
        var linkLeft = $link.position().left;
        var linkWidth = $link.outerWidth();

        $('.nav-indicator').css({
            width: linkWidth,
            left: linkLeft
        });
    }

	function resizeResumeIframe() {
	    var iframe = document.getElementById('resume-frame');
	    if (iframe && iframe.contentWindow && iframe.contentWindow.document.body) {
	        // Reset height to a small value first to force a re-calculation
	        iframe.style.height = "10px"; 
	        // Set height to the actual scroll height of the internal content
	        iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
	    }
	}

	// Ensure the resize also happens when you resize the browser window
	$(window).on('resize', function() {
	    if ($('#resume').hasClass('active-page')) {
	        resizeResumeIframe();
	    }
	    moveIndicator($('.main-navigation li.current'));
	});

    // Set Initial State
    $('body').addClass('home-active');
	$('.main-navigation li').removeClass('current');
	$('.main-navigation li a[href="#intro"]').parent().addClass('current');

	moveIndicator($('.main-navigation li.current'));
    setTimeout(function() {
        moveIndicator($('.main-navigation li.current'));
    }, 400);

// Tab Clicking and Section Swapping
    $('.main-navigation a, .smoothscroll').on('click', function(e) {
        var targetHash = this.hash;
		var $targetLink = $('.main-navigation a[href="' + targetHash + '"]');
		var $targetLi = $targetLink.parent('li');

        var $clickedLi = $(this).parent('li');

        if (targetHash && $(targetHash).length > 0) {
            // Home Flow (Intro, About, Contact)
            if (targetHash === "#intro" || targetHash === "#about" || targetHash === "#contact") {
                e.preventDefault();
                $('body').addClass('home-active');
                $('section').removeClass('active-page');

                // Force the "Home" section to scroll to absolute 0
                var scrollPosition = (targetHash === "#intro") ? 0 : $(targetHash).offset().top;

                $('html, body').animate({
                    scrollTop: scrollPosition
                }, 800);
            } else {
                // Standalone Pages (Resume, Portfolio, Blog, Publications)
                $('body').removeClass('home-active');
                $('section').removeClass('active-page');
                $(targetHash).addClass('active-page');
                window.scrollTo(0, 0);
            }
            
            $('.main-navigation li').removeClass('current');
            $clickedLi.addClass('current');
            moveIndicator($clickedLi);

			// Highlight the correct tab and move the indicator
            if ($targetLi.length > 0) {
                $('.main-navigation li').removeClass('current');
                $targetLi.addClass('current');
                moveIndicator($targetLi);
            }
        }
    });

    // You can also delete the resizeResumeIframe function entirely.

    $(window).on('resize', function() {
        moveIndicator($('.main-navigation li.current'));
    });

	// --- Custom Scrollbar Visibility Timer ---
	var scrollTimer;
	$(window).on('scroll', function() {
	    // Show the scrollbar thumb by adding the class
	    $('body').addClass('is-scrolling');
	
	    // Clear the previous timeout
	    window.clearTimeout(scrollTimer);
	
	    // Set a timer to remove the class after scrolling stops
	    scrollTimer = setTimeout(function() {
	        $('body').removeClass('is-scrolling');
	    }, 1000); // 1000ms = 1 second delay
	});


	/* --- Automatic Tab Indicator (Scroll Spy) --- */
	var sections = $("#intro, #about, #contact"); 

	sections.waypoint({
	    handler: function(direction) {
	        if (!$('body').hasClass('home-active')) return;

	        var active_id = this.element.id;
	        
	        // If scrolling up, we need to ensure we only target 
	        // visible sections (Intro, About, or Contact)
	        if (direction === "up") {
	            if (active_id === "contact") active_id = "about";
	            else if (active_id === "about") active_id = "intro";
	        }

	        var active_link = $('#main-nav-wrap a[href="#' + active_id + '"]');
	        if (active_link.length > 0) {
	            var $parentLi = active_link.parent();
	            $('.main-navigation li').removeClass('current');
	            $parentLi.addClass('current');
	            moveIndicator($parentLi);
	        }
	    },
	    offset: '50%' // Trigger earlier for a more responsive feel
	});

	// Smooth horizontal scroll for mobile menu tabs
    $('.main-navigation a').on('click', function() {
        if ($(window).width() < 768) {
            var $container = $('.main-navigation');
            var $item = $(this).parent();
            var scrollLeft = $item.position().left + $container.scrollLeft() - ($container.width() / 2) + ($item.width() / 2);
            
            $container.animate({
                scrollLeft: scrollLeft
            }, 400);
        }
    });

	

	var $navText = $('#current-nav-text');
    var $mobileTrigger = $('.mobile-nav-trigger');
    var $navMenu = $('.main-navigation');
	if ($(window).width() < 768) {
    $navMenu.hide();
}

	// 1. Mobile Dropdown Toggle
	$mobileTrigger.off('click').on('click', function(e) {
	    e.stopPropagation();
	    $navMenu.stop(true, true).slideToggle(300);
	});;

    // Close menu when a link is clicked on mobile
	$('.main-navigation a').off('click.mobileClose').on('click.mobileClose', function() {
	    if ($(window).width() < 768) {
	        $navMenu.slideUp(300);
	        $navText.text($(this).text()); // Instantly update text on click
	    }
	});

	$(document).on('click', function(e) {
    if (
        !$(e.target).closest('.main-navigation').length &&
        !$(e.target).closest('.mobile-nav-trigger').length
    ) {
        $navMenu.stop(true, true).slideUp(300);
    }
	});

    // 2. Dynamic Scroll Word Sync
    var sections = $("#intro, #about, #contact"); 

    sections.waypoint({
        handler: function(direction) {
            if (!$('body').hasClass('home-active')) return;

            var active_id = this.element.id;
            
            // Map IDs to readable labels
            var navLabels = {
                'intro': 'Home',
                'about': 'About',
                'contact': 'Contact'
            };

            if (direction === "up") {
                if (active_id === "contact") active_id = "about";
                else if (active_id === "about") active_id = "intro";
            }

            // Sync the dropdown text with current section
            if (navLabels[active_id] && $(window).width() < 768) {
                $navText.text(navLabels[active_id]);
            }
        },
        offset: '25%' 
    });


});

})(jQuery);