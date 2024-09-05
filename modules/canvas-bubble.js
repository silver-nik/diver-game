class Bubble {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.random() * 2 + 1;
	    this.dy = Math.random() * 2 + 2;

        this.image = new Image();
        this.image.src = "../assets/pixell.png";
    }

    draw(ctx) {

        if (!this.image.complete) {
            return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        ctx.closePath();
        ctx.restore();

    }

    move() {
        this.y -= this.dy;
    }
}

class BubbleContainer {
    constructor() {

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
    
        this.game = document.querySelector('.game');
        this.playerElement = document.querySelector('.diver');
        this.gameWidth = parseInt(getComputedStyle(this.game).width);
        this.gameHeight = parseInt(getComputedStyle(this.game).height);
        this.fade = document.querySelector('.fade');

    
        this.canvas.width = this.gameWidth;
        this.canvas.height = this.gameHeight;

        this.bubbles = [];
        this.max = 70;

        this.maxBubbleSize = 70;
        this.minBubbleSize = 50;

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
        let x = Math.floor(Math.random() * (this.canvas.width)) - 100;
        let y = this.canvas.height + Math.floor(Math.random() * this.canvas.height);
        let radius = Math.floor(Math.random() * (this.maxBubbleSize - this.minBubbleSize + 1)) + this.minBubbleSize;

        return new Bubble(x, y, radius);
    }

    moveBubble() {
        if(this.isEnd) return;

        for (let i = 0; i < this.max; i++) {
            if(this.bubbles[i]) {
                this.bubbles[i].move(this.context);
                this.draw();

            }
        }

        if(this.checkBubblesOutOfScreen()) {
            this.isEnd = true;
            cancelAnimationFrame(this.animation);
        } else {
            this.animation = requestAnimationFrame(() => this.moveBubble());
        }

    }

    checkBubblesOutOfScreen() {
        return this.bubbles.every(bubble => bubble.y + bubble.radius < -1250);
    }

    show() {
        for (let i = 0; i < this.max; i++) {
            this.bubbles[i].draw(this.context);
        }
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stopMoveBubbles() {
        this.isEnd = true;
    }

    init() {
        this.setBubbleArr();
        this.draw();
        this.moveBubble();
    }
}

export default BubbleContainer;