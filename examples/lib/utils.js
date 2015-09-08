/**
  Utils you will use so maany times
**/
var Utils = {};

Utils.radianToDegree = function(radians) {
  return radians * (180 / Math.PI)
}

Utils.degreeToRadian = function(degree) {
  return degree / (180 / Math.PI);
}

//Returns a random Integer between min and max
Utils.randomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Returns a random Float between min and max
Utils.randomFloat = function(min, max) {
  return Math.random() * (max - min) + min;
}

Utils.limit = function(value, min, max){
  if(value < min){
    return min;
  }else if(value > max){
    return max;
  }else{
    return value;
  }
};

//Calculates the bounce angle between a particle with a incidenceAngle and a wall with angleDest
Utils.calculateBounceAngle = function(incidenceAngle, angleDest) {
  reflectionAngle = 2 * angleDest - incidenceAngle;
  return reflectionAngle;
}

//Returns a fibonacci serie
Utils.fibonacci = function(size) {
  var first = 0,
    second = 1,
    next, count = 2,
    results = [first, second];

  while (count++ < size) {
    next = first + second;
    first = second;
    second = next;
    results.push(next);
  }

  return results;
}

Utils.isOdd = function(number) {
  return number % 2 === 0;
}

Utils.isEven = function(number) {
  return Utils.isOdd(number + 1);
}

//Returns true or false randomly, you can force the probability.
//The bigger the times number, the less probable to happen
Utils.flipCoin = function(times) {
  times = times ? times : 2;
  return Math.floor(Math.random() * times) == 1;
}

//Returns the mouse coords relative to the canvas
Utils.getMouseCoords = function(canvas, e) {
  var canvasPosition, mouse;

  canvasPosition = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  }

  mouse = {
    x: e.pageX - canvasPosition.x,
    y: e.pageY - canvasPosition.y
  }

  return mouse;
}

//Returns a random UID
Utils.uid = function(times) {
  times = times ? times : 8;
  var _uid = '';

  for (var i = 0; i < times; i++) {
    _uid += Math.random().toString(36).substr(2, 5);

    if (i !== times - 1) {
      _uid += '-'
    }
  }

  return _uid;
}

Utils.randomColor = function() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Utils.randomInteger(0, letters.length - 1)]
  }
  return color;
};

Utils.arraymove = function(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
};

Utils.integerToColor = function(num) {
  num >>>= 0;

  var b = num & 0xFF,
    g = (num & 0xFF00) >>> 8,
    r = (num & 0xFF0000) >>> 16;
  return "rgb(" + [r, g, b].join(",") + ")";
}
window.Utils = Utils;