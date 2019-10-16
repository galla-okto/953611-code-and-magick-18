'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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
      })
    }
  };
})();
