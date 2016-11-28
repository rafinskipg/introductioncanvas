function Piece(img, animationName, color){
  this.sprite = img;
  this.color = color;
  this.animationName = animationName;
  this.width = 50;
  this.x = 0;
  this.y = 0;
}

Piece.prototype.render = function(context){
  this.sprite.playAnimation(this.animationName);
  this.sprite.render(context, this.width  / 2, this.width  / 2, 50, 50);
}

//Pawn
function Pawn(img, animationName, color) {
  Piece.prototype.constructor.call(this, img, animationName, color);
}

//Inherit all the methods
Pawn.prototype = new Piece();


//Bishop
function Bishop(img, animationName, color) {
  Piece.prototype.constructor.call(this, img, animationName, color);
}

//Inherit all the methods
Bishop.prototype = new Piece();

//Knight
function Knight(img, animationName, color) {
  Piece.prototype.constructor.call(this, img, animationName, color);
}

//Inherit all the methods
Knight.prototype = new Piece();

//Rook
function Rook(img, animationName, color) {
  Piece.prototype.constructor.call(this, img, animationName, color);
}

//Inherit all the methods
Rook.prototype = new Piece();

//King
function King(img, animationName, color) {
  Piece.prototype.constructor.call(this, img, animationName, color);
}

//Inherit all the methods
King.prototype = new Piece();

//Queen
function Queen(img, animationName, color) {
  Piece.prototype.constructor.call(this, img, animationName, color);
}

//Inherit all the methods
Queen.prototype = new Piece();


