import { gameConfig } from './services/config.js';
import { getPlayerCenter, getRandomInt } from './services/utils.js';
import BubbleContainer from './modules/canvas-bubble.js';

let occupiedLines = [];

let lineYPositions = [
    0,  // Верхняя линия
    160, // Средняя линия
    310  // Нижняя линия
];

let askedQuestions = [];

class Fish {
    constructor(ctx, startX, startY, controlX, controlY, endX, endY, duration, image, isEnemy, game, hp) {

        this.initVars(ctx, startX, startY, controlX, controlY, endX, endY, duration, image, isEnemy, game, hp);
        this.initDOMElements();
        this.setEventListener();

        //  if(!isEnemy) {
            this.availableSpecial = true;
            this.availableEnemy = true;
        // }

    }

    setEventListener(spec) {
        if (this.isEnemy) {
            let isTouched = false;
    
            document.addEventListener("touchstart", (e) => {
                isTouched = true;
                this.handleClick(e);
            });
    
            document.addEventListener("click", (e) => {
                if (!isTouched) this.handleClick(e);
                isTouched = false;
            });
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

        this.midGameTime = (gameConfig.gameAvarageTime / 2) * 60;
        this.game = game;

        this.gamerHp = document.querySelector('.gamer-hp');
        this.text = document.querySelector('.text');
        this.points = 0;

        this.defaultDiverHP = gameConfig.defaultDiverHP;
        this.diverHP = this.defaultDiverHP;
        this.gamerHp.textContent = this.diverHP;

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

        this.isSpecialElement = false;
        this.isEnemy = false;
        this.isCurentQuestion = 0;
        this.isQuestion = false;
        this.specialCreated = false;
        this.enemyCreated = false;   

    }

    changeImage() {

        if (this.isEnemy) {
            const randomIndex = Math.floor(Math.random() * gameConfig.enemies.length);
            const selectedEnemy = gameConfig.enemies[randomIndex];

            this.image.src = selectedEnemy.img;
            this.hp = selectedEnemy.hp;
            this.startHp = selectedEnemy.hp;
        } else if(this.isSpecialElement) {
            this.image.src = './assets/icons8-фонарь-80.png';
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

        if (e.target.closest('.modal') || e.target === document.querySelector('.modal')) return;

        const playerLine = this.getPlayerLine();

        console.log(playerLine);

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

    getPlayerLine() {
        const playerY = this.diver.getBoundingClientRect().left;
        let playerLine = null;
        
        if (playerY <= lineYPositions[0]) {
            playerLine = lineYPositions[0];
        } else if (playerY <= lineYPositions[1]) {
            playerLine = lineYPositions[1];
        } else {
            playerLine = lineYPositions[2];
        }
        
        return playerLine;
    }

    
    initRandomAttr(enemy) {

        if (occupiedLines.length >= lineYPositions.length) {
            occupiedLines = [];
        }
    
        // if (!enemy) {
            this.startTime = null;
        // }


                if (this.availableSpecial && !this.isSpecialElement && !this.isEnemy) {
                    this.isSpecialElement = Math.random() < 0.1;
                }
                
                if (this.availableEnemy && !this.isSpecialElement) {
                    this.isEnemy = Math.random() < 0.2;
                }

    
        this.startY = -300; 
        this.duration = getRandomInt(gameConfig.gameMinEnemySpeed, gameConfig.gameMaxEnemySpeed) * 1000;
    
        if (this.startY > this.game.canvas.height + 100) {
            const index = occupiedLines.indexOf(lineYPositions.indexOf(this.startX));
            // if (index > -1) {
            //     occupiedLines.splice(index, 1);
            // }
        }

        if (occupiedLines.length >= lineYPositions.length) {
            occupiedLines = [];
        }
    
        let availableLines = lineYPositions.filter((line, index) => !occupiedLines.includes(index));
        
        if (availableLines.length > 0) {
            let lineIndex = Math.floor(Math.random() * availableLines.length);
            this.startX = availableLines[lineIndex];

            // if(this.isEnemy) {
            //     console.log(this.startX);
            //     console.log(availableLines);
            // }
    
            occupiedLines.push(lineYPositions.indexOf(this.startX));
        } 

        
        
    
    }

    move() {
        if (!this.startTime) this.startTime = performance.now();

        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const t = Math.min(elapsed / this.duration, 1); 
        this.x = this.startX;
        this.y = (1 - t) ** 2 * this.startY + 2 * (1 - t) * t * this.controlY + t ** 2 * this.endY; 

            if(t == 0) { // начало анимации
                this.isAlive = true;
                this.isHit = false; 
                // this.isSpecialElement = false;
            
                if(this.isEnemy) {
                    this.isScored = false;
                    this.game.isScored = false; 
                }
            }

            if (t >= 1) { // завершение анимации 
                const lineIndex = lineYPositions.indexOf(this.startX);
                const occupiedIndex = occupiedLines.indexOf(lineIndex);
                
                if (occupiedIndex > -1) {
                    occupiedLines.splice(occupiedIndex, 1);
                }

                // if() {
                // setTimeout(() => {
                    this.initRandomAttr();
                    this.changeImage();
                    // console.log(this.isEnemy);

                // }, 100)

                // }
            }

    }

    handleCollisionWithPlayer() {
        if(this.isEnemy && this.isAlive && this.hp > 0 && !this.isHit) {
            console.log("hit");
            console.log(this.isEnemy, this.isAlive, this.hp, this.isHit);
            this.diverHP--;
            this.gamerHp.textContent = this.diverHP;  
            this.game.playerElement.style.opacity = 0.5;
            setTimeout(() => {
                this.game.playerElement.style.opacity = 1;
            }, 1000)
            this.isHit = true;

            if (this.diverHP <= 0) {
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


        if(this.availableSpecial && this.isSpecialElement && !this.isQuestion) {
            this.isQuestion = true;
            this.game.isStoppedGame = true;

            const question = this.game.getRandomQuestion();
            console.log(question);
            this.game.setQuestionModal(question);

            // setTimeout(() => {
            //     this.isQuestion = false;
            //     this.game.isStoppedGame = false;
            //     this.game.animate();
            // }, 3000);
        }
    }

    checkCollisionWithPlayer(animationFrameId) {
        if (!this.isAlive || this.game.isGameOver || this.game.isStoppedGame) return; 

        const playerRect = this.diver.getBoundingClientRect();
        const playerCenter = getPlayerCenter(this.diver, this.game.canvas);

        const playerHalfWidth = playerRect.width / 2;
        const playerHalfHeight = playerRect.height / 2;

        if (
            this.x < playerCenter.x + playerHalfWidth &&
            this.x + 20 > playerCenter.x - playerHalfWidth &&
            this.y < playerCenter.y + playerHalfHeight &&
            this.y + 20 > playerCenter.y - playerHalfHeight
        ) {
            this.handleCollisionWithPlayer();
        }

    }

    draw() {  
        this.ctx.globalAlpha = 1;       
        this.ctx.beginPath();
        if(this.isEnemy) {


            if (this.hp > 0) {
                this.ctx.globalAlpha = 1;

                for (let i = 0; i < this.startHp; i++) {
                    const heartImage = i < this.hp ? this.redHeartImage : this.greyHeartImage;
                    this.ctx.globalAlpha = 1;
                    this.ctx.drawImage(heartImage, (this.x + this.image.width - (this.image.width / 4)) + i * (12 + 2), (this.y + this.image.height - (this.image.height / 1.5)  - 10), 12, 10);
                }
            } else if (this.hp == 0) {
                this.ctx.globalAlpha = 0;
                this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
                this.ctx.globalAlpha = 1;
                this.ctx.closePath();
                return;
            }
    


        }
        
        if(this.hp > 0 && this.hp < this.startHp && this.isEnemy) {
            this.ctx.globalAlpha = 0.5;
        } else if(this.hp == 0 && this.isEnemy) {
            this.ctx.globalAlpha = 0;
        }

        this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
        this.ctx.closePath();
    }
}

class Game {
    constructor() {


        this.initCanvas();
        this.initGameSettings();
        this.initGameObj();
        // this.setStartModal();
        this.initDiverControl();
        this.init();

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

        lineYPositions = this.calculateLinePositions();
        this.diverPositionIndex = 1;
        this.updateDiverPosition();
    }

    initGameSettings() {
        this.url = gameConfig.url;
        this.imagesNpc = gameConfig.npcImages;
        this.imagesEnemy = gameConfig.imagesEnemy;
        this.max = gameConfig.npcWeight;
        this.duration = 5;
        this.opacity = 0;
        this.isGameOver = false;
        this.gameOver = false;
        this.isScored = false;
        this.points = 0;
        this.animationFrameId = null;
        this.isFinal = false;
        this.isStarted = false;

        this.isAnimationActiove = false;

        this.enemySpawnInterval = 2000;
        this.lastEnemySpawnTime = performance.now();

        this.isStoppedGame = false;
        this.correctAnswersCount = 0;
    }

    initGameObj() {
        this.bubble = new BubbleContainer("canvas");
        this.fish = new Fish();
        this.npcFishes = [];
        this.createFishes();
        // this.createEnemy();
        this.bubble.clearCanvas();
        this.bubble.setBubbleArr();

    }

    getRandomQuestion() {
        
        const availableQuestions = gameConfig.questions1.filter(q => !askedQuestions.includes(q));
        
        if (availableQuestions.length === 0) {
            console.log("Все вопросы заданы!");
            return null;
        }
    
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        const question = availableQuestions[randomIndex];
    
        askedQuestions.push(question);
        
        return question;
    }
    
    calculateLinePositions() {
        const canvasWidth = this.canvas.width;

        return [
            0, 
            canvasWidth * 2 / 6, 
            canvasWidth * 4.5 / 6 
        ];
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

    initDiverControl() {
        this.diverPositionIndex = 1; 
        this.linePositions = [...lineYPositions];

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.moveDiverLeft();
            } else if (event.key === 'ArrowRight') {
                this.moveDiverRight();
            }
        });
    }

    moveDiverLeft() {
        if (this.diverPositionIndex > 0) {
            this.diverPositionIndex--;
            this.updateDiverPosition();
        }
    }

    moveDiverRight() {
        if (this.diverPositionIndex < this.linePositions.length - 1) {
            this.diverPositionIndex++;
            this.updateDiverPosition();
        }
    }

    updateDiverPosition() {
        const newPosition = lineYPositions[this.diverPositionIndex];
        this.playerElement.style.left = `${newPosition}px`;
    }

    createFish(isEnemy) {
    
        if (occupiedLines.length >= lineYPositions.length) {
            console.log(this.linePositions);
            occupiedLines = [];
        }
        
    
        let availableLines = lineYPositions.filter((line, index) => !occupiedLines.includes(index));


        if (availableLines.length > 0) {
            let lineIndex = Math.floor(Math.random() * availableLines.length);
            this.startX = availableLines[lineIndex];
        
            occupiedLines.push(lineYPositions.indexOf(this.startX));
        }

        const startY = getRandomInt(-100, -50); // Начало за пределами canvas сверху
        const endY = getRandomInt(this.canvas.height + 50, this.canvas.height + 100); 
        
        const controlX = this.startX; 
        const controlY = startY; 
    
        // const duration = getRandomInt(9000, 10000);
        const duration = 4000;

        let hp = gameConfig.defaultSharkHP;
        const isSpecialElement = Math.random() < 0.2; // 20% шанс создать специальный элемент
    
        const image = new Image();
    
        if (isEnemy) {
            const randomIndex = Math.floor(Math.random() * gameConfig.enemies.length);
            const selectedEnemy = gameConfig.enemies[randomIndex];
    
            image.src = selectedEnemy.img;
            hp = selectedEnemy.hp;
        } else {
            image.src = this.imagesNpc[Math.floor(Math.random() * this.imagesNpc.length)];
        }
    
        return new Fish(this.ctx, this.startX, startY, controlX, controlY, this.startX, endY, duration, image, isEnemy, this, hp);
    }

    // createEnemy() {
    //     const enemyFish = this.createFish(true);
    //     this.npcFishes.push(enemyFish);
    // }

    createFishes() {
        for (let i = 0; i < this.max; i++) {
            const fish = this.createFish();
            this.npcFishes.push(fish);
        }
    }

    handleAnswer = (answerIndex) => { 
        const lastQuestion = askedQuestions[askedQuestions.length - 1];

        const selectedAnswer = lastQuestion.answers[answerIndex];
        
        if(selectedAnswer.correct) {
            this.correctAnswersCount++;
            console.log(`Это правильный ответ, это ${this.correctAnswersCount} правильный ответ`);
        } else {
            const correctAnswer = lastQuestion.answers.find(answer => answer.correct);
            console.log(`Это неправильный ответ. Правильный ответ: ${correctAnswer.text}`);
        }
    }

    animate = () => {
        if (this.isGameOver || this.isStoppedGame) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
        const playerCenter = getPlayerCenter(this.playerElement, this.canvas);

        this.npcFishes.forEach(fish => {
            fish.move();
            fish.draw();
            fish.checkCollisionWithPlayer(this.animationFrameId);
        });

        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    async finalAnimation(win) {

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
            await this.bubble.waitBubblesEnd(() => {
                this.setFinishModal();
            });

        }
        
    }

    setResultModal(win) {
        win ? console.log('Равно или выше 2049') : console.log('Сумма меньше 2409. Попробуйте снова');
        if(win) {
            this.isFinal = true;
        }

        this.finalAnimation();
    }

    createModal(modalObj) {
        const {className, title, content, buttonId, buttonText, buttonExit, bgImage, onButtonClick, callback} = modalObj;

        let modal = document.createElement("div");
        modal.classList.add("modal");
        modal.classList.add(className);
        modal.innerHTML = `
            <img src="./assets/logo.svg" class="logo">
            <div class="modal-content ${bgImage ? 'finish-modal' : 'start-modal'}">
                <p class="${bgImage ? 'finish-title' : 'title'}">${title}</p>
                ${content}
                ${buttonText ? `<button id="${buttonId}" class="red-btn">${buttonText}</button>`:  ''}
                ${buttonExit ? '<button id="exit" class="dark-btn">Выйти</button>' : ''}
            </div>
            ${bgImage ? `<img src="./assets/${bgImage}.png" class="bg-modal">` : ''}
        `;
    
        this.fade.style.opacity = "1";
        this.fade.prepend(modal);

        if(callback) {
            callback();
        }

        document.querySelectorAll(`.answer-item`).forEach(el => {
            el.addEventListener('click', () => {
                const index = el.getAttribute("data-index");
                this.handleAnswer(index);
            });
        })
    
        document.querySelector(`#${buttonId}`).addEventListener('click', () => {
            if (onButtonClick) onButtonClick(modal);
        });

        try {
            document.querySelector(`#exit`).addEventListener('click', () => {
                bot.close();
            });
        } catch(e) {}
        
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    setFinishModal() {
        this.createModal({
            className: "final",
            title: this.isFinal ? "Победа!" : `Вы заработали ${this.points} баллов`,
            content: this.isFinal 
                ? `<p class="finish-text">Приходи на NetCase Day, чтобы побороться за приз и увидеть, как ловят сетевые угрозы PT Sandbox и PT NAD</p>` 
                : "",
            buttonText: this.isFinal ? "Играть еще" : "Сыграть ещё раз",
            buttonId: "play-again",
            buttonExit: true,
            bgImage: this.isFinal ? "sccss" : "lse",
            onButtonClick: async (modal) => {
                if (!this.isStarted) {

                    this.isStarted = true;
                    this.clearCanvas();
                    this.bubble.moveBubble(); 
                    this.fade.style.pointerEvents = "none"; 
                    await this.bubble.waitBubblesEnd();
                    this.init();
                    this.resetGame();
                    this.fade.style.pointerEvents = "auto"; 
                }
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
            className: "start",
            title: "Тапай по экрану и уничтожай акул-хакеров",
            content: `<p class="preview">До победы <span class="preview-count">${gameConfig.gameScoreToWin} баллов</span></p>`,
            buttonText: "ПОПЛЫЛИ",
            buttonId: "play-start",
            buttonExit: false,
            bgImage: "", 
            onButtonClick: async (modal) => {
                if (!this.isStarted) {
                    this.isStarted = true;
                    this.bubble.moveBubble(); 
                    this.fade.style.pointerEvents = "none"; 
                    await this.bubble.waitBubblesEnd();
                    this.init();
                    this.fade.style.pointerEvents = "auto"; 
                }
            }
        });


    }

    setQuestionModal(question) {
        if(question) {
            this.createModal({
                className: "question",
                title: `${question.question}`,
                content: `
                    <ul>
                        ${question.answers.map((answer, index) => `
                            <li>
                                <button class="answer-item" data-index="${index}">${answer.text}</button>
                            </li>
                        `).join('')}
                    </ul>
                `
            });
        }
    
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
        this.isStarted = false;
        this.animate();
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     bot.expand();
//     new Game();
// });

