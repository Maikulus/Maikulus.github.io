$(function() {

	

	$(".owl-carousel").owlCarousel( {
		loop:true,
		responsive:{
			0:{
				items:1,
			},
			520:{
				items:1,
			},
			560:{
				items:2,
			},
			768:{
				items:2,
			},
			992:{
				items:3,
			},
			1200:{
				items:4,
			},
		}
	});

	var waypointsvg = new Waypoint({

		element: $(".s-oworks"),
		handler: function(dir) {
			
			if (dir === "down") {

				$(".s-oworks .tc-item").each(function(index) {
					var ths = $(this);
					setTimeout(function() {
						var myAnimation = new DrawFillSVG({
							elementId: "tc-svg-" + index
						});
						ths.children(".tc-content").addClass("tc-content-on");
					}, 500*index);
				});

			};
			this.destroy();
		},
		offset: '35%'
	});

	function heightses() {
		$(".corousel-text").height('auto').equalHeights();
		$(".item-vertical-desc").height('auto').equalHeights();
		$(".testimonials-head").height('auto').equalHeights();
		$(".testimonials-desc").height('auto').equalHeights();
	}

	$(window).resize(function() {
		heightses();
	});

	heightses();

	$(".toggle-mnu").click(function() {
		$(this).toggleClass("on");
		$(".main-mnu").slideToggle();
		return false;
	});

	$(".carousel-item").each(function(e) {

		var th = $(this);

		th.attr("href", "#carousel-img-" + e)
		.find(".carousel-popup")
		.attr("id", "carousel-img-" + e);

	});

	$(".carousel-item").magnificPopup({
		mainClass: 'my-mfp-zoom-in',
		removalDelay: 300,
		type: 'inline',
	});

	$("a[href*='#']").mPageScroll2id();

	//number counter
	$(".s-adv").waypoint(function() {

		$({blurRadius: 5}).animate({blurRadius: 0}, {
			duration: 1200,
			easing: 'swing',
			step: function() {
				$(".s-adv-item h3 span").css({
					"-webkit-filter": "blur("+this.blurRadius+"px)",
					"filter": "blur("+this.blurRadius+"px)"
				});
			}
		});
		var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
		$(".s-adv-item h3 span").each(function() {
			var tcount = $(this).data("count");
			$(this).animateNumber({ number: tcount,
				easing: 'easeInQuad',
				"font-size": "1.8125em",
				numberStep: comma_separator_number_step},
				1200);
		});
		this.destroy();
	}, {
		offset: '70%'
	});


	$(".mouse-icon").click(function() {
		$("html, body").animate({
			scrollTop : $(".s-adv").offset().top
		}, 800);
	});


	//Animation 
	$(".section-head p, .section-head h2").animated("fadeInUp");
	$(".s-br .buttons").animated("zoomIn");
	$(".testimonials-item").animated("slideInUp");
	$(".s-contacts .contacts").animated("slideInLeft");
	$(".s-contacts .forms").animated("slideInRight");

	$(".s-p-services").waypoint(function() {
		$(".carousel-item").each(function(index){
			var ths = $(this);
			setInterval(function() {
				ths.addClass("car-item-on");
			}, 200*index);
		});
	}, {
		offset: "30%"
	});

	$(".s-j-services").waypoint(function() {

		$(".item-vertical").each(function(index) {
			var ths = $(this);
			setInterval(function() {
				ths.addClass("card-on");
			}, 200*index);
		});

	}, {
		offset : "30%"
	});

	$(".s-callback").waypoint(function() {

		$(".s-callback .item-vertical-2").each(function(index) {
			var ths = $(this);
			setInterval(function() {
				ths.addClass("team-on");
			}, 200*index);
		});

	}, {
		offset : "35%"
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	$('.btn-callback').click(function() {
		$("#callback h4").html($(this).text());
		$("#callback input[name=formname]").val($(this).text());
	}).magnificPopup({
		type:"inline",
		mainClass: "mfp-forms"
	});

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$(".forms").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

		/*
 * Replace all SVG images with inline SVG
 */
 $('img.img-svg').each(function(){
 	var $img = $(this);
 	var imgID = $img.attr('id');
 	var imgClass = $img.attr('class');
 	var imgURL = $img.attr('src');

 	$.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

			}, 'xml');

 });

});
