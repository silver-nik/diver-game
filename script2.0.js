import { gameConfig } from './services/config.js';
import { getScaledDimensions, calculateLines } from './services/utils.js';
import BubbleContainer from './modules/canvas-bubble.js';

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

let lastSharkHitTime = 0;
const hitCooldown = 2000; 
let currentGameLevel = 0;
const bubble = new BubbleContainer();
let isEnd = false;
let gamePaused = false;
let askedQuestions = [];
let correctAnswersCount = 0;
let isFinal = false;
let checkpoint = 2;


const player = {
    x: playerX,
    y: playerY,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    draw() {
        
        const playerImage = new Image();
        playerImage.src = this.isAttacking ? './assets/diver-action.png' : './assets/diver.png';

        const imgWidth = playerImage.naturalWidth;  
        const imgHeight = playerImage.naturalHeight;

        const aspectRatio = imgWidth / imgHeight;
        const newWidth = PLAYER_WIDTH;
        const newHeight = newWidth / aspectRatio;

        ctx.drawImage(playerImage, this.x - newWidth / 2, this.y, newWidth, newHeight);

    }
};


function createRandomElement() {

    const randomValue = Math.random();
    let type;

    console.log(randomValue);

    if (randomValue <  0.1) {
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

        draw() {
             if (this.img) {
                const { newWidth, newHeight } = getScaledDimensions(this.img.naturalWidth, this.img.naturalHeight, this.width);
                ctx.drawImage(this.img, this.x - newWidth / 2, this.y, newWidth, newHeight);
            }
        },
        update() {
            this.y += this.speed;
        }
    };

    setElementImage(type, correctAnswersCount, element);

    elements.push(element);
}

function setElementImage(type, correctAnswers, element) {

    let imageSource;
    
    const isMid = correctAnswers >= checkpoint && correctAnswers < checkpoint * 2;
    const isHigh = correctAnswers >= checkpoint * 2;
    
    switch (type) {
        case 0: // NPC
            const npcImagesByLevel = isMid ? npcImages2 : npcImages;
            imageSource = npcImagesByLevel[Math.floor(Math.random() * npcImagesByLevel.length)];
            break;
        case 1: // Enemy
            const enemyImagesByLevel = enemies; 
            imageSource = enemyImagesByLevel[Math.floor(Math.random() * enemyImagesByLevel.length)].img;
            break;
        case 2: // Qestion
            imageSource = './assets/question.png';
            break;
    }

    element.img = new Image();
    element.img.src = imageSource;

}

function checkCollision(player, element) {

    const playerLineIndex = LINES_X.indexOf(player.x);
    const elementLineIndex = LINES_X.indexOf(element.x);

    if (playerLineIndex !== elementLineIndex) {
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
            <div class="modal-content ${bgImage ? 'finish-modal' : 'start-modal'}">
                <p class="${bgImage ? 'finish-title' : 'title'}">${title}</p>
                ${content}
                ${buttonText ? `<button id="${buttonId}" class="red-btn">${buttonText}</button>`:  ''}
                ${buttonExit ? '<button id="exit" class="dark-btn">Выйти</button>' : ''}
            </div>
            ${bgImage ? `<img src="./assets/${bgImage}.png" class="bg-modal">` : ''}
        `;

        document.querySelector(".fade").style.opacity = "1";
        document.querySelector(".fade").prepend(modal);

        try {
            document.querySelectorAll(`.answer-item`).forEach(el => {
                el.addEventListener('click', () => {
                    const index = el.getAttribute("data-index");
                    handleAnswer(index);
                });
            })
        } catch(e) {}

        document.querySelector(`#${buttonId}`).addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;

                renderSlide();
            } else {
                if (onButtonClick && !isClicked) {
                    onButtonClick(modal);
                    isClicked = true;
                }
            }
        });

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
    
    if(selectedAnswer.correct) {
        correctAnswersCount++;
        document.querySelector(".text").textContent = correctAnswersCount;
        
        if(correctAnswersCount == checkpoint || correctAnswersCount == (checkpoint * 2)) {

            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(() => {
                setCheckpointModal(correctAnswersCount);
            });

        } else if (correctAnswersCount == (checkpoint * 3)) {

            isFinal = true;
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(setFinishModal);

        }
        else {
            console.log(`Это правильный ответ, это ${correctAnswersCount} правильный ответ`);
            answerElements[answerIndex].classList.add('correct');

            setTimeout(() => {
                resumeGame();
                document.querySelector('.modal')?.remove();
                document.querySelector(".fade").style.display = "none";
            }, 1000);
        }


    } else {
        setTimeout(() => {
            resumeGame();
            document.querySelector('.modal')?.remove();
            document.querySelector(".fade").style.display = "none";
        }, 1000);
    }
}

function getRandomQuestion() {
        
    let availableQuestions = gameConfig.questions1.filter(q => !askedQuestions.includes(q));

    if (correctAnswersCount >= checkpoint && correctAnswersCount < (checkpoint * 2)) {
        availableQuestions = gameConfig.questions2.filter(q => !askedQuestions.includes(q));
    } else if (correctAnswersCount >= (checkpoint * 2)) {
        availableQuestions = gameConfig.questions3.filter(q => !askedQuestions.includes(q));
    } 
    
    if (availableQuestions.length === 0) {

        askedQuestions = [];

        if (correctAnswersCount < checkpoint) {
            availableQuestions = gameConfig.questions1;
        } else if (correctAnswersCount >= checkpoint && correctAnswersCount < (checkpoint * 2)) {
            availableQuestions = gameConfig.questions2;
        } else if (correctAnswersCount >= (checkpoint * 2)) {
            availableQuestions = gameConfig.questions3;
        }
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
                                    <button class="answer-item" data-index="${index}">${answer.text}</button>
                                </li>
                            `).join('')}
                        </ul>
                    `,
                },
            ]
        }, handleAnswer);
    }

}

function setCheckpointModal(point) {

    const checkpointTitle = {
        [checkpoint]: "Вы прошли первый уровень!",
        [checkpoint * 2]: "Вы прошли второй уровень!",
    };

    const checkpointMessages = {
        [checkpoint]: "<p class='finish-text'>Теперь NPC фонари</p>",
        [checkpoint * 2]: "<p class='finish-text'>Теперь NPC снова рыбы</p>",
    };

    const title = checkpointTitle[point] || "";
    const message = checkpointMessages[point] || "";

    createModal({
        className: "final",
        buttonExit: true,
        bgImage: "sccss",
        onButtonClick: async (modal) => {
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(resumeGame);
            playerLives = 3;
            document.querySelector('.modal')?.remove();
            document.querySelector(".fade").style.display = "none";
        },
        callback: () => {},
        slides: [
            {
                title: title,
                content: message,
                buttonId: "play-again",
                buttonText: "Играть"
            }
        ]
    });
}

function setFinishModal() {
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
                title: isFinal ? "Победа!" : ``,
                content: isFinal ? `<p class="finish-text">Приходи на NetCase Day, чтобы побороться за приз и увидеть, как ловят сетевые угрозы PT Sandbox и PT NAD</p>` : "",
                buttonId: "play-again",
                buttonText: "Сыграть ещё раз"
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
        },
        callback: () => {},
        slides: [
            {
                title: "Общее",
                content: "<p class='preview'>Рассказываем, для чего играть.</p>",
                buttonId: "next1",
                buttonText: "Далее"
            },
            {
                title: "Механика игры",
                content: "<p class='preview'>Как стрелять, как двигаться по секторам.</p>",
                buttonId: "next2",
                buttonText: "Далее"
            },
            {
                title: "Ответы на вопросы",
                content: "<p class='preview'>Рассказываем для чего отвечать на вопросы, какой успешный результат уровня.</p>",
                buttonId: "startGame",
                buttonText: "Начать игру"
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

    player.draw();

    ctx.globalAlpha = 1;

    elements.forEach((element, index) => {
        element.update();
        element.draw();

        if (checkCollision(player, element)) {
            const currentTime = Date.now();
            if (element.type === 1) { // Враг
     
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
    playerYTargetPosition = canvas.height - PLAYER_HEIGHT - 120; 
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
    document.querySelector(".text").textContent = 0;
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
    const touchX = event.touches[0].clientX;

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

    elements.forEach((element, index) => {
        if (element.x === player.x && element.type == 1) { 
            const distance = Math.abs(element.y - player.y);

            if (distance < minDistance) {
                minDistance = distance;
                closestElement = index;
            }
        }
    });

    if (closestElement !== null) {
        elements.splice(closestElement, 1);
    }

    player.isAttacking = true;

    setTimeout(() => {
        player.isAttacking = false;
    }, 1000);
}

attackButton.addEventListener('click', attack);

window.onload = resizeCanvas;
window.onresize = resizeCanvas;
setStartModal();
bubble.setBubbleArr();
