var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle   = '#000';
context.lineWidth   = 1;
 
function Carpet(order, canvas){
  this.order = order;


  //nivel inicial de renderizado
  var firstOrder = {
    width : Math.min(canvas.width, canvas.height),
    distance : 0,
    points : 0
  }
  
  //Array de ordenes o niveles de renderizado
  this.orders = [];
  this.orders.push(firstOrder);

  /*
    Precargamos los niveles siguiendo que:
    Cada nivel tiene ^3 veces puntos que el anterior
    Cada nivel tiene cuadrados 3 veces más pequeños que el anterior
  */
  for(var i = 1; i <= this.order; i++){
    var width = this.orders[i-1].width / 3;

    this.orders.push({
      width : width,
      distance : width * 3,
      points : Math.pow(3, i - 1)
    })
  }

}

Carpet.prototype.render = function(context, canvas){

  
  context.save();
  for(var i = this.orders.length - 1; i >= 0; i--){
    
    var width = this.orders[i].width;
    var origX = width;
    var origY = width;

    for( var j = 0; j < this.orders[i].points; j++){
      origX = width;

      for(h=0; h<this.orders[i].points; h++){
        context.fillRect(origX ,origY,width,width);
        origX += this.orders[i].distance;
      }

      origY += this.orders[i].distance;
    }

  }
  context.restore();

}

function render(){
  //Limit of iterations
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var order = 5;
  //Initialize carpet
  var carpet = new Carpet(order, canvas);
  carpet.render(context, canvas);
}

render();
//http://andrew-hoyer.com/experiments/fractals/