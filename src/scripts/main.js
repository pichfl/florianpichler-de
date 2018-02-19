const d = document;
const $ = query => d.querySelector(query);
const create = el => document.createElement(el);

const card = $('.card');
const cardWrap = create('div');
const front = create('button');
const back = create('button');
const tagLine = $('.card header p').cloneNode(true);
const logo = create('div');

cardWrap.className = 'wrap';
front.className = 'card front';
logo.className = 'logo';

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

document.body.prepend(cardWrap);

front.addEventListener('click', () => {
	cardWrap.classList.add('flip');
	cardWrap.classList.remove('unflip');
	document.body.classList.add('flipped');
});

back.addEventListener('click', () => {
	cardWrap.classList.add('unflip');
	cardWrap.classList.remove('flip');
	document.body.classList.remove('flipped');
});

cardWrap.addEventListener('animationend', () => console.log('ended'));
