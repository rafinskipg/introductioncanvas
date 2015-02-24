function Sprite(img){
  this.img = img;
  this.animations = {};
}

Sprite.prototype.addAnimation = function (name, frames, size, duration, pos, direction){
  pos = pos ? pos : [0,0];
  direction = direction ? direction : 'horizontal';

  this.animations[name] = {
    frames: frames,
    frameTime: duration/1000/frames.length,
    size: size,
    direction: direction,
    pos: pos,
    frameIndex : 0,
    frameDt : 0
  }
}

Sprite.prototype.playAnimation = function (name, reset){
  this.currentAnimation = name;
  if(reset){
    this.animations[name].frameIndex = 0;
    this.animations[name].frameDt = 0;
  }
}

Sprite.prototype.update = function(dt){
  var currentAnimation = this.animations[this.currentAnimation];
  if(currentAnimation){
    currentAnimation.frameDt += dt;
    if(currentAnimation.frameDt >= currentAnimation.frameTime){
      currentAnimation.frameDt = 0;
      currentAnimation.frameIndex = currentAnimation.frameIndex < (currentAnimation.frames.length - 1) ? currentAnimation.frameIndex + 1 : 0;
    }
  }
}

Sprite.prototype.render = function(ctx, x, y, resizeX, resizeY, angle){
  var currentAnimation = this.animations[this.currentAnimation];
  if(currentAnimation){
    var width = resizeX ? resizeX : currentAnimation.size[0];
    var height = resizeY ? resizeY : currentAnimation.size[1];
    
    ctx.save();
    ctx.translate(x,y);

    if(angle){   
      ctx.rotate(angle * Math.PI / 180);
    }

    ctx.drawImage(
      this.img,
      currentAnimation.pos[0] + (currentAnimation.size[0] * currentAnimation.frames[currentAnimation.frameIndex]),
      currentAnimation.pos[1],
      currentAnimation.size[0],
      currentAnimation.size[1],
      - width/2, -height/2,
      width,
      height
    );

    if(angle){
      ctx.translate(-width/2, -height/2) ; 
    }
    
    ctx.restore();
  }
  
}

module.exports = Sprite;