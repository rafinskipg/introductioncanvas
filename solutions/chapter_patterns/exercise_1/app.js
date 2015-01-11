/**
 * Exercise 1 solution
 */
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

function render(){
  context.rect(100, 100, 300, 300);
  context.strokeStyle = 'red';
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();
}

function fibonacci(size){
  var first = 0, second = 1,  next, count = 2, results = [first, second];
  while(count++ < size){
    next = first + second;
    first = second;
    second = next;
    results.push(next);
  }
  console.log(results);
}

fibonacci(15);