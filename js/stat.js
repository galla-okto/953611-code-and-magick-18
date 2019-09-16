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
var COEFICIENT_FIGURE = 0.1;
var COLOR_YOU = 'rgba(255, 0, 0, 1)';
var PLAYER_NAME = 'Вы';
var COLOR_TABLE = '#000';
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.moveTo(x + COEFICIENT_FIGURE * CLOUD_WIDTH, y);
  ctx.lineTo(x + (1 - COEFICIENT_FIGURE) * CLOUD_WIDTH, y);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT / 2);
  ctx.lineTo(x + (1 - COEFICIENT_FIGURE) * CLOUD_WIDTH, y + CLOUD_HEIGHT);
  ctx.lineTo(x + COEFICIENT_FIGURE * CLOUD_WIDTH, y + CLOUD_HEIGHT);
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

var getColorRandom = function (color) {
  return 'hsl(' + color + ',' + Math.random() * 100 + '%, 50%)';
};

var getTitle = function (ctx, heightTitle) {
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP_BORDER, CLOUD_Y + heightTitle / 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP_BORDER, CLOUD_Y + heightTitle);
};

var getBar = function (name, ctx, times, i, heightTitle) {
  var maxTime = getMaxElement(times);

  var heightCurrentColumn = BAR_HEIGHT * Math.round(times[i]) / maxTime;

  var barX = CLOUD_X + GAP_BORDER + (BAR_WIDTH + BAR_GAP) * i;
  var barY = CLOUD_Y + heightTitle + GAP + BAR_HEIGHT;

  ctx.fillRect(barX, barY - heightCurrentColumn, BAR_WIDTH, heightCurrentColumn);

  ctx.fillText(name, barX, barY + GAP + FONT_GAP);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLOR_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = COLOR_TABLE;

  var heightTitle = (GAP + FONT_GAP) * 2;

  getTitle(ctx, heightTitle);

  names.forEach(function (element, i) {
    ctx.fillStyle = (element === PLAYER_NAME) ? COLOR_YOU : getColorRandom(250);

    getBar(element, ctx, times, i, heightTitle);
  });
};
