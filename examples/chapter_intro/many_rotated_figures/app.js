/**
 * Many rotated figures
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const totalFigures = 50
const availableAngles = [5, 10, 30, 45, 80, 90, 180, 270, 350]


const figures = []

function drawSquare(x, y, size, angleOfRotation) {
  // Guarda el estado actual en la pila
  context.save()

  // Obtenemos los radianes de un ángulo
  const radians = Utils.degreeToRadian(angleOfRotation);

  // Movemos el origen de coordenadas
  context.translate(x, y);

  // Rotamos el contexto esos radianes
  context.rotate(radians);
  
  // Pintamos el cuadrado
  context.beginPath();
  context.rect(-Math.round(size/2), -Math.round(size/2), size, size);
  context.stroke();

  // Ponemos el texto con los grados rotados (en 0, 0 porque hemos usado translate anteriormente)
  context.fillText(angleOfRotation, 0 , 0 );

  // Volvemos al estado del dibujo anterior
  context.restore()
}

function createFigures() {
  for(var i = 0; i<totalFigures; i++) {
    figures.push({
      x: Utils.randomInteger(0, 560),
      y: Utils.randomInteger(0, 560),
      size: Utils.randomInteger(20, 100),
      angle: Utils.randomFromArray(availableAngles)
    })
  }
}


function render() {
  createFigures()

  figures.map(square => {
    drawSquare(square.x, square.y, square.size, square.angle)
  })
}

render();