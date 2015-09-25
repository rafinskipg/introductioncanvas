function NitroBox(options) {
  this.x = options.x;
  this.y = options.y;
  this.width = 100;
  this.height = 50;
  this.nitro = options.nitro;
  this.nitroCapacity = options.nitroCapacity;
  this.hasChanged = true;
}

NitroBox.prototype.takeNitro = function(amount) {
  var newNitro = Utils.limit(this.nitro - amount, 0, this.nitroCapacity);
  var obtained = this.nitro - newNitro;
  this.nitro = newNitro;
  if (obtained !== 0) {
    this.hasChanged = true;
  }
  return obtained;
}

NitroBox.prototype.render = function(context) {
  if (this.hasChanged) {
    //Nitro bar
    var nitroPercentage = this.nitro / this.nitroCapacity;
    var nitroBarFilledWidth = Math.round(this.width * nitroPercentage);

    context.lineWidth = 5;
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, nitroBarFilledWidth, this.height);
    context.fillStyle = 'green';
    context.fillRect(this.x, this.y, nitroBarFilledWidth, this.height);
    context.stroke();
  }

  this.hasChanged = false;
}

NitroBox.prototype.clear = function(context, canvas) {
  if (this.hasChanged) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }
}

NitroBox.prototype.checkLimits = function(maxWidth) {
  if (this.x > maxWidth + 100) {
    this.x = -90;
  } else if (this.x < -100) {
    this.x = maxWidth + 90;
  }
}