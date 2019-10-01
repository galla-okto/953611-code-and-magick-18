'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARD_QUANTITY = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var getRandom = function (max) {
  return Math.round(Math.random() * max);
};

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizard = setup.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireBallWrap = setup.querySelector('.setup-fireball-wrap');

var coatColor = document.querySelector('div.setup-wizard-appearance input[name=coat-color]');
var eyesColor = document.querySelector('div.setup-wizard-appearance input[name=eyes-color]');
var fireballColor = document.querySelector('div.setup-fireball-wrap input[name=fireball-color]');

var getWizardName = function () {
  return WIZARD_NAMES[getRandom(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length - 1)];
};

var getWizards = function () {
  for (var i = 0; i < WIZARD_QUANTITY; i++) {

    wizards.push({
      name: getWizardName(),
      coatColor: WIZARD_COAT_COLOR[getRandom(WIZARD_COAT_COLOR.length - 1)],
      eyesColor: WIZARD_EYES_COLOR[getRandom(WIZARD_EYES_COLOR.length - 1)]
    });
  }
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var showWizard = function () {
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (element) {
    fragment.appendChild(renderWizard(element));
  });

  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
};

var onPopupEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) && (evt.target.className !== 'setup-user-name')) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var changeColor = function (element, arrayColor) {
  var color = arrayColor[getRandom(arrayColor.length - 1)];

  if (element.classList.contains('wizard-coat')) {
    element.style.fill = color;
    coatColor.value = color;
  } else {
    element.style.fill = color;
    eyesColor.value = color;
  }
};

var changeBackground = function (element, arrayColor) {
  var color = arrayColor[getRandom(arrayColor.length - 1)];
  element.style.background = color;
  fireballColor.value = color;
};

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

getWizards();

userDialog.classList.remove('hidden');

showWizard();

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  };
});

setupWizardCoat.addEventListener('click', function () {
  changeColor(setupWizardCoat, WIZARD_COAT_COLOR);
});

setupWizardEyes.addEventListener('click', function () {
  changeColor(setupWizardEyes, WIZARD_EYES_COLOR);
});

setupFireBallWrap.addEventListener('click', function () {
  changeBackground(setupFireBallWrap, WIZARD_FIREBALL_COLOR);
});
