;(function(win) {

	// vCard

	var card = $('<div>').addClass('card')
	, cardFront = $('<div>').addClass('front')
	, cardBack = $('section.vcard').addClass('back')
	, triggers = $('header').and(cardFront);

	cardBack.before(card);
	card.append(cardFront).append(cardBack);

	function flip(event) {
		event.preventDefault();
		card.toggleClass('flip');
		resize();
	}

	function resize() {
		var h = ((card.hasClass('flip'))?cardBack:cardFront).height();
		card.css({
			'height': h
			, 'margin-top': Math.round(($.viewport().height - h) * 0.2)
		});
	}

	function respond() {
		if ($.viewport().width > 640) {
			triggers.on(Modernizr.touch?'touchstart':'click', flip);
			resize();
		} else {
			triggers.off(Modernizr.touch?'touchstart':'click',  flip);
			card.css({
				'margin-top': 0
				, 'height': 'auto'
			});
		}
	}

	respond();
	$(this).on('resize', respond);

	// About this page

	var aside = $('aside')
	, asideInner = $('<div>').addClass('inner')
	, asideToggle = $('<div>').addClass('toggle');

	asideInner.append(aside.children());
	aside.append(asideToggle).append(asideInner);

} (this));