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
var ESC_CODE = 27;

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

// Массив корзины
var basketGoods = [];

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


// Корзина
var basketCards = document.querySelector('.goods__cards');

var basketCount = function () {
  var countObject = {
    count: 0,
    price: 0
  };
  for (var i = 0; i < basketGoods.length; i++) {
    countObject.count += basketGoods[i].count;
    countObject.price += basketGoods[i].price * basketGoods[i].count;
  }
  return countObject;
};

var basketHeaderTitle = function (num, expressions) {
  var result;
  var count = num % 100;
  if (count >= 5 && count <= 20) {
    result = expressions['2'];
  } else {
    count = count % 10;
    if (count === 1) {
      result = expressions['0'];
    } else if (count >= 2 && count <= 4) {
      result = expressions['1'];
    } else {
      result = expressions['2'];
    }
  }
  return result;
};

var changeMainBasketHeader = function () {
  var mainBasketHeaderElement = document.querySelector('.main-header__basket');

  var countObject = basketCount();

  if (countObject.count > 0) {
    mainBasketHeaderElement.innerHTML = 'В корзине ' + countObject.count + basketHeaderTitle(countObject.count, [' товар', ' товара', ' товаров']) + ' на сумму ' + countObject.price + ' ₽';
  } else {
    mainBasketHeaderElement.innerHTML = 'В корзине ничего нет';
  }
};

// ---

var order = document.querySelector('.order');
var inputs = order.querySelectorAll('input');
var buy = document.querySelector('.buy');
var formBuy = buy.querySelector('form');
var btnFormBuy = formBuy.querySelector('.buy__submit-btn');


var addDisabledForInput = function () {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = (basketGoods.length === 0);
  }
  btnFormBuy.disabled = (basketGoods.length === 0);
};

addDisabledForInput();

// ---

var renderBasket = function (candy, basketIndex) {
  var cardBasketElement = document.querySelector('#card-order').content.cloneNode(true);
  var index = null;

  for (var i = 0; i < candyGoods.length; i++) {
    if (candyGoods[i].name + '_' + candyGoods[i].amount === candy.id) {
      index = i;
      break;
    }
  }

  cardBasketElement.querySelector('.card-order__title').textContent = candyGoods[index].name;
  cardBasketElement.querySelector('.card-order__img').src = candyGoods[index].picture;
  cardBasketElement.querySelector('.card-order__price').textContent = candyGoods[index].price + ' ₽';
  cardBasketElement.querySelector('.card-order__count').value = candy.count;

  var closeButton = cardBasketElement.querySelector('.card-order__close');

  closeButton.addEventListener('click', function (evt) {
    // удалить элемент из массива basketGoods
    evt.preventDefault();
    basketGoods.splice(basketIndex, 1);

    renderBasketGoods();
    if (basketGoods.length === 0) {
      basketCards.innerHTML = '<div class="goods__card-empty"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
    }
  });

  // обработку кнопок +/-

  var increaseButton = cardBasketElement.querySelector('.card-order__btn--increase');
  var decreaseButton = cardBasketElement.querySelector('.card-order__btn--decrease');

  increaseButton.addEventListener('click', function (evt) {
    // увеличивает количество товаров в корзине
    evt.preventDefault();
    if (basketGoods[basketIndex].count < basketGoods[basketIndex].amount) {
      basketGoods[basketIndex].count += 1;
    }

    renderBasketGoods();
  });

  decreaseButton.addEventListener('click', function (evt) {
    // уменьшает количество товаров в корзине
    evt.preventDefault();
    basketGoods[basketIndex].count -= 1;
    if (basketGoods[basketIndex].count === 0) {
      basketGoods.splice(basketIndex, 1);
    }
    renderBasketGoods();
    if (basketGoods.length === 0) {
      basketCards.innerHTML = '<div class="goods__card-empty"><p><b>Странно, ты ещё ничего не добавил.</b></p><p>У нас столько всего вкусного и необычного, обязательно попробуй.</p></div>';
    }
  });

  basketCards.appendChild(cardBasketElement);
};

var renderBasketGoods = function () {
  basketCards.innerHTML = '';
  for (var i = 0; i < basketGoods.length; i++) {
    renderBasket(basketGoods[i], i);
  }
  changeMainBasketHeader();
  addDisabledForInput();
};

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
  cardPrice.childNodes[0].textContent = candy.price;
  cardPrice.querySelector('.card__currency').textContent = ' ₽';
  cardPrice.querySelector('.card__weight').textContent = '/ ' + candy.weight + 'Г';

  var starsRating = candyElement.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');

  starsRating.classList.add(getRandomAttribute(STARS_RATING));

  candyElement.querySelector('.star__count').textContent = candy.rating.number;

  candyElement.querySelector('.card__characteristic').textContent = candy.nutritionFacts.sugar ? 'Содержит сахар' : 'Без сахара';

  candyElement.querySelector('.card__composition-list').textContent = candy.nutritionFacts.contents;

  var compositionButton = candyElement.querySelector('.card__btn-composition');
  var composition = candyElement.querySelector('.card__composition');

  // Показывает и скрывает состав
  compositionButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    composition.classList.toggle('card__composition--hidden');
  });

  var favoriteBtn = candyElement.querySelector('.card__btn-favorite');

  favoriteBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('card__btn-favorite--selected');
    favoriteBtn.blur();
  });

  var addButton = candyElement.querySelector('.card__btn');

  addButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    var candyId = candy.name + '_' + candy.amount;
    var inBasket = false;

    for (var i = 0; i < basketGoods.length; i++) {
      if (basketGoods[i].id === candyId) {
        inBasket = true;
        break;
      }
    }

    if (!inBasket) {
      basketGoods.push({id: candyId, amount: candy.amount, count: 1, price: candy.price});
    } else {
      if (basketGoods[i].count < basketGoods[i].amount) {
        basketGoods[i].count += 1;
      } else {
        candyElement.classList.remove('card--in-stock');
        candyElement.classList.add('card--soon');
      }
    }
    renderBasketGoods();
  });

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


// ---- task 2 module 4

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
  paymentCash.classList.toggle('visually-hidden', btnCard.checked);
  paymentCard.classList.toggle('visually-hidden', btnCash.checked);
  addDisabledForInputPayment();
};


var inputsPayment = paymentInputs.querySelectorAll('input');

// Добавляет и убирает атрибут disabled на инпуты
var addDisabledForInputPayment = function () {
  for (var i = 0; i < inputsPayment.length; i++) {
    inputsPayment[i].disabled = btnCash.checked;
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
  courier.classList.toggle('visually-hidden', btnStore.checked);
  store.classList.toggle('visually-hidden', btnCourier.checked);
  addDisabledForFieldsetDelivery();
};

// Добавляет и убирает атрибут disabled на инпуты в блоке доставки
var addDisabledForFieldsetDelivery = function () {
  fieldsetCourier.disabled = !btnCourier.checked;
  fieldsetStore.disabled = btnCourier.checked;
};

addDisabledForFieldsetDelivery();

var modalSuccess = document.querySelector('.modal--success');
var modalError = document.querySelector('.modal--error');

// Показывает модальное окно
var showModal = function (target) {
  target.classList.remove('modal--hidden');
};

var btnModalSuccess = modalSuccess.querySelector('.modal__close');

// Закрывает моадльное окно
btnModalSuccess.addEventListener('click', function () {
  modalSuccess.classList.add('modal--hidden');
});
// Закрывает моадльное окно кнопкой ESC
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_CODE) {
    modalError.classList.add('modal--hidden');
    modalSuccess.classList.add('modal--hidden');
  }
});

var btnModalError = modalError.querySelector('.modal__close');
// Закрывает моадльное окно
btnModalError.addEventListener('click', function () {
  modalError.classList.add('modal--hidden');
});

// Проверка формы на валидность и вывод сообщений
var checkFormValidity = function () {
  var error = checkContactDataError() || checkDeliveryError() || checkCreditCardError();
  if (error) {
    showModal(modalError);
  } else {
    showModal(modalSuccess);
  }
};

var contactDataInner = document.querySelector('.contact-data__inner');
var contactDataName = contactDataInner.querySelector('#contact-data__name');
var contactDataTel = contactDataInner.querySelector('#contact-data__tel');
var contactDataEmail = contactDataInner.querySelector('#contact-data__email');

// Проверка Контактных данных
var checkContactDataError = function () {
  return !(contactDataName.checkValidity() && contactDataTel.checkValidity() && contactDataEmail.checkValidity());
};

// Проверка данных по доставке
var deliverStreet = fieldsetCourier.querySelector('#deliver__street');
var deliverHouse = fieldsetCourier.querySelector('#deliver__house');
var deliverRoom = fieldsetCourier.querySelector('#deliver__room');

var checkDeliveryError = function () {
  return !(deliverStreet.checkValidity() && deliverHouse.checkValidity() && deliverRoom.checkValidity());
};
// Проверка кредитной карты
var paymentInputsBlock = document.querySelector('.payment__inputs');
var inputCardNumber = paymentInputsBlock.querySelector('#payment__card-number');
var inputCardDate = paymentInputsBlock.querySelector('#payment__card-date');
var inputCardCVC = paymentInputsBlock.querySelector('#payment__card-cvc');
var inputCardholder = paymentInputsBlock.querySelector('#payment__cardholder');
var paymentCardStatus = paymentInputsBlock.querySelector('.payment__card-status');

var checkCreditCardError = function () {
  return !(checkValidСreditСard(inputCardNumber.value) && inputCardDate.checkValidity()
  && inputCardCVC.checkValidity() && inputCardholder.checkValidity());
};

// Смена статуса карты
paymentInputsBlock.addEventListener('change', function () {
  if (!checkValidСreditСard(inputCardNumber.value) || !inputCardDate.checkValidity()
  || !inputCardCVC.checkValidity() || !inputCardholder.checkValidity()) {
    paymentCardStatus.textContent = 'НЕ ОПРЕДЕЛЁН';
  } else {
    paymentCardStatus.textContent = 'Одобрен';
  }
});

// Алгоритм Луна
var checkValidСreditСard = function (value) {
  if (/[^0-9-\s]+/.test(value)) {
    return false;
  }
  var nCheck = 0;
  var nDigit = 0;
  var bEven = false;
  value = value.replace(/\D/g, '');

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n);
    nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) {
        nDigit -= 9;
      }
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  return (nCheck % 10) === 0;
};

// Обрабочник проверки формы на валидность
btnFormBuy.addEventListener('click', function (evt) {
  if (!checkValidСreditСard(inputCardNumber.value)) {
    inputCardNumber.setCustomValidity('Проверьте правильность введённых данных');
    showModal(modalError);
  } else {
    inputCardNumber.setCustomValidity('');
    checkFormValidity();
    evt.preventDefault();
  }
});
