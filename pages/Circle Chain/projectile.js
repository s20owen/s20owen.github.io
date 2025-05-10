class Projectile {
  constructor(x, y, angle, color = 'red', speed = 3, lifetime = 100) {
    this.x = x;
    this.y = y;
    this.dx = Math.cos(angle) * speed;
    this.dy = Math.sin(angle) * speed;
    this.color = color;
    this.lifetime = lifetime;
    this.radius = 5;
    this.active = true;
  }

  update() {
    if (!this.active) return;
    this.x += this.dx;
    this.y += this.dy;
    this.lifetime--;
    if (this.lifetime <= 0) this.active = false;
  }

  draw(ctx) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  checkCollision(circle) {
    const dx = this.x - circle.x;
    const dy = this.y - circle.y;
    return Math.sqrt(dx * dx + dy * dy) < circle.radius;
  }
}
