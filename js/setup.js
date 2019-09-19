'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_QUANTITY = 4;

var getRandom = function (max) {
  return Math.round(Math.random() * max);
};

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];

var getWizardName = function () {
  return WIZARD_NAMES[getRandom(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length - 1)];
}

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

getWizards();

userDialog.classList.remove('hidden');

showWizard();
