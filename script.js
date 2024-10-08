import { gameConfig } from './services/config.js';
import { getPlayerCenter, getRandomInt } from './services/utils.js';
import BubbleContainer from './modules/canvas-bubble.js';
import Diver from './modules/diver.js';
import Shark from './modules/shark.js';
import Fishes from './modules/fishes.js';

class Fish {
    constructor(ctx, startX, startY, controlX, controlY, endX, endY, duration, image, isEnemy, game, hp) {

        this.initVars(ctx, startX, startY, controlX, controlY, endX, endY, duration, image, isEnemy, game, hp);
        this.initDOMElements();
        this.setEventListener();
    }

    setEventListener() {
        if(this.isEnemy) {
            document.addEventListener("click", (e) => this.handleClick(e));
        }
    }

    initDOMElements() {
        this.gamerHp = document.querySelector('.gamer-hp');
        this.text = document.querySelector('.text');
        this.diver = document.querySelector('.diver');
    }

    initVars(ctx, startX, startY, controlX, controlY, endX, endY, duration, image, isEnemy, game, hp) {
        this.ctx = ctx;
        this.startX = startX;
        this.startY = startY;
        this.controlX = controlX;
        this.controlY = controlY;
        this.endX = endX;
        this.endY = endY;
        this.duration = duration;
        this.startTime = null;
        this.image = image;
        this.start = Date.now();
        this.diverModule = new Diver();
        this.midGameTime = (gameConfig.gameAvarageTime / 2) * 60;
        this.game = game;

        this.gamerHp = document.querySelector('.gamer-hp');
        this.text = document.querySelector('.text');
        this.points = 0;

        this.isEnemy = isEnemy;
        this.pointPerEnemy = gameConfig.pointsPerEnemy;
        this.redHeartImage = new Image();
        this.greyHeartImage = new Image();
        this.redHeartImage.src = gameConfig.increaseHpIcon;
        this.greyHeartImage.src = gameConfig.decreaseHpIcon
        this.hp = isEnemy ? hp : '';
        this.startHp = hp;
        this.isAlive = true;
        this.isScored = false;
        this.isHit = false;
        this.isLoaded = false;
    }

    changeImage() {

        if (this.isEnemy) {
            const randomIndex = Math.floor(Math.random() * gameConfig.enemies.length);
            const selectedEnemy = gameConfig.enemies[randomIndex];

            this.image.src = selectedEnemy.img;
            this.hp = selectedEnemy.hp;
            this.startHp = selectedEnemy.hp;
        } else {
            this.image.src = this.game.imagesNpc[Math.floor(Math.random() * this.game.imagesNpc.length)];
        }

    }
    
    handleClick(e) {
        const actionImage = document.querySelector(".toggle");
        actionImage.classList.remove("hidden");
        setTimeout(() => {
            actionImage.classList.add("hidden");
        }, 1000)
        navigator.vibrate(200);

        if (e.target.closest('.modal') || e.target === document.querySelector('.modal')) return;

        this.decreaseHealth();
    }

    decreaseHealth() {
        if (this.isEnemy && this.isAlive) {
            this.hp -= 1;


            if (this.hp <= 0  && !this.isScored) {
                this.hp = 0; 
                this.game.increasePoints(this.pointPerEnemy); 
                this.isAlive = false; 
                this.isScored = true;
            }
        }
    }

    initRandomAttr(enemy) {
        if(!enemy) {
            this.startTime = null;
            this.endX = Math.random() < 0.5 ? -100 : canvas.width + 100;
            this.endY = getRandomInt(0, canvas.height + 100); 
        }

        this.startX = getRandomInt(0, canvas.width);
        this.startY = -200; 
        this.controlX = getRandomInt(0, canvas.width / 2);
        this.controlY = getRandomInt(0, canvas.height);
    }

    move() {
        if (!this.startTime) this.startTime = performance.now();

        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const t = Math.min(elapsed / this.duration, 1); 
        this.x = (1 - t) ** 2 * this.startX + 2 * (1 - t) * t * this.controlX + t ** 2 * this.endX;
        this.y = (1 - t) ** 2 * this.startY + 2 * (1 - t) * t * this.controlY + t ** 2 * this.endY;

            if(t == 0) {
                this.isAlive = true;
                this.isHit = false; 
            
                if(this.isEnemy) {
                    this.isScored = false;
                    this.game.isScored = false; 

                    this.initRandomAttr(true);
                }
            }

            if (t >= 1) {
                this.initRandomAttr();
                this.changeImage();
            }

    }

    handleCollisionWithPlayer() {
        if(this.isEnemy && this.isAlive && this.hp > 0 && !this.isHit) {
            this.diverModule.diverHP--;
            this.gamerHp.textContent = this.diverModule.diverHP;  
            this.game.playerElement.style.opacity = 0.5;
            setTimeout(() => {
                this.game.playerElement.style.opacity = 1;
            }, 1000)
            this.isHit = true;

            if (this.diverModule.diverHP <= 0) {
                this.game.isGameOver = true;
                this.game.setResultModal(false);

                try {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                } catch(e) {}

                return;
            }

        }
    }

    checkCollisionWithPlayer(animationFrameId) {
        if (!this.isAlive || this.game.isGameOver) return; 

        const playerRect = this.diver.getBoundingClientRect();
        const playerCenter = getPlayerCenter(this.diver, this.game.canvas);

        const playerHalfWidth = playerRect.width / 2;
        const playerHalfHeight = playerRect.height / 2;

        if (
            this.x < playerCenter.x + playerHalfWidth &&
            this.x + 40 > playerCenter.x - playerHalfWidth &&
            this.y < playerCenter.y + playerHalfHeight &&
            this.y + 40 > playerCenter.y - playerHalfHeight
        ) {
            this.handleCollisionWithPlayer();
        }

    }

    draw() {  
        this.ctx.globalAlpha = 1;       
        this.ctx.beginPath();
        if(this.isEnemy) {

            for (let i = 0; i < this.startHp; i++) {
                const heartImage = i < this.hp ? this.redHeartImage : this.greyHeartImage;
                this.ctx.globalAlpha = 1;
                this.ctx.drawImage(heartImage, (this.x + this.image.width - (this.image.width / 4)) + i * (12 + 2), (this.y + this.image.height - (this.image.height / 1.5)  - 10), 12, 10);
            }


        }
        
        if(this.hp >= 0 && this.hp < this.startHp && this.isEnemy) {
            this.ctx.globalAlpha = 0.5;
            this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        } else {
            this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        }

        this.ctx.closePath();
    }
}

class Game {
    constructor() {

        this.initCanvas();
        this.initGameSettings();
        this.initGameObj();
        this.setStartModal();

    }

    initCanvas() {
        this.canvas = document.getElementById('canvas1');
        this.ctx = this.canvas.getContext('2d');
        this.game = document.querySelector('.game');
        this.fade = document.querySelector('.fade');
        this.playerElement = document.querySelector('.diver');
        
        this.gameWidth = parseInt(getComputedStyle(this.game).width);
        this.gameHeight = parseInt(getComputedStyle(this.game).height);
        
        this.canvas.width = this.gameWidth;
        this.canvas.height = this.gameHeight;
    }

    initGameSettings() {
        this.url = gameConfig.url;
        this.imagesNpc = gameConfig.npcImages;
        this.imagesEnemy = gameConfig.imagesEnemy;
        this.max = 4;
        this.duration = 5;
        this.opacity = 0;
        this.isGameOver = false;
        this.gameOver = false;
        this.isScored = false;
        this.points = 0;
        this.animationFrameId = null;
        this.isFinal = false;
    }

    initGameObj() {
        this.bubble = new BubbleContainer("canvas");
        this.fish = new Fish();
        this.npcFishes = [];
        this.createFishes();
        this.createEnemy();
        this.bubble.clearCanvas();
        this.bubble.setBubbleArr();
    }

    endGame(win) {
        this.gameOver = true;
        this.setResultModal(win);
        this.stopAnimation();
    }

    increasePoints(points) {
        if (!this.isScored) { 
            this.points += Math.floor(points);
            this.isScored = true;
            document.querySelector('.text').textContent = this.points;
        }

        if (this.points >= gameConfig.gameScoreToWin) {
            this.endGame(true);
        }
    }

    stopAnimation() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    createFish(isEnemy) {
        const startX = getRandomInt(0, this.canvas.width); 
        const startY = getRandomInt(-100, -50); 
        const controlX = getRandomInt(0, this.canvas.width / 2);
        const controlY = getRandomInt(0, this.canvas.height);
        const endX = isEnemy ? this.gameWidth / 2 : getRandomInt(this.canvas.width, this.canvas.width + 100);
        const endY = isEnemy ? this.gameHeight / 2 : getRandomInt(0, this.canvas.height + 100);
        const duration = getRandomInt(7000, 10000);
        let hp = gameConfig.defaultSharkHP;

        const image = new Image();

        if (isEnemy) {
            const randomIndex = Math.floor(Math.random() * gameConfig.enemies.length);
            const selectedEnemy = gameConfig.enemies[randomIndex];

            image.src = selectedEnemy.img;
            hp = selectedEnemy.hp;
        } else {
            image.src = this.imagesNpc[Math.floor(Math.random() * this.imagesNpc.length)];
        }
 
        return new Fish(this.ctx, startX, startY, controlX, controlY, endX, endY, duration, image, isEnemy, this, hp);
    }

    createEnemy() {
        const enemyFish = this.createFish(true);
        this.npcFishes.push(enemyFish);
    }

    createFishes() {
        for (let i = 0; i < this.max; i++) {
            const fish = this.createFish();
            this.npcFishes.push(fish);
        }
    }

    animate = () => {
        if (this.isGameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        const playerCenter = getPlayerCenter(this.playerElement, this.canvas);

        this.npcFishes.forEach(fish => {
            if (fish.isEnemy) { 
                fish.endX = playerCenter.x;
                fish.endY = playerCenter.y;
            }
            fish.move();
            fish.draw();
            fish.checkCollisionWithPlayer(this.animationFrameId);
        });

        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    finalAnimation(win) {

        if(this.opacity < 1) {
            this.opacity += 0.01;
            this.fade.style.opacity = this.opacity;
        }

        if(this.duration > 1) {
            this.duration -= 0.01;
        }

        if(this.opacity < 1 || this.duration < 2) {
            requestAnimationFrame(() => this.finalAnimation());
        } else {
            this.bubble.moveBubble();
            setTimeout(() => {
                this.setFinishModal();
            }, 6000);
        }
        
    }

    setResultModal(win) {
        win ? console.log('Равно или выше 2049') : console.log('Сумма меньше 2409. Попробуйте снова');
        if(win) {
            this.isFinal = true;
        }

        this.finalAnimation();
    }

    createModal(modlaObj) {
        const {title, content, buttonId, buttonText, buttonExit, bgImage, onButtonClick, callback} = modlaObj;

        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.innerHTML = `
            <img src="./assets/logo.svg" class="logo">
            <div class="modal-content ${bgImage ? 'finish-modal' : 'start-modal'}">
                <p class="${bgImage ? 'finish-title' : 'title'}">${title}</p>
                ${content}
                <button id="${buttonId}" class="${bgImage ? 'red-btn' : 'blue-btn'}">${buttonText}</button>
                ${buttonExit ? '<button id="exit" class="dark-btn">Выйти</button>' : ''}
            </div>
            ${bgImage ? `<img src="./assets/${bgImage}.png" class="bg-modal">` : ''}
        `;
    
        this.fade.style.opacity = "1";
        this.fade.prepend(modal);

        if(callback) {
            callback();
        }
    
        document.querySelector(`#${buttonId}`).addEventListener('click', () => {
            if (onButtonClick) onButtonClick();
            modal.remove();
        });

        try {
            document.querySelector(`#exit`).addEventListener('click', () => {
                bot.close();
            });
        } catch(e) {}
        
    }

    setFinishModal() {
        this.createModal({
            title: this.isFinal ? "Победа!" : `Вы заработали ${this.points} баллов`,
            content: this.isFinal 
                ? `<p class="finish-text">Приходи на NetCase Day, чтобы побороться за приз и увидеть, как ловят сетевые угрозы PT Sandbox и PT NAD</p>` 
                : "",
            buttonText: this.isFinal ? "Играть еще" : "Сыграть ещё раз",
            buttonId: "play-again",
            buttonExit: true,
            bgImage: this.isFinal ? "sccss" : "lse",
            onButtonClick: () => {
                this.resetGame();
            },
            callback: () => {
                this.postResource(this.url, {
                    tg_id: parseInt(localStorage.getItem('uid')),
                    result: this.points
                });
            }
        });
    }

    setStartModal() {
        this.createModal({
            title: "Тапай по экрану и уничтожай акул-хакеров",
            content: `<p class="preview">До победы <span class="preview-count">${gameConfig.gameScoreToWin} баллов</span></p>`,
            buttonText: "ПОПЛЫЛИ",
            buttonId: "play-start",
            buttonExit: false,
            bgImage: "", 
            onButtonClick: () => {
                this.fade.style.opacity = "0";
                this.init();
            }
        });
    }

    async postResource(url, data) {
        if(typeof data.tg_id === 'number' && typeof data.result === 'number') {
            try {
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch(error => {
                    console.log('Error');
                }); 
            } catch(e) {    }
        } else {
            console.log("scss");
        }
    }

    resetGame() {


        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        this.bubble.stopMoveBubbles();
        this.bubble.clearCanvas();
        this.initGameSettings();
        this.initGameObj();
        this.fish.text.textContent = 0;
        this.fish.gamerHp.textContent = gameConfig.defaultDiverHP;
        this.fade.style.opacity = 0;
        this.fish.points = 0;
        this.init();

    }

    init() {
        document.querySelector('.game__status-bar').classList.add('active');
        document.querySelector('.diver').classList.add('active');

        this.animate();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bot.expand();
    new Game();
});

