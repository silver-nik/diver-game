class Bubble {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.random() * 2 + 1;
	    this.dy = Math.random() * 7 + 9;

        this.image = new Image();
        this.image.src = "./assets/pixell.png";
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
        this.max = 50;
        this.image = new Image();
        this.image.src = "./assets/pixell.png";

        this.maxBubbleSize = 70;
        this.minBubbleSize = 50;

        this.isEnd = false;
        this.hasCalledSetFinishModal = false;
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

    waitBubblesEnd(setFinishModalMethod, ) {
        return new Promise((resolve) => {

            let hasCalledSetFinishModal = false;

            const checkBubbles = () => {
                const positionStatusEnd = this.checkBubblesPositionOnScreen('end');
                const positionStatusMiddle = this.checkBubblesPositionOnScreen('mid');

                if(positionStatusMiddle && !hasCalledSetFinishModal) {
                    document.querySelector('.modal')?.remove();
                    if (setFinishModalMethod) {
                        setFinishModalMethod();
                        hasCalledSetFinishModal = true; 
                    }
                }
    
                if (positionStatusEnd) {
                    this.hasCalledSetFinishModal = false;
                    cancelAnimationFrame(this.animation);
                    this.clearCanvas();
                    this.bubbles = [];
                    this.setBubbleArr();
                    this.isEnd = false;
                    resolve(); 
                } else {
                    this.animation = requestAnimationFrame(checkBubbles);
                }
            };
            checkBubbles();
        });
    }

    moveBubble() {

        for (let i = 0; i < this.max; i++) {
            if(this.bubbles[i]) {
                this.bubbles[i].move();
                this.draw();
            }
        }

        this.animation = requestAnimationFrame(() => this.moveBubble());

    }
    
    checkBubblesPositionOnScreen(position) {

        if (position === 'end') {
            return this.bubbles.every(bubble => bubble.y + bubble.radius < -this.image.height);
        }

        if (position === 'mid') {
            return this.bubbles.every(bubble => bubble.y + bubble.radius < this.canvas.height / 2);
        }

        return false;
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