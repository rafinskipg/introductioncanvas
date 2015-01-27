/**
  Utils
**/
var Utils = {};

Utils.radianToDegree  = function(radians){
  return radians * (180/Math.PI)
}

Utils.degreeToRadian = function(degree){
  return degree/(180/Math.PI);
}

Utils.randomInteger = function(min, max){
  return Math.floor(Math.random()*max)+min;
}

Utils.calculateBounceAngle = function(incidenceAngle, angleDest){
  reflectionAngle = 2 * angleDest - incidenceAngle;
  return reflectionAngle;
}

Utils.fibonacci = function(size){
  var first = 0, second = 1,  next, count = 2, results = [first, second];
  
  while(count++ < size){
    next = first + second;
    first = second;
    second = next;
    results.push(next);
  }

  return results;
}

Utils.isOdd = function(number){
  return number % 2 === 0;
}

Utils.isEven = function(number){
  return Utils.isOdd(number + 1);
}

Utils.flipCoin = function(probability){
  probability = probability ? probability : 2;
  return Math.floor( Math.random() * probability ) == 1;
}

window.Utils = Utils;