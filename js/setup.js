'use strict';

(function () {

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_QUANTITY = 4;

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var wizards = [];

  var getWizardName = function () {
    return WIZARD_NAMES[window.util.getRandom(WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[window.util.getRandom(WIZARD_SURNAMES.length - 1)];
  };

  var getWizards = function () {
    for (var i = 0; i < WIZARD_QUANTITY; i++) {

      wizards.push({
        name: getWizardName(),
        coatColor: window.WIZARD_COAT_COLOR[window.util.getRandom(window.WIZARD_COAT_COLOR.length - 1)],
        eyesColor: window.WIZARD_EYES_COLOR[window.util.getRandom(window.WIZARD_EYES_COLOR.length - 1)]
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

})();
