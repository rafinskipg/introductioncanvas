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

window.Utils = Utils;