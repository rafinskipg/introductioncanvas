var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var escapeRadius = 10.0;
var interiorColor = [0, 0, 0, 255];

// Some constants used with smoothColor
var logBase = 1.0 / Math.log(2.0);
var logHalfBase = Math.log(0.5)*logBase;

function smoothColor(steps, n, Tr, Ti)
{
  /*
   * Original smoothing equation is
   *
   * var v = 1 + n - Math.log(Math.log(Math.sqrt(Zr*Zr+Zi*Zi)))/Math.log(2.0);
   *
   * but can be simplified using some elementary logarithm rules to
   */
  return 5 + n - logHalfBase - Math.log(Math.log(Tr+Ti))*logBase;
}


function pickColorGrayscale(steps, n, Tr, Ti)
{
  if ( n == steps ) // converged?s
    return interiorColor;

  var v = smoothColor(steps, n, Tr, Ti);
  v = Math.floor(512.0*v/steps);
  if ( v > 255 ) v = 255;
  return [v, v, v, 255];
}
function Mandeliter( cx, cy, maxiter ){
  var
    x = 0.0,
    y = 0.0,
    xx = 0,
    yy = 0,
    xy = 0;
 
  var i = maxiter;
  while( i-- && xx + yy <= 4 ){
    xy = x * y;
    xx = x * x;
    yy = y * y;
    x = xx - yy + cx;
    y = xy + xy + cy;
  }
  return maxiter - i;
}

function Mandelbrot(width, height, iterations){
  
  function calculatePoint(cx,cy, posx, posy, maxiter){
    var numberOfIterations, distance;

    /*for(var i = 0; i < iterations && distance <= escapeRadius; i++){
      c1 = Math.pow(2,(x + i * y)) + (x + i * y);

    }*/
    var
    x = 0.0,
    y = 0.0,
    xx = 0,
    yy = 0,
    xy = 0;
 
  var i = maxiter;
  while( i-- && xx + yy <= 4 ){
    xy = x * y;
    xx = x * x;
    yy = y * y;
    x = xx - yy + cx;
    y = xy + xy + cy;
  }
   var c = 3 * Math.log(maxiter-1)/Math.log(iterations - 1.0);
   var color;
   if(maxiter-1 === iterations){
    color = 'black';
   }else{
    if (c < 1)
        {
          color = 'rgb(' + 255*c +',0,0)'
         
        }
        else if( c < 2 )
        {
          color = 'rgb(255,' + 255*(c-1) +',0)'
         
        }
        else
        {
          color = 'rgb(255, 255,' + 255*(c-2)+')'
        }
   }

    return {
      x : posx,
      y : posy,
      color :color
    }
  }

  this.points = [];
  var xmin = -2;
  var xmax = 1;
  var ymin = -1;
  var ymax = 1;

  for(var i = 0; i < width; i++){
    for(var j= 0; j < height; j++){
      var x = xmin + (xmax - xmin) * i / (width - 1);
      var y = ymin + (ymax - ymin) * j / (height - 1);
      var num = Mandeliter( x, y, iterations );
      
      var color;
      if( num === iterations )
      {
        color = 'black'
      }
      else
      {
        var c = 3 * Math.log(num)/Math.log(iterations - 1.0);
        if (c < 1)
        {
          color = 'rgb(' + 255*c +',0,0)'
         
        }
        else if( c < 2 )
        {
          color = 'rgb(255,' + 255*(c-1) +',0)'
         
        }
        else
        {
          color = 'rgb(255, 255,' + 255*(c-2)+')'
        }
      }
      this.points.push({
        x: i,
        y : j,
        color: color
      })
    }
  }
}

Mandelbrot.prototype.render = function(context, canvas){

  context.save();
 
  //Start point
  this.points.forEach(function(point){
    context.fillStyle = point.color;
    context.fillRect(point.x, point.y, 1 ,1);
  })

  context.restore();

}

function render(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  //Limit of iterations
  var iterations = 15 ;
  
  var mandelbrot = new Mandelbrot(canvas.width, canvas.height, iterations);
  mandelbrot.render(context, canvas);

}

render();
//