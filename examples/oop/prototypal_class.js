function Thing(){
  //Whatever
}

Thing.prototype.applyForce = function(force){
  this.force = force;
  console.log(this.force);
}

var bar = new Thing();

bar.applyForce(3);