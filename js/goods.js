'use strict';

var NAMES = [
  'Чесночные сливки',
  'Огуречный педант',
  'Молочная хрюша',
  'Грибной шейк',
  'Баклажановое безумие',
  'Паприколу итальяно',
  'Нинзя-удар васаби',
  'Хитрый баклажан',
  'Горчичный вызов',
  'Кедровая липучка',
  'Корманный портвейн',
  'Чилийский задира',
  'Беконовый взрыв',
  'Арахис vs виноград',
  'Сельдерейная душа',
  'Початок в бутылке',
  'Чернющий мистер чеснок',
  'Раша федераша',
  'Кислая мина',
  'Кукурузное утро',
  'Икорный фуршет',
  'Новогоднее настроение',
  'С пивком потянет',
  'Мисс креветка',
  'Бесконечный взрыв',
  'Невинные винные',
  'Бельгийское пенное',
  'Острый язычок'
];

var PICTURES = [
  'gum-cedar',
  'gum-chile',
  'gum-eggplant',
  'gum-mustard',
  'gum-portwine',
  'gum-wasabi',
  'ice-cucumber',
  'ice-eggplant',
  'ice-garlic',
  'ice-italian',
  'ice-mushroom',
  'ice-pig',
  'marmalade-beer',
  'marmalade-caviar',
  'marmalade-corn',
  'marmalade-new-year',
  'marmalade-sour',
  'marshmallow-bacon',
  'marshmallow-beer',
  'marshmallow-shrimp',
  'marshmallow-spicy',
  'marshmallow-wine',
  'soda-bacon',
  'soda-celery',
  'soda-cob',
  'soda-garlic',
  'soda-peanut-grapes',
  'soda-russian'
];

var amount = {
  MIN: 0,
  MAX: 20
};

var price = {
  MIN: 100,
  MAX: 1500
};

var weight = {
  MIN: 30,
  MAX: 300
};

var raiting = {
  value: {
    MIN: 1,
    MAX: 5
  },
  number: {
    MIN: 10,
    MAX: 900
  }
};

var nutritionFacts = {
  energy: {
    MIN: 70,
    MAX: 500
  }
};

var CONTENTS = [
  'молоко',
  'сливки',
  'вода',
  'пищевой краситель',
  'патока',
  'ароматизатор бекона',
  'ароматизатор свинца',
  'ароматизатор дуба, идентичный натуральному',
  'ароматизатор картофеля',
  'лимонная кислота',
  'загуститель',
  'эмульгатор',
  'консервант: сорбат калия',
  'посолочная смесь: соль, нитрит натрия',
  'ксилит',
  'карбамид',
  'вилларибо',
  'виллабаджо'
];

var STARS_RATING = [
  'stars__rating--one',
  'stars__rating--two',
  'stars__rating--three',
  'stars__rating--four',
  'stars__rating--five'
];

var BASKET_COUNT = 3;
var CATALOG_COUNT = 26;

// Функция генерации рандомного значения Boolean
function getRandomBoolean() {
  return Math.random() >= 0.5;
}
// Функция генерации рандомного значения между MIN и MAX
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция рандомного значения данных
function getRandomAttribute(arr) {
  var randomInteger = Math.floor(Math.random() * arr.length);
  return arr[randomInteger];
}

// 1
var candyGoods = [];

var makeRandomGoods = function () {
  for (var i = 0; i < CATALOG_COUNT; i++) {
    candyGoods.push({
      name: getRandomAttribute(NAMES),
      picture: './img/cards/' + getRandomAttribute(PICTURES) + '.jpg',
      amount: getRandomNumber(amount.MIN, amount.MAX),
      price: getRandomNumber(price.MIN, price.MAX),
      weight: getRandomNumber(weight.MIN, weight.MAX),
      rating: {
        value: getRandomNumber(raiting.value.MIN, raiting.value.MAX),
        number: getRandomNumber(raiting.number.MIN, raiting.number.MAX)
      },
      nutritionFacts: {
        sugar: getRandomBoolean(),
        energy: getRandomNumber(nutritionFacts.energy.MIN, nutritionFacts.energy.MAX),
        contents: getRandomAttribute(CONTENTS)
      }
    });
  }
};

makeRandomGoods();


var cards = document.querySelector('.catalog__cards');
cards.classList.remove('catalog__cards--load');
cards.querySelector('.catalog__load').classList.add('visually-hidden');

var cardTamplate = document.querySelector('#card').content.querySelector('.catalog__card');


// Заполнение шаблона
var renderCandy = function (candy) {
  var candyElement = cardTamplate.cloneNode(true);
  var amountClass;

  if (candy.amount === 0) {
    amountClass = 'card--soon';
  } else if (candy.amount >= 1 && candy.amount <= 5) {
    amountClass = 'card--little';
  } else if (candy.amount > 5) {
    amountClass = 'card--in-stock';
  }

  candyElement.className = 'card catalog__card ' + amountClass;
  candyElement.querySelector('.card__title').textContent = candy.name;

  var candyImage = candyElement.querySelector('.card__img');
  candyImage.src = candy.picture;
  candyImage.alt = candy.name;

  var cardPrice = candyElement.querySelector('.card__price');
  cardPrice.childNodes[0].textContent = candy.price + ' ';
  cardPrice.querySelector('.card__weight').textContent = '/ ' + candy.weight + 'Г';

  var starsRating = candyElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');

  starsRating.classList.add(getRandomAttribute(STARS_RATING));

  candyElement.querySelector('.star__count').textContent = candy.rating.number;

  candyElement.querySelector('.card__characteristic').textContent = candy.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';

  candyElement.querySelector('.card__composition-list').textContent = candy.nutritionFacts.contents;

  return candyElement;
};

var fragment = document.createDocumentFragment();
var appendCandy = function () {

  for (var i = 0; i < candyGoods.length; i++) {
    fragment.appendChild(renderCandy(candyGoods[i]));
  }

  cards.appendChild(fragment);
};
appendCandy();

var startIndex = getRandomNumber(CATALOG_COUNT - BASKET_COUNT, BASKET_COUNT);
var basketGoods = candyGoods.slice(startIndex, (startIndex + BASKET_COUNT));

// var basketGoods = candyGoods.slice(getRandomInt(catalog.numbers.MAX - BASKET_MAX), BASKET_MAX);

var basketCards = document.querySelector('.goods__cards');
basketCards.classList.remove('goods__cards--empty');

var cardEmpty = document.querySelector('.goods__card-empty');
cardEmpty.classList.add('visually-hidden');
var similarBasketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
// наполнение блока по шаблону

function renderCandyBasket(candy) {
  var basketElement = similarBasketTemplate.cloneNode(true);
  basketElement.querySelector('.card-order__title').textContent = candy.name;

  var candyImage = basketElement.querySelector('.card-order__img');
  candyImage.src = candy.picture;
  candyImage.alt = candy.name;
  basketElement.querySelector('.card-order__price').textContent = candy.price + '<span class="card__currency">₽</span>';
  return basketElement;
}

var fragmentBasket = document.createDocumentFragment();
var appendBasket = function () {

  for (var i = 0; i < basketGoods.length; i++) {
    fragmentBasket.appendChild(renderCandyBasket(basketGoods[i]));
  }

  basketCards.appendChild(fragmentBasket);
};
appendBasket();
