const d = document;
const $ = query => d.querySelector(query);
const create = el => document.createElement(el);

const card = $('.card');
const cardWrap = create('div');
const scene = create('div');
const front = create('button');
const back = create('button');
const tagLine = $('.card header p').cloneNode(true);
const logo = create('div');
const stripes = create('div');
const more = $('.more');

for (let i = 0; i < 4; i++) {
	const stripe = create('div');

	stripe.className = `stripe-${String.fromCharCode(i + 97)}`;

	stripes.append(stripe);
}

cardWrap.className = 'wrap';
front.className = 'card front';
logo.className = 'logo';
stripes.className = 'stripes';
scene.className = 'scene';

back.title = 'Flip';
back.innerText = '←';

back.setAttribute('aria-hidden', true);
front.setAttribute('aria-hidden', true);
card.classList.add('back');

card.append(back);
front.append(logo);
front.append(tagLine);
cardWrap.append(front);
cardWrap.append(card);
scene.append(cardWrap);
scene.append(more);

document.body.prepend(scene);
document.body.prepend(stripes);

function flip() {
	cardWrap.classList.add('flip');
	cardWrap.classList.remove('unflip');
	document.body.classList.add('flipped');
	document.body.classList.remove('unflipped');
	window.location.hash = '#more';
}

function unflip() {
	cardWrap.classList.add('unflip');
	cardWrap.classList.remove('flip');
	document.body.classList.remove('flipped');
	document.body.classList.add('unflipped');
	window.location.hash = '';
}

front.addEventListener('click', flip);
back.addEventListener('click', unflip);

if (window.location.hash === '#more') {
	flip();
}
