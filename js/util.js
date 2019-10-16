'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

  window.WIZARD_COAT_COLOR = WIZARD_COAT_COLOR;
  window.WIZARD_EYES_COLOR = WIZARD_EYES_COLOR;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandom: function (max) {
      return Math.round(Math.random() * max);
    },
    colorize: function (element, arrayColors) {
      element.addEventListener('click', function () {
        var color = arrayColors[window.util.getRandom(arrayColors.length - 1)];

        if (element.tagName.toLowerCase() === 'div') {
          element.style.backgroundColor = color;
        } else {
          element.style.fill = color;
        }
      });
    }
  };
})();
