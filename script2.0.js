// import { gameConfig } from './services/config.js';
// import { getScaledDimensions, calculateLines, generateUniqueCode } from './services/utils.js';
// import BubbleContainer from './modules/canvas-bubble.js';

// modules start

const gameConfig = {

    url: 'https://jsonplaceholder.typicode.com/posts/', // endpoint https://ptgame.idurn.ru/save_game_result

    npcImages: ['./assets/npc.png', './assets/npc-2.png', './assets/npc-3.png', './assets/npc-6.png', './assets/npc-7.png', './assets/npc-8.png', './assets/npc-9.png'],
    npcImages2: ['./assets/npc.png', './assets/npc-2.png', './assets/npc-3.png', './assets/npc-6.png', './assets/npc-7.png', './assets/npc-8.png', './assets/npc-9.png',  './assets/npc-bottle.png'],


    increaseHpIcon: './assets/heart-icon.svg',
    decreaseHpIcon: './assets/heart-icon-lse.svg',

    enemies: [
        {
            img: './assets/enemy-1.png',
            hp: 1,
        },
    ],

    enemies2: [
        {
            img: './assets/enemy-2.png',
            hp: 1,
        }
    ],

    enemies3: [
        {
            img: './assets/shark.png',
            hp: 1,
        }
    ],

    questions1: [
        {
            question: "Современные атаки зачастую используют DNS-туннели для организации связи с командными центрами злоумышленников. Умеет ли PT NAD выявлять такие каналы?",
            answers: [
                { text: "Да. В PT NAD реализован механизм выявления DGA-доменов", correct: true },
                { text: "Нет. PT NAD не имеет таких сигнатур", correct: false }
            ]
        },
        // {
        //     question: "Умеет ли PT NAD отправлять отчеты на почту?",
        //     answers: [
        //         { text: "Да", correct: true },
        //         { text: "Нет", correct: false }
        //     ]
        // },
        // {
        //     question: "Какого метода обнаружения угроз нет в PT NAD?",
        //     answers: [
        //         { text: "сигнатурный", correct: false },
        //         { text: "ML", correct: false },
        //         { text: "AI", correct: true }
        //     ]
        // },

        // {
        //     question: "Как в PT NAD реализована проверка файлов?",
        //     answers: [
        //         { text: "На основе индикаторов компрометации", correct: false },
        //         { text: "При помощи интеграции с PT Sandbox", correct: false },
        //         { text: "Оба варианта верны", correct: true }
        //     ]
        // },

        // {
        //     question: "Какой тип хэша используется в качестве индикатора компрометации?",
        //     answers: [
        //         { text: "md5", correct: true },
        //         { text: "sha1", correct: false },
        //         { text: "sha256", correct: false },
        //         { text: "sha512", correct: false }
        //     ]
        // },

        // {
        //     question: "Может ли PT NAD выявлять нестойкие пароли?",
        //     answers: [
        //         { text: "Да, только в нешифрованном трафике", correct: true },
        //         { text: "Да, во всем трафике", correct: false },
        //         { text: "Нет", correct: false }
        //     ]
        // },
        // {
        //     question: "Можно ли скачать дамп трафика, в котором обнаружена атака?",
        //     answers: [
        //         { text: "Да", correct: true },
        //         { text: "Нет", correct: false }
        //     ]
        // },
        // {
        //     question: "Может ли PT NAD расшифровывать трафик?",
        //     answers: [
        //         { text: "Нет", correct: true },
        //         { text: "Да", correct: false }
        //     ]
        // },
        // {
        //     question: "Может ли PT NAD находить атаки в шифрованном трафике?",
        //     answers: [
        //         { text: "Да, при помощи поиска аномалий и сигнатурного анализа", correct: true },
        //         { text: "Нет, так как PT NAD не может расшифровывать трафик", correct: false }
        //     ]
        // },
        // {
        //     question: "Можно ли сохранять поисковые фильтры?",
        //     answers: [
        //         { text: "Да", correct: true },
        //         { text: "Нет", correct: false }
        //     ]
        // }
    ],

    questions2: [
        {
            question: "Сколько антивирусов доступно «из коробки» в PT Sandbox?",
            answers: [
                { text: "2", correct: false },
                { text: "3", correct: true },
                { text: "4", correct: false }
            ]
        },
        // {
        //     question: "Как называются техники, которые противодействуют обнаружению виртуальной среды?",
        //     answers: [
        //         { text: "Anti-gravitation", correct: false },
        //         { text: "Anti-evasion", correct: true },
        //         { text: "Anti-DDoS", correct: false },
        //         { text: "Anti-APT", correct: false }
        //     ]
        // },
        // {
        //     question: "Как называется вредоносная программа, которая может «возрождаться» как феникс после удаления и перезагрузки ОС? Кстати, PT Sandbox может ловить такое ВПО ",
        //     answers: [
        //         { text: "Буткит", correct: false },
        //         { text: "Шифровальщик", correct: false },
        //         { text: "Руткит", correct: true },
        //         { text: "Вайпер", correct: false }
        //     ]
        // },
        // {
        //     question: "Сколько виртуальных машин на одной ноде будет доступно в PT Sandbox версии 5.15?",
        //     answers: [
        //         { text: "15", correct: false },
        //         { text: "20", correct: false },
        //         { text: "30", correct: true },
        //         { text: "40", correct: false }
        //     ]
        // },
        // {
        //     question: "На каких уровнях PT Sandbox обнаруживает ВПО?",
        //     answers: [
        //         { text: "Гипервизор", correct: false },
        //         { text: "Виртуальная машина", correct: false },
        //         { text: "Ядро ОС", correct: false },
        //         { text: "Все перечисленные", correct: true }
        //     ]
        // },
        // {
        //     question: "По каким протоколам PT Sandbox интегрируется с другими системами ИБ и ИТ?",
        //     answers: [
        //         { text: "API", correct: false },
        //         { text: "ICAP", correct: false },
        //         { text: "Оба", correct: true }
        //     ]
        // },
        // {
        //     question: "Как часто выходят обновления PT Sandbox?",
        //     answers: [
        //         { text: "Раз в месяц", correct: true },
        //         { text: "Раз в квартал", correct: false },
        //         { text: "Раз в полгода", correct: false },
        //         { text: "Раз в год", correct: false }
        //     ]
        // },

        // {
        //     question: "Какие возможности по снижению нагрузки на поведенческий анализ есть в PT Sandbox?",
        //     answers: [
        //         { text: "Дополнительный антивирус", correct: false },
        //         { text: "Настройки предварительной фильтрации", correct: true },
        //         { text: "Ручная проверка файлов", correct: false }
        //     ]
        // },
        // {
        //     question: "Для каких целей используются технологии машинного обучения в PT Sandbox?",
        //     answers: [
        //         { text: "Для улучшения качества обнаружения", correct: true },
        //         { text: "Для проверки по хеш-суммам", correct: false },
        //         { text: "Для «галочки»", correct: false }
        //     ]
        // },
        // {
        //     question: "Какое ограничение по объему принимаемых объектов есть у инсталляции PT Sandbox",
        //     answers: [
        //         { text: "Не более 10 000 в час", correct: false },
        //         { text: "Не более 100 000 в час", correct: false },
        //         { text: "Нет ограничения благодаря возможности горизонтального масштабирования", correct: true }
        //     ]
        // }
    ],

    questions3: [
        {
            question: "При помощи какого механизма осуществляется интеграция PT NAD и PT Sandbox?",
            answers: [
                { text: "API", correct: false },
                { text: "ICAP", correct: true }
            ]
        },
        // {
        //     question: "Как можно отслеживать вердикты, получаемые от PT Sandbox?",
        //     answers: [
        //         { text: "При помощи построения дашбордов", correct: false },
        //         { text: "При помощи поиска по ключевому слову rpt.verdict", correct: false },
        //         { text: "Оба варианта верны", correct: true }
        //     ]
        // },
        // {
        //     question: "Умеет ли PT Anti-APT анализировать шифрованный трафик?",
        //     answers: [
        //         { text: "Нет", correct: false },
        //         { text: "Да, весь трафик", correct: false },
        //         { text: "Да, только тот, который генерирует ВПО в процессе анализа в Sandbox", correct: true }
        //     ]
        // },
        // {
        //     question: "Назовите основные задачи PT AntiAPT",
        //     answers: [
        //         { text: "Сокращение времени скрытого присутствия злоумышленника в сети", correct: false },
        //         { text: "Выявление атаки по большому числу признаков", correct: false },
        //         { text: "Защита от новейших угроз", correct: false },
        //         { text: "Все перечисленное", correct: true }
        //     ]
        // },
        // {
        //     question: "Из каких основных компонентов состоит решение PT Anti-APT?",
        //     answers: [
        //         { text: "MaxPatrol SIEM, PT NAD, PT Sandbox", correct: false },
        //         { text: "PT NAD, PT Sandbox", correct: true },
        //         { text: "PT NAD, PT Sandbox, PT Threat Analyzer", correct: false },
        //         { text: "PT NAD, MaxPatrol SIEM", correct: false }
        //     ]
        // },
    ],
    
};

let getScaledDimensions = (originalWidth, originalHeight, targetWidth) => {
    const aspectRatio = originalWidth / originalHeight;
    const newWidth = targetWidth;
    const newHeight = newWidth / aspectRatio;
    return { newWidth, newHeight };
}

let calculateLines = (canvasWidth) => {
    const leftLine = canvasWidth * 0.15;  
    const centerLine = canvasWidth * 0.5; 
    const rightLine = canvasWidth * 0.85;
    return [leftLine, centerLine, rightLine];
};

let generateUniqueCode = (userId) => {
    if (typeof userId !== 'number') {
        throw new Error('Должен быть числом');
    }

    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const code = `pt${userId}${randomNumber}`;

    return code;
}

class Bubble {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.random() * 2 + 1;
	    this.dy = Math.random() * 7 + 15;

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

        this.maxBubbleSize = 200;
        this.minBubbleSize = 100;

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
        let x = Math.floor(Math.random() * (this.canvas.width)) - 200;
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
            // console.log(this.bubbles);
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

// modules end

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PLAYER_WIDTH = 140;
const PLAYER_HEIGHT = 140;
let LINES_X = calculateLines(canvas.width);
let playerX = LINES_X[1];
let playerY = canvas.height - PLAYER_HEIGHT;
let isPlayerTransparent = false; 
let gameStarted = false;
let playerYStartPosition; 
let playerYTargetPosition; 
let playerYPosition;
let playerSpeed = 5;

let playerLives = 3;

let elements = []; 
let timeUntilNextElement = 100;

let npcImages = gameConfig.npcImages;
let npcImages2 = gameConfig.npcImages2;
let enemies = gameConfig.enemies;
let enemies2 = gameConfig.enemies2;
let enemies3 = gameConfig.enemies3;

let lastSharkHitTime = 0;
const hitCooldown = 2000; 
let currentGameLevel = 0;
const bubble = new BubbleContainer();
let isEnd = false;
let gamePaused = false;
let askedQuestions = [];
let correctAnswersCount = 0;
let sumAnswersCount  = 0;
let isFinal = false;

let totalPoints = 0;
let enemiesKilled = 0; //upd
let pointsByLevels = []; // upd
let killedByLevels = []; // upd
let levelCompleted = false; 
let allAnswersCorrect = false;

const checkpointPerLevel = [gameConfig.questions1.length, gameConfig.questions2.length, gameConfig.questions3.length];
let currentLevel = 0;
let checkpoint = 1;

const player = {
    x: playerX,
    y: playerY,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    draw() {
           
        const playerImage = new Image();

        if(currentLevel == 1) {
            playerImage.src = this.isAttacking ? './assets/player2.png' : './assets/player2.png';
        }
        else if(currentLevel == 2) {
            playerImage.src = this.isAttacking ? './assets/player3.png' : './assets/player3.png';
        }
        else {
            playerImage.src = this.isAttacking ? './assets/player1-active.png' : './assets/player1.png';
        }

        const imgWidth = playerImage.naturalWidth;  
        const imgHeight = playerImage.naturalHeight;

        const aspectRatio = imgWidth / imgHeight;
        const newWidth = PLAYER_WIDTH - 60;
        const newHeight = newWidth / aspectRatio;

        ctx.drawImage(playerImage, this.x - newWidth / 2, this.y, newWidth, newHeight);

        if (this.isAttacking) {
            const effectImage = new Image();

            let effectWidth = 140; 
            let effectHeight = 80;

            if (currentLevel == 1) {
                effectImage.src = './assets/radio.svg';
                effectWidth = 140;
                effectHeight = 80;
                ctx.drawImage(effectImage, this.x - effectWidth / 2, this.y - effectHeight + 10, effectWidth, effectHeight);
            } else if (currentLevel == 2) {
                effectImage.src = './assets/arrw.svg'; 
                effectWidth = 32;
                effectHeight = 84;
                ctx.drawImage(effectImage, this.x - effectWidth / 2, this.y - effectHeight, effectWidth, effectHeight);
            }
            
        }

    }
};


function createRandomElement() {

    const randomValue = Math.random();
    let type;

    if (randomValue <  0.08) {
        type = 2; // Question
    } else if (randomValue < 0.7) {
        type = 0; // NPC
    } else {
        type = 1; // Enemy
    }

    const line = Math.floor(Math.random() * LINES_X.length);
    const x = LINES_X[line];
    const y = -40;

    
    let element = {
        x: x,
        y: y,
        width: PLAYER_WIDTH / 2,
        height: PLAYER_HEIGHT / 2,
        speed: 2 + Math.random() * 2,
        type: type,
        img: null,
        // amplitude: 5,
        // period: 0.05,
        amplitude: 2,
        period: 0.005,
        time: 0, 

        draw() {
             if (this.img) {
                const { newWidth, newHeight } = getScaledDimensions(this.img.naturalWidth, this.img.naturalHeight, this.width);
                ctx.drawImage(this.img, this.x - newWidth / 2, this.y, newWidth, newHeight);
            }
        },
        update() {
            this.y += this.speed;

  
            if (this.type === 1) {
                // this.x += this.amplitude * Math.sin(this.y * this.period);

                this.time += 0.1;
                this.x += this.amplitude * Math.sin(this.time);
            
            } 

        }
    };

    

    setElementImage(type, correctAnswersCount, element);

    elements.push(element);
}

async function postResource(url, data) {
    if(typeof data.tg_id === 'number') {
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
                console.log(error);
            }); 
        } catch(e) {    }
    } else {
        console.log("scss");
    }
}

function setElementImage(type, correctAnswers, element) {

    const isMid = currentLevel == 1;
    const isHigh = currentLevel == 2;

    let imageSource;
    
    switch (type) {
        case 0: // NPC
            if (isHigh) {
                imageSource = npcImages[Math.floor(Math.random() * npcImages.length)];
            } else if (isMid) {
                imageSource = npcImages2[Math.floor(Math.random() * npcImages2.length)];
            } else {
                imageSource = npcImages[Math.floor(Math.random() * npcImages.length)];
            }
            break;
        case 1: // Enemy
            if (isHigh) {
                imageSource = enemies3[Math.floor(Math.random() * enemies3.length)].img;
            } else if (isMid) {
                imageSource = enemies2[Math.floor(Math.random() * enemies2.length)].img;
            } else {
                imageSource = enemies[Math.floor(Math.random() * enemies.length)].img;
            }
            break;
        case 2: // Question
            imageSource = './assets/box.png';
            break;
    }

    element.img = new Image();
    element.img.src = imageSource;

}

function checkCollision(player, element) {

    const tolerance = 10;

    if (Math.abs(player.x - element.x) > tolerance) {
        return false;
    }

    return (
        player.x < element.x + element.width / 2 &&
        player.x + player.width > element.x - element.width / 2 &&
        player.y < element.y + element.height &&
        player.y + player.height > element.y
    );

}

async function finalAnimation() {

    document.querySelector(".fade").style.opacity = 1;
    document.querySelector(".fade").style.zIndex = 2000;
    document.querySelector(".fade").style.display = "block";

    bubble.moveBubble(); 
    await bubble.waitBubblesEnd(() => {
        setFinishModal();
    });

}

function createModal(modalObj) {
    const {
        className, 
        buttonExit, 
        bgImage, 
        onButtonClick, 
        callback, 
        slides
    } = modalObj;

    let currentSlide = 0;
    let isClicked = false;


    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.classList.add(className);
    
    function renderSlide() {

        const {title, content, buttonId, buttonText} = slides[currentSlide];
        modal.innerHTML = `
            <img src="./assets/logo.svg" class="logo">
            ${className == "question" ? `<div class="modal-content question-modal">` : `<div class="modal-content ${bgImage ? 'finish-modal' : 'start-modal'}">`}
                ${className == "question" ? `<p class="">${title}</p>` : `<p class="${bgImage ? 'finish-title' : 'title'}">${title}</p>`}
                <div class="preview-wrapper">
                    ${content}
                </div>
                ${buttonText ? `<button id="${buttonId}" class="red-btn">${buttonText}</button>`:  ''}
                ${buttonExit ? '<button id="exit" class="dark-btn">Выйти</button>' : ''}
            </div>
            ${bgImage ? `<img src="./assets/${bgImage}.png" class="bg-modal">` : ''}
        `;

        document.querySelector(".fade").style.opacity = "1";
        document.querySelector(".fade").prepend(modal);

        let answerIndex;

        try {
            document.querySelectorAll(`.answer-item`).forEach(el => {
                el.addEventListener('click', () => {
                    answerIndex = el.getAttribute("data-index");
                    // handleAnswer(index);
                    isClicked = false;

                });
            })
        } catch(e) {}

        try {
            document.querySelector(`#${buttonId}`).addEventListener('click', () => {
                if (currentSlide < slides.length - 1) {
                    currentSlide++;

                    renderSlide();
                } else {
                    if (onButtonClick && !isClicked) {
                
                        if(buttonId == "check") {
                            if(answerIndex) handleAnswer(answerIndex);
                            isClicked = true;
                        } else {
                            onButtonClick(modal);
                            isClicked = true;
                        }

                    }
                }
            });
        } catch(e) {}

        try {
            document.querySelector(`#exit`).addEventListener('click', () => {
                bot.close();
            });
        } catch(e) {}

        if(callback) {
            callback();
        }
    }
    

    renderSlide();
    
}

async function handleAnswer(answerIndex) { 
    const lastQuestion = askedQuestions[askedQuestions.length - 1];
    const selectedAnswer = lastQuestion.answers[answerIndex];
    const answerElements = document.querySelectorAll('.answer-item');

    answerElements.forEach(el => el.classList.remove('correct', 'incorrect'));
    
    sumAnswersCount++;

    if(selectedAnswer.correct) {
        correctAnswersCount++;

        document.querySelector(".pt-question .text").textContent = totalPoints;
        const checkpoint = checkpointPerLevel[currentLevel]; 
        

        if(sumAnswersCount == checkpoint && currentLevel < 2) {
            currentLevel++;

            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(() => {
                setCheckpointModal(currentLevel);
            });

        } else if (currentLevel === 2 && sumAnswersCount == checkpoint) { 
            isFinal = true;
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(setFinishModal);
        }
        else {
            answerElements[answerIndex].classList.add('correct');

            document.querySelector("#check").textContent = "Плывем дальше";
            document.querySelector("#check").addEventListener("click", (e) => {
                resumeGame();
                document.querySelector('.modal')?.remove();
                document.querySelector(".fade").style.display = "none";
            });

        }

    } else {

        const checkpoint = checkpointPerLevel[currentLevel]; 

        if(sumAnswersCount == checkpoint && currentLevel < 2) {
            currentLevel++;

            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(() => {
                setCheckpointModal(currentLevel);
            });

        } else if (currentLevel === 2 && sumAnswersCount == checkpoint) { 
            isFinal = true;
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(setFinishModal);
        } else {


            const correctAnswerIndex = lastQuestion.answers.findIndex(answer => answer.correct);
            answerElements[correctAnswerIndex].classList.add('correct');

            document.querySelector("#check").textContent = "Плывем дальше";
            document.querySelector("#check").addEventListener("click", (e) => {
                resumeGame();
                document.querySelector('.modal')?.remove();
                document.querySelector(".fade").style.display = "none";
            });
        }

    
    }
}

function getRandomQuestion() {
    
    const checkpoint = checkpointPerLevel[currentLevel]; 

    let availableQuestions = gameConfig.questions1.filter(q => !askedQuestions.includes(q));


    if (currentLevel == 1) {
        availableQuestions = gameConfig.questions2.filter(q => !askedQuestions.includes(q));
    } else if (currentLevel == 2) {
        availableQuestions = gameConfig.questions3.filter(q => !askedQuestions.includes(q));
    } 

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];

    askedQuestions.push(question);
    
    return question;
}

function setQuestionModal(question) {

    if(question) {
        createModal({
            className: "question",
            buttonExit: false,
            bgImage: "", 
            onButtonClick: () => {},
            callback: () => {},
            slides: [
                {
                    title: `${question.question}`,
                    content: `
                        <ul>
                            ${question.answers.map((answer, index) => `
                                <li>
                                    <label for="answer-${index}" class="answer-item" data-index="${index}">
                                        <input type="radio" name="radio" id="answer-${index}">
                                        <span>${answer.text}</span>
                                    </label>
                                </li>
                            `).join('')}
                        </ul>
                    `,
                    buttonId: "check",
                    buttonText: "Ответить"
                },
            ]
        }, handleAnswer);
    }

}

function setCheckpointModal(point) {

    const checkpointTitle = {
        [1]: "Уровень 2 <br/> PT Sandbox",
        [2]: "Уровень 3 <br/> PT NAD + PT Sandbox <br/> (PT Anti-APT)",
    };

    const checkpointMessages = {
        [1]: "<p class='preview'>На нашего дайвера валится куча посланий в бутылках — в некоторых из них прячутся зловреды. Уничтожай «злые» бутылки эхолокатором и лови сундучки с вопросами. <br/><br/> Будь осторожен — у тебя только три жизни.</p>",
        [2]: "<p class='preview'>Акулы-хакеры решили погубить нашего дайвера — здесь нужна тяжелая артиллерия. Уничтожай акул специальным ружьем и не забывай ловить вопросы. <br/><br/> У тебя по-прежнему три жизни.</p>",
    };

    const title = checkpointTitle[point] || "";
    const message = checkpointMessages[point] || "";

    createModal({
        className: "start-modal",
        buttonExit: false,
        bgImage: "",
        onButtonClick: async (modal) => {
            bubble.moveBubble(); 
            if(correctAnswersCount === sumAnswersCount) {
                allAnswersCorrect = true;
            } else {
                allAnswersCorrect = false;
            }
            levelCompleted = true;
            updateScore();
            killedByLevels.push(enemiesKilled); // upd
            enemiesKilled = 0; // upd
            document.querySelector(".pt-question .text").textContent = totalPoints;
            document.querySelector(".enemies .text").textContent = 0; //upd
            sumAnswersCount = 0;
            correctAnswersCount = 0;
            playerLives = 3;
            await bubble.waitBubblesEnd(resumeGame);
            document.querySelector('.modal')?.remove();
            document.querySelector(".fade").style.displgitay = "none";
        },
        callback: () => {},
        slides: [
            {
                title: title,
                content: message,
                buttonId: "play-again",
                buttonText: "ПОПЛЫЛИ"
            }
        ]
    });
}

function setFinishModal() {
    if(correctAnswersCount === sumAnswersCount) {
        allAnswersCorrect = true;
    } else {
        allAnswersCorrect = false;
    }
    levelCompleted = true;
    updateScore(); 
    killedByLevels.push(enemiesKilled); // upd

    let uniqueCode = localStorage.getItem('uid') ? generateUniqueCode(parseInt(localStorage.getItem('uid'))) : generateUniqueCode(Math.floor(Math.random() * 100));

    postResource(gameConfig.url, {
        tg_id: parseInt(localStorage.getItem('uid')),
        result: pointsByLevels, // upd
        killed: killedByLevels, // upd
        code: uniqueCode 
    });

    createModal({
        className: "final",
        buttonExit: true,
        bgImage: isFinal ? "sccss" : "lse",
        onButtonClick: async (modal) => {
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(() => {
                resetGame();
                resumeGame();
            });
            document.querySelector('.modal')?.remove();
            document.querySelector(".fade").style.display = "none";
        },
        callback: () => {},
        slides: [
            {
                title: isFinal ? "Победа!" : `Проигрыш`,
                content: isFinal ? `<p class="finish-text">Ты настоящий эксперт в сетевой безопасности. Твой сертификат уже лежит в меню чат-бота —  покажи его на стойке выдачи мерча, чтобы забрать приз</p><br/><p class="code">${uniqueCode}</p>` : `<p class="finish-text">Жаль, у тебя закончились жизни. Попробуй еще раз через 10 минут, а пока послушай доклады!</p>`,
            }
        ]
    });
}

function setResultModal(win) {
    win ? console.log('Равно или выше 2049') : console.log('Сумма меньше 2409. Попробуйте снова');
    if(win) {
        isFinal = true;
    }
    pauseGame();
    finalAnimation();
}

function updateScore() {

    // upd

    if(levelCompleted && allAnswersCorrect) {
        totalPoints += 5;
        pointsByLevels.push(5);
    } else if(levelCompleted) {
        totalPoints += 3;
        pointsByLevels.push(3);
    }

    // upd

    // if (levelCompleted) {
    //     totalPoints += 3;

    //     if (allAnswersCorrect) {
    //         totalPoints += 2;
    //     }
    // }
}

function setStartModal() {

    createModal({
        className: "start",
        buttonExit: false,
        bgImage: "", 
        onButtonClick: async (modal) => {
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd();
            updateGame();
            document.querySelector('.modal')?.remove();
            document.querySelector(".fade").style.display = "none";
            document.querySelector(".game__status-bar").classList.add("active");
            document.querySelectorAll(".arrow").forEach(el => el.classList.add("active")); // upd
        },
        callback: () => {},
        slides: [
            {
                title: "Играем!",
                // content: "<p class='preview'>Тебе нужно пройти 3 уровня — уничтожай угрозы, лови сундучки с вопросами и отвечай на них. Подробнее о правилах читай в описании бота. <br/><br/> Чтобы уничтожить угрозу, перемести дайвера в один ряд с ней и нажми красную кнопку. <br/><br/> Чтобы поймать сундучок с вопросом перемести дайвера в соответствующий ряд. <br/><br/> У тебя 3 жизни. </p>",
                content: `<p class='preview'>Чтобы уничтожить угрозу, перемести дайвера в один ряд с ней и нажми красную кнопку. <br/><br/> Чтобы поймать сундучок с вопросом перемести дайвера в соответствующий ряд.
                        <br/><br/>
                        Подробнее о правилах и призах читай в описании бота.
                        <br/><br/>
                        Три уровня, три жизни на каждом.</p>`,
                buttonId: "next1",
                buttonText: "Далее"
            },
            {
                title: "Уровень 1 <br/> PT NAD",
                content: "<p class='preview'>Коварный удильщик с подозрительным EXE-файлом хочет внедриться в сеть компании. В руках дайвера фонарик, свет которого поможет вывести злоумышленника на чистую воду.</p>",
                buttonId: "startGame",
                buttonText: "Поплыли"
            }
        ]
    });


}

function pauseGame() {
    gamePaused = true;
}

function resumeGame() {
    gamePaused = false;
    elements = [];
    updateGame();
}

function updateGame() {
    if (gamePaused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isPlayerTransparent) {
        ctx.globalAlpha = 0.5; 
    } else {
        ctx.globalAlpha = 1; 
    }

    if (!gameStarted && playerYPosition > playerYTargetPosition) {
        playerYPosition -= playerSpeed;
    } else {
        gameStarted = true;
    }

    player.y = playerYPosition;

    highlightLine();

    player.draw();

    ctx.globalAlpha = 1;

    elements.forEach((element, index) => {
        element.update();
        element.draw();

        if (checkCollision(player, element)) {
            const currentTime = Date.now();
            if (element.type === 1) {
     
                if (playerLives <= 0 && !isEnd) {
                    setResultModal();
                    isEnd = true;
                }

                if (currentTime - lastSharkHitTime >= hitCooldown) {
                    playerLives--;
                    isPlayerTransparent = true;
                    setTimeout(() => {
                        isPlayerTransparent = false;
                    }, hitCooldown);

                    lastSharkHitTime = currentTime;
                }

            } 
            else if (element.type === 2) { // Question
                document.querySelector(".fade").style.display = "block";
                pauseGame();
                const question = getRandomQuestion(askedQuestions, correctAnswersCount, checkpoint);
                setQuestionModal(question);
                elements.splice(index, 1);
            }
        }

        if (element.y > canvas.height) {
            elements.splice(index, 1);
            if (element.type === 1) { 
                lastSharkHitTime = 0; 
            }
        }
    });


     if (timeUntilNextElement <= 0) {
        createRandomElement();
        timeUntilNextElement = 50;
    } else {
        timeUntilNextElement--;
    }

    document.querySelector(".gamer-hp").textContent = playerLives;    

    requestAnimationFrame(updateGame);
}

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    playerYStartPosition = canvas.height; 
    playerYTargetPosition = canvas.height - PLAYER_HEIGHT - 80; 
    playerYPosition = playerYStartPosition; 

    LINES_X = calculateLines(canvas.width);
    player.x = LINES_X[1];

    if (gameStarted) {
        player.y = playerYTargetPosition;
    }
}

function resetGame() {
    playerLives = 3;
    elements = [];
    player.x = LINES_X[1];
    isEnd = false;
    gamePaused = false;
    askedQuestions = [];
    correctAnswersCount = 0;
    isFinal = false;
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' && player.x > LINES_X[0]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) - 1];
    } else if (event.code === 'ArrowRight' && player.x < LINES_X[LINES_X.length - 1]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) + 1];
    }
});

canvas.addEventListener('touchstart', (event) => {
    const rect = canvas.getBoundingClientRect();
    const touchX = event.touches[0].clientX - rect.left;

    if (touchX < canvas.width / 2 && player.x > LINES_X[0]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) - 1];
    } 
    else if (touchX >= canvas.width / 2 && player.x < LINES_X[LINES_X.length - 1]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) + 1];
    }
});

function attack() {
    let closestElement = null;
    let minDistance = Infinity; 
    const tolerance = 50;
    

    elements.forEach((element, index) => {
        if (element.type == 1 && Math.abs(element.x - player.x) <= tolerance) { 
            const distance = Math.abs(element.y - player.y);

            if (distance < minDistance) {
                minDistance = distance;
                closestElement = index;
            }
        }
    });

    if (navigator.vibrate) {
        navigator.vibrate(200);
    }

    if (closestElement !== null) {
        elements.splice(closestElement, 1);

        enemiesKilled++; //upd

        player.isAttacking = true;

        document.querySelector(".enemies .text").textContent = enemiesKilled; //upd

        setTimeout(() => {
            player.isAttacking = false;
        }, 1000);
    }

}

function highlightLine() {
    const playerLineIndex = LINES_X.indexOf(player.x);

    if (playerLineIndex !== -1) {
        const lineX = LINES_X[playerLineIndex];
        const lineWidth = PLAYER_WIDTH; 

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

        gradient.addColorStop(0, 'rgba(44, 81, 148, 0)'); 
        gradient.addColorStop(0.3, 'rgba(77, 140, 255, 0.005)'); 
        gradient.addColorStop(0.5033, 'rgba(77, 140, 255, 0.005)'); 
        gradient.addColorStop(0.8, 'rgba(44, 81, 148, 0.25)'); 
        gradient.addColorStop(1, 'rgba(44, 81, 148, 0.25)');

        ctx.fillStyle = gradient;
        ctx.fillRect(lineX - lineWidth / 2, 0, lineWidth, canvas.height);

        const borderGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        borderGradient.addColorStop(0.2, 'rgba(77, 140, 255, 0.0)');
        borderGradient.addColorStop(0.8, 'rgba(77, 140, 255, 0.25)');

        ctx.fillStyle = borderGradient;
        ctx.fillRect(lineX - lineWidth / 2 - 2, 0, 2, canvas.height);
        ctx.fillRect(lineX + lineWidth / 2, 0, 2, canvas.height); 
    }
}

attackButton.addEventListener('click', attack);

window.onload = resizeCanvas;
window.onresize = resizeCanvas;
setStartModal();
// isFinal = true;
// setFinishModal();
bubble.setBubbleArr();
