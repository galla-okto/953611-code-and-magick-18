'use strict';

(function () {

  var MIN_LENGTH_NAME = 2;

  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var setupWizard = setup.querySelector('.setup-wizard');
  var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
  var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireBallWrap = setup.querySelector('.setup-fireball-wrap');
  var dialogHandler = setup.querySelector('.upload');

  var userNameInput = setup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);

    window.util.colorize(setupWizardCoat, window.WIZARD_COAT_COLOR);
    window.util.colorize(setupWizardEyes, window.WIZARD_EYES_COLOR);
    window.util.colorize(setupFireBallWrap, WIZARD_FIREBALL_COLOR);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);

    setupWizardCoat.removeEventListener('click', window.util.colorize);
    setupWizardEyes.removeEventListener('click', window.util.colorize);
    setupFireBallWrap.removeEventListener('click', window.util.colorize);
  };

  var openAndClosePopup = function (evt) {
    if (evt.target.className === 'setup-open-icon') {
      openPopup();
    } else if (evt.target.className === 'setup-close') {
      closePopup();
    }
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
    if (target.value.length < MIN_LENGTH_NAME) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  setupOpen.addEventListener('click', openAndClosePopup);

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openAndClosePopup);
  });

  setupClose.addEventListener('click', openAndClosePopup);

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openAndClosePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
          evt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
