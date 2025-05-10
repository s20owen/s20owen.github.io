class Circle {
  constructor(x, y, dx, dy, color, type = 'red', radius = 20) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.type = type;
    this.radius = radius;
    this.active = true;
  }

  update(canvas) {
    if (!this.active) return;
    this.x = (this.x + this.dx + canvas.width) % canvas.width;
    this.y = (this.y + this.dy + canvas.height) % canvas.height;
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (this.type === 'green') {
      ctx.beginPath();
      ctx.moveTo(this.x - 6, this.y - 6);
      ctx.lineTo(this.x + 6, this.y + 6);
      ctx.moveTo(this.x + 6, this.y - 6);
      ctx.lineTo(this.x - 6, this.y + 6);
      ctx.stroke();
    } else if (this.type === 'yellow') {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - 6);
      ctx.lineTo(this.x, this.y + 6);
      ctx.stroke();
    } else if (this.type === 'purple') {
      ctx.beginPath();
      ctx.moveTo(this.x - 6, this.y);
      ctx.lineTo(this.x + 6, this.y);
      ctx.moveTo(this.x, this.y - 6);
      ctx.lineTo(this.x, this.y + 6);
      ctx.stroke();
    }
  }

  hit() {
    this.active = false;
  }
}
