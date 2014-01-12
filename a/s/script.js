/*!
  * =============================================================
  * florianpichler.de - made by @pichfl in 2013
  * =============================================================
  */
;(function(win) {

	// Fixes
	$(document).on('touchstart', function() {});

	// vCard

	var card = $('<div>').addClass('card')
	, cardFront = $('<div>').addClass('front')
	, cardBack = $('section.vcard').addClass('back')
	, triggers = $('header').and(cardFront)
	, built = false
	, positionedClass = 'positioned';

	function flip(event) {
		event.preventDefault();
		card.toggleClass('flip');
		resize();
	}

	function resize() {
		var h = cardFront.height();

		if (card.hasClass('flip')) {
			h = cardBack.height();
		}

		card.css({
			'height': h
			, 'margin-top': Math.round(($.viewport().height - h) * 0.2)
		});
	}

	// About this page

	var aside = $('aside')
	, asideInner = $('<div>').addClass('inner')
	, asideToggle = $('<div><i>i</i></div>').addClass('toggle');

	asideToggle.on(Modernizr.touch?'touchstart':'click', function() {
		aside.toggleClass('show');
	})

	function respond() {
		if ($.viewport().width > 640) {
			triggers.on(Modernizr.touch?'touchstart':'click', flip);

			if (!built) {
				cardBack.before(card);
				card.append(cardFront).append(cardBack);
				asideInner.append(aside.children());
				aside.append(asideToggle).append(asideInner);

				built = true;
			}

			resize();

			setTimeout(function() { card.addClass(positionedClass) }, 5);
		} else {
			triggers.off(Modernizr.touch?'touchstart':'click',  flip);

			if (built) {
				card.before(cardBack);
				card.detach()
				cardFront.detach();
				aside.append(asideInner.children());
				asideToggle.detach();
				asideInner.detach();

				built = false;
			}

			card.removeClass(positionedClass);

			card.css({
				'margin-top': 0
				, 'height': 'auto'
			});
		}
	}

	respond();
	$(this).on('resize', respond);


} (this));