// Preloaded sounds using Howler.js
const sounds = {
    coin: new Howl({
        src: ['coin.mp3'],
        preload: true
    })
};

class Game {
    constructor(canvas, levelDataList, levelIndex) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.levelDataList = levelDataList;
        this.levelIndex = levelIndex;
        this.levelData = levelDataList[levelIndex];

        const unlocked = parseInt(localStorage.getItem('unlockedLevel') || 1);
        if (levelIndex >= unlocked) {
            localStorage.setItem('unlockedLevel', levelIndex + 1);
        }

        this.lastFrameTime = performance.now();
        this.fps = 0;

        this.resetLevel();
        canvas.addEventListener('click', (e) => this.handleClick(e));
    }

    resetLevel() {
        this.redCircles = [];
        this.blueCircles = [];
        this.winConditionPending = false;
        this.lossTriggered = false;
        this.projectiles = [];
        this.score = 0;
        this.running = true;

        const addCircles = (count, color, type) => {
            for (let i = 0; i < count; i++) {
                this.redCircles.push(new Circle(
                    Math.random() * this.canvas.width,
                    Math.random() * this.canvas.height,
                    Math.random() * 4 - 2,
                    Math.random() * 4 - 2,
                    color,
                    type
                ));
            }
        };

        addCircles(this.levelData.redCount, 'red', 'red');
        addCircles(this.levelData.greenCount, 'green', 'green');
        addCircles(this.levelData.yellowCount, 'gold', 'yellow');
        addCircles(this.levelData.purpleCount, 'purple', 'purple');

        for (let i = 0; i < this.levelData.blueCount; i++) {
            this.blueCircles.push(new Circle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                Math.random() * 4 - 2,
                Math.random() * 4 - 2,
                'blue',
                'blue'
            ));
        }
    }

    handleClick(e) {
        if (!this.running) return;
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.spawnProjectiles(x, y, 'red');
    }

    spawnProjectiles(x, y, type = 'red') {
        let angles = [];
        let color = type;

        if (type === 'red') {
            angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
        } else if (type === 'green') {
            angles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
        } else if (type === 'yellow') {
            angles = [Math.PI / 2, (3 * Math.PI) / 2];
        } else if (type === 'purple') {
            angles = Array.from({ length: 8 }, (_, i) => i * (Math.PI / 4));
        }

        for (const angle of angles) {
            this.projectiles.push(new Projectile(x, y, angle, color));
        }
    }

    update() {
        if (!this.running) return;

        [...this.redCircles, ...this.blueCircles].forEach(c => c.update(this.canvas));
        this.projectiles.forEach(p => p.update());

        this.projectiles.forEach(p => {
            this.redCircles.forEach(rc => {
                if (rc.active && p.active && p.checkCollision(rc)) {
                    rc.hit();
                    this.spawnProjectiles(rc.x, rc.y, rc.type);
                    this.score++;
                    sounds.coin.play();
                }
            });

            this.blueCircles.forEach(bc => {
                if (bc.active && p.active && p.checkCollision(bc)) {
                    this.lossTriggered = true;
                    shakeScreen();
                    this.running = false;
                    showOverlay("Game Over", [
                        { label: "Retry", onClick: () => new Game(this.canvas, this.levelDataList, this.levelIndex).gameLoop() },
                        { label: "Back", onClick: () => { document.getElementById("overlay")?.remove(); this.canvas.style.display = "none"; showLevelSelect(); } }
                    ]);
                }
            });
        });

        this.projectiles = this.projectiles.filter(p => p.active);

        if (this.winConditionPending) {
            const allInactive = this.projectiles.every(p => !p.active);
            if (allInactive && !this.lossTriggered) {
                this.running = false;
                showOverlay("Level Complete", [
                    { label: "Next", onClick: () => new Game(this.canvas, this.levelDataList, this.levelIndex + 1).gameLoop() },
                    { label: "Retry", onClick: () => new Game(this.canvas, this.levelDataList, this.levelIndex).gameLoop() },
                    { label: "Back", onClick: () => { document.getElementById("overlay")?.remove(); this.canvas.style.display = "none"; showLevelSelect(); } }
                ]);
            }
            return;
        }

        if (this.score >= this.levelData.targetHits && !this.lossTriggered) {
            this.winConditionPending = true;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        [...this.redCircles, ...this.blueCircles].forEach(c => c.draw(this.ctx));
        this.projectiles.forEach(p => p.draw(this.ctx));

        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px sans-serif';
        this.ctx.fillText(`Level ${this.levelIndex + 1}`, 10, 20);
        this.ctx.fillText(`Hits: ${this.score}/${this.levelData.targetHits}`, 10, 40);

        // FPS Counter top right
        this.ctx.fillText(`FPS: ${this.fps}`, this.canvas.width - 80, 20);
    }

    gameLoop() {
        const now = performance.now();
        const delta = (now - this.lastFrameTime) / 1000;
        this.lastFrameTime = now;
        this.fps = Math.round(1 / delta);

        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
