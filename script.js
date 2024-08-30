import { gameConfig } from './services/config.js';
import BubbleContainer from './modules/canvas-bubble.js';
import Diver from './modules/diver.js';
import Shark from './modules/shark.js';
import Fishes from './modules/fishes.js';


class DiverGame {
    constructor() {

        this.initConfigs();

        this.isEnd = false; // флаг конца игры
        this.points = 0;  // текущие очки

        this.enemySpeeds = new Map();
        this.processedFishes = new Set();;
        this.startTime = Date.now(); 
        this.duration = 5;
        this.opacity = 0;

        this.getElements();
        this.initModules();

        this.setStartModal();

    }

    getElements() {
        this.activeLine = document.querySelector('.fish-middle'); // линия середины (активная, где дайвер и акулы)
        this.fishElements = document.querySelectorAll('.fish');
        this.fade = document.querySelector('.fade');
        this.bubbles = document.querySelectorAll('.bubble');
        this.game = document.querySelector('.game');
        this.gameWidth = parseInt(getComputedStyle(this.game).width);
    }

    initConfigs() {
        const { bufferZone, defaultSharkHP, defaultDiverHP, url, gameDefaultEnemySpeed } = gameConfig;
        
        this.bufferZone = bufferZone;
        this.defaultSharkHP = defaultSharkHP;
        this.diverHP = defaultDiverHP;
        this.sharkHP = defaultSharkHP; // текущие очки здоровья акулы
        this.enemySpeed = gameDefaultEnemySpeed;
        this.url = url;
    }

    initModules() {
        this.bubble = new BubbleContainer("canvas");
        this.diverModule = new Diver();
        this.sharkModule = new Shark();
        this.fishesModule = new Fishes();

        this.sharkModule.setFishesModule(this.fishesModule);
        this.sharkModule.setDiverModule(this.diverModule);

        this.fishesModule.setSharkModule(this.sharkModule);
        this.diverModule.setSharkModule(this.sharkModule);

        document.addEventListener("click", (e) => this.diverModule.handleClick(e));
    }

    increaseDifficult() {

        if (this.isEnd) return;

        const elapsedTimeSecond = (Date.now() - this.startTime) / 1000;

        this.fishElements.forEach(el => {
            const fishLeft = parseInt(getComputedStyle(el).left);

            if (fishLeft <= -90) {
                const speedDefault = Math.random() * ((gameConfig.gameDefaultEnemySpeed - 1) - gameConfig.gameMinEnemySpeed) + 2;
                this.enemySpeeds.set(el, speedDefault);
                el.style.left = `${this.gameWidth + this.bufferZone}px`;
            }else {
                el.style.left = `${fishLeft - this.enemySpeeds.get(el)}px`;
            }

            this.fishesModule.updateFishSpeed(elapsedTimeSecond, this.enemySpeeds);
        });

        this.sharkModule.updateDifficult(elapsedTimeSecond);
        this.animationSpeed = requestAnimationFrame(() => this.increaseDifficult());

    }

    endGame() {
        this.fishElements.forEach(fish =>  {
            this.activeLine.style.left = `${this.bufferZone}px`;
            fish.style.left = window.getComputedStyle(fish).left;
        });
        
        this.isEnd = true;
        cancelAnimationFrame(this.animationFrame);
        cancelAnimationFrame(this.animationSpeed);
        this.finalAnimation();
    }

    finalAnimation() {

        if(this.opacity < 1) {
            this.opacity += 0.01;
            this.fade.style.opacity = this.opacity;
        }

        if(this.duration > 1) {
            this.duration += 0.01;
        }

        if(this.opacity < 1 || this.duration < 2) {
            requestAnimationFrame(() => this.finalAnimation());
            this.bubble.clearCanvas();
            this.bubble.setBubbleArr();
        } else {
            this.bubble.moveBubble();
            this.setFinishModal();
        }
        
    }

    setResultModal(win) {
        win ? console.log('Равно или выше 2049') : console.log('Сумма меньше 2409. Попробуйте снова');
        this.endGame();
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

        this.initConfigs();
        this.bubble.clearCanvas();
        this.bubble.setBubbleArr();

        this.points = 0;  // текущие очки
        this.isEnd = false; // флаг конца игры

        this.enemySpeeds.clear();
        this.startTime = Date.now(); 
        this.bubble = new BubbleContainer("canvas");

        this.duration = 5;
        this.opacity = 0;
        this.fade.style.opacity = 0;

        this.diverModule.resetGame();
        this.sharkModule.resetGame();
        this.fishesModule.resetGame();
  
        this.initGame();

    }

    initGame() {
        this.fade.style.opacity = "0";

        this.fishElements.forEach(el => {
            el.style.animation = "action3 infinite linear";
            const speedDefault = Math.random() * ((gameConfig.gameDefaultEnemySpeed - 1) - gameConfig.gameMinEnemySpeed) + 2;
            this.enemySpeeds.set(el, speedDefault);
            el.style.left = `${this.gameWidth + this.bufferZone}px`;

            this.fishesModule.setFish(el);
        })

        this.getCurrentPosition();
        this.increaseDifficult();
    }

    getCurrentPosition = () => {

        if(this.isEnd) return;

        this.fishElements.forEach((el, i) => {
            const fishLeft = parseInt(getComputedStyle(el).left);

            if (fishLeft <= -90) {
                if (!this.processedFishes.has(el)) {
                    this.fishesModule.setFish(el);
                    this.processedFishes.add(el);
                }  

            } else {
                this.processedFishes.delete(el);
            }

            if (el.classList.contains("fish-middle") && el.classList.contains("shark")) { 
                this.sharkModule.handleShark(el, fishLeft);
            }

        });

        if(this.diverModule.diverHP <= 0) {
            this.points < gameConfig.gameScoreToWin ? this.setResultModal(this.points, false) : this.setResultModal(this.points, true);
        }

        if(this.sharkModule.sharkHP == 0) {
            this.activeLine.querySelector(".hp").textContent = "";
        }

        if(this.sharkModule.points >= gameConfig.gameScoreToWin) {
            this.setResultModal(true);
        }

        this.animationFrame = requestAnimationFrame(this.getCurrentPosition);
    }

    setFinishModal() {
        let modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
            <div class="modal-content">
                <p>текст поздравления</p>
                <button id="play-again">Сыграть ещё раз</button>
                <button id="exit">Выйти</button>
            </div>
        `;

        this.postResource(this.url, {
            tg_id: 0,
            result: this.sharkModule.points
        })

        document.querySelector(".fade").prepend(modal);

        document.querySelector('#play-again').addEventListener('click', () => {
            this.resetGame();
            modal.remove();
        });

        document.querySelector('#exit').addEventListener('click', () => {
            modal.remove();
        });
    }

    setStartModal() {
        let modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
            <div class="modal-content">
                <p>текст приветственный</p>
                <button id="play-start">ПОПЛЫЛИ</button>
            </div>
        `;

        this.fade.style.opacity = "1";
        this.fade.prepend(modal);

        document.querySelector('#play-start').addEventListener('click', () => {
            this.initGame();
            modal.remove();
        });

    }

}

document.addEventListener("DOMContentLoaded", () => new DiverGame());
