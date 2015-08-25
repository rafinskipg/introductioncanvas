function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();
var foo = new Thing();

foo.applyForce = function(){
  console.log('OK');
}

foo.applyForce(3); //=> 'OK'
bar.applyForce(3); //=> 3

foo.constructor.prototype.applyForce = foo.applyForce;
bar.applyForce(3);