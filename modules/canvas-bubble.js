class Bubble {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.random() * 2 - 1;
	    this.dy = Math.random() * 2 + 1;
    }

    draw(ctx) {

        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x + this.radius * 2 * 0.1, this.y + this.radius * 2 * -0.3, this.radius / 2 * 0.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }

    move() {
        this.x -= this.dx;
        this.y -= this.dy;
    }
}

class BubbleContainer {
    constructor(container) {
        this.canvas = document.querySelector(container);
        this.context = this.canvas.getContext("2d");
        this.bubbles = [];
        this.max = 10;

        this.maxBubbleSize = 200;
        this.minBubbleSize = 100;

        this.isEnd = false;
    }

    setBubbleArr() {
        for (let i = 0; i < this.max; i++) {
            let bubble = this.createBubble();
            this.bubbles.push(bubble);
        }
    }

    draw() {
        this.clearCanvas();
        this.show();
    }

    createBubble() {
        let x = Math.floor(Math.random() * this.canvas.width);
        let y = this.canvas.height + Math.floor(Math.random() * this.canvas.height);
        let radius = Math.floor(Math.random() * (this.maxBubbleSize - this.minBubbleSize + 1)) + this.minBubbleSize;
        return new Bubble(x, y, radius);
    }

    moveBubble() {
        if(this.isEnd) return;

        for (let i = 0; i < this.max; i++) {
            this.bubbles[i].move(this.context);
            this.draw();
        }

        this.animation = requestAnimationFrame(() => this.moveBubble());
    }

    show() {
        for (let i = 0; i < this.max; i++) {
            this.bubbles[i].draw(this.context);
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
    }

    stopMoveBubbles() {
        this.isEnd = true;
    }

    init() {
        this.draw();
        this.moveBubble();
    }
}

export default BubbleContainer;