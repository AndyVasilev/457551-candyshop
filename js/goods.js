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

// Массив товаров
var candyGoods = [];

// Заполнение массива товаров случайными данными
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


var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');

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
  // var cardCurrency = cardPrice.childNodes[0].innerHTML = '<span class="card__currency">₽</span>';
  cardPrice.childNodes[0].textContent = candy.price;
  cardPrice.querySelector('.card__currency').textContent = ' ₽';
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

  catalogCards.appendChild(fragment);
};
appendCandy();

// Показывает и скрывает состав
catalogCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var cardMain = evt.target.closest('.card__main');
  var target = evt.target.closest('.card__btn-composition');
  var composition = cardMain.querySelector('.card__composition');
  if (!target) {
    return;
  }
  composition.classList.toggle('card__composition--hidden');
});

// Корзина
var basketCards = document.querySelector('.goods__cards');
var cardEmpty = document.querySelector('.goods__card-empty');

// Выводит и убирает сообщение о наличии товара в корзине
var alertMessage = function () {
  var article = document.querySelector('.goods_card');
  basketCards.classList.toggle('goods__cards--empty', article === null);
  cardEmpty.classList.toggle('visually-hidden', article !== null);
};

var addButtons = document.querySelectorAll('.card__btn');
var cardsOnCatalog = catalogCards.querySelectorAll('.catalog__card');

var createAddToBasketHandler = function (i) {
  return function (evt) {
    addToBasket(cardsOnCatalog[i], i);
    evt.preventDefault();
    alertMessage();
  };
};

// Добавляет товары в корзину при клике на кнопку добавить
var addBasketAdditionHandlers = function () {
  for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', createAddToBasketHandler(i));
  }
};

addBasketAdditionHandlers();

var changeMainBasketHeader = function () {
  var mainBasketHeaderElement = document.querySelector('.main-header__basket');
  for (var i = 0; i < cardsOnCatalog.length; i++) {

    // cardsOnCatalog[i].setAttribute('data-id', i + 1);
    mainBasketHeaderElement.textContent = 'В корзине ' + candyGoods[i].price + ' товаров на сумму ' + 100 + ' ₽';
  }
};

// if () {
//   mainBasketHeaderElement.textContent = 'В корзине ' + 1 + ' товаров на сумму ' + 100 + ' ₽';
// } else {
//   mainBasketHeaderElement.textContent = 'В корзине ничего нет';
// }

changeMainBasketHeader();

// Удаляет товары из корзины
basketCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__close');
  if (target === null) {
    return;
  }
  var targetCard = evt.target.closest('.card-order');
  basketCards.removeChild(targetCard);
  alertMessage();
});

// Увеличивает значение
var increaseValue = function (value) {
  value.value++;
};

// Увеличивает кол-во товаров в корзине
basketCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--increase');
  var card = evt.target.closest('.card-order__amount');
  var value = card.querySelector('.card-order__count');
  if (target === null) {
    return;
  }
  increaseValue(value);
});

// Уменьшает кол-во товаров в корзине
basketCards.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target.closest('.card-order__btn--decrease');
  var card = evt.target.closest('.card-order__amount');
  var value = card.querySelector('.card-order__count');
  if (target === null) {
    return;
  } else if (value.value > 1) {
    value.value--;
  } else {
    var targetCard = evt.target.closest('.card-order');
    basketCards.removeChild(targetCard);
    alertMessage();
  }
});

// Добавляет дата атрибуты
var addDataAtribute = function () {
  for (var i = 0; i < cardsOnCatalog.length; i++) {
    cardsOnCatalog[i].setAttribute('data-id', i + 1);
  }
};
addDataAtribute();


var addToBasket = function (target, i) {
  var dataAttribute = basketCards.querySelector('[data-id="' + target.dataset.id + '"]');
  if (dataAttribute === null) {
    var cardsBasket = candyGoods[i];
    // var mainBasketHeaderElement = document.querySelector('.main-header__basket');
    // mainBasketHeaderElement.textContent = 'В корзине ' + 1 + ' товаров на сумму ' + cardsBasket.price + ' ₽';
    var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
    cardBasketElement.querySelector('.card-order__title').textContent = cardsBasket.name;
    cardBasketElement.querySelector('.card-order__img').src = cardsBasket.picture;
    cardBasketElement.querySelector('.card-order__price').textContent = cardsBasket.price + ' ₽';
    cardBasketElement.querySelector('.card-order__count').setAttribute('value', 1);
    cardBasketElement.querySelector('.goods_card').setAttribute('data-id', i + 1);
    basketCards.appendChild(cardBasketElement);
  } else {
    // mainBasketHeaderElement.textContent = 'В корзине ничего нет';
    var value = dataAttribute.querySelector('.card-order__count');
    increaseValue(value);
  }
};


// Добавление в Избранное
var favoriteBtn = document.querySelectorAll('.card__btn-favorite');

var btnFavoriteHandler = function (evt) {
  evt.preventDefault();
  evt.target.classList.toggle('card__btn-favorite--selected');
  document.activeElement.blur();
};

for (var j = 0; j < favoriteBtn.length; j++) {
  favoriteBtn[j].addEventListener('click', btnFavoriteHandler);
}

// Показывает и скрывает форму оплаты

var payment = document.querySelector('.payment');
var paymentCard = payment.querySelector('.payment__card-wrap');
var paymentCash = payment.querySelector('.payment__cash-wrap');
var btnCard = payment.querySelector('input#payment__card');
var btnCash = payment.querySelector('input#payment__cash');
var paymentInputs = payment.querySelector('.payment__inputs');


btnCash.addEventListener('click', function () {
  addClassForPayment();
});

btnCard.addEventListener('click', function () {
  addClassForPayment();
});

var addClassForPayment = function () {
  paymentCash.classList.toggle('visually-hidden', btnCard.checked === true);
  paymentCard.classList.toggle('visually-hidden', btnCash.checked === true);
  addDisabledForInputPayment();
};


var inputsPayment = paymentInputs.querySelectorAll('input');

// Добавляет и убирает атрибут disabled на инпуты
var addDisabledForInputPayment = function () {
  for (var i = 0; i < inputsPayment.length; i++) {
    inputsPayment[i].disabled = btnCash.checked === true;
  }
};

// Переключает вкладки в блоке доставки

var delivery = document.querySelector('.deliver');
var store = delivery.querySelector('.deliver__store');
var courier = delivery.querySelector('.deliver__courier');
var btnStore = delivery.querySelector('input#deliver__store');
var btnCourier = delivery.querySelector('input#deliver__courier');
var fieldsetStore = store.querySelector('.deliver__stores');
var fieldsetCourier = courier.querySelector('.deliver__entry-fields-wrap');


btnStore.addEventListener('click', function () {
  addClassForDelivery();
});

btnCourier.addEventListener('click', function () {
  addClassForDelivery();
});

var addClassForDelivery = function () {
  courier.classList.toggle('visually-hidden', btnStore.checked === true);
  store.classList.toggle('visually-hidden', btnCourier.checked === true);
  addDisabledForFieldsetDelivery();
};

// Добавляет и убирает атрибут disabled на инпуты в блоке доставки
var addDisabledForFieldsetDelivery = function () {
  fieldsetCourier.disabled = btnCourier.checked === false;
  fieldsetStore.disabled = btnCourier.checked === true;
};

addDisabledForFieldsetDelivery();
