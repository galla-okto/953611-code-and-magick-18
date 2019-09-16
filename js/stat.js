'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_BORDER = 50;
var GAP = 10;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x + 0.1 * CLOUD_WIDTH, y);
  ctx.lineTo(x + 0.9 * CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + 0.9 * CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + 0.1 * CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x, y + CLOUD_HEIGHT / 2);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var heightTitle = (GAP + FONT_GAP) * 2;

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_BORDER, CLOUD_Y + heightTitle / 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_BORDER, CLOUD_Y + heightTitle);

  var maxTime = getMaxElement(times);

  var playerName = 'Вы';

  for (var i = 0; i < names.length; i++) {
    if (names[i] === playerName) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    else {
      ctx.fillStyle = 'hsl(250,' + this.Math.random() * 100 + '%, 50%)';
    }

    var heightCurrentColumn = BAR_HEIGHT * Math.round(times[i]) / maxTime;

    ctx.fillRect(CLOUD_X + GAP_BORDER + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + heightTitle + GAP + BAR_HEIGHT - heightCurrentColumn, BAR_WIDTH, heightCurrentColumn);
    ctx.fillText(names[i], CLOUD_X + GAP_BORDER + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + heightTitle + GAP + BAR_HEIGHT + GAP + FONT_GAP);
  }

};
