import { gameConfig } from './services/config.js';
import { getPlayerCenter, getRandomInt } from './services/utils.js';
import BubbleContainer from './modules/canvas-bubble.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const PLAYER_WIDTH = 140;
const PLAYER_HEIGHT = 140;
// const LINES_X = [80, 200, 300]; // три линии
let LINES_X = calculateLines(canvas.width);
let playerX = LINES_X[1]; // игрок начинает в центре
let playerY = canvas.height - PLAYER_HEIGHT; // игрок на нижней позиции
let playerLives = 3;

let elements = []; // массив для элементов (NPC, враги, специальные элементы)
let timeUntilNextElement = 100; // время до появления следующего элемента (счётчик)
let isPlayerTransparent = false; // Флаг для отслеживания прозрачности игрока


let npcImages = ['./assets/npc.png', './assets/npc-2.png', './assets/npc-3.png', './assets/npc-6.png', './assets/npc-7.png', './assets/npc-8.png', './assets/npc-9.png'];
let npcImages2 = ['./assets/icons8-фонарь-80.png'];

let enemies = [
    {
        img: './assets/shark.png',
        hp: 1,
    },
    {
        img: './assets/shark-mid.png',
        hp: 2,
    },
    {
        img: './assets/shark-big.png',
        hp: 3,
    }
];

let lastSharkHitTime = 0; // Время последнего столкновения с акулой
const hitCooldown = 2000; // Время в миллисекундах, в течение которого игнорируем столкновения
let currentGameLevel = 0;

function getScaledDimensions(originalWidth, originalHeight, targetWidth) {
    const aspectRatio = originalWidth / originalHeight;
    const newWidth = targetWidth;
    const newHeight = newWidth / aspectRatio;
    return { newWidth, newHeight };
}

function calculateLines(canvasWidth) {
    const leftLine = canvasWidth * 0.25;  // 25% от ширины
    const centerLine = canvasWidth * 0.5; // 50% от ширины
    const rightLine = canvasWidth * 0.75; // 75% от ширины
    return [leftLine, centerLine, rightLine];
};

const bubble = new BubbleContainer();
let isEnd = false;
let gamePaused = false;
let askedQuestions = [];
let correctAnswersCount = 0;
let isFinal = false;
let checkpoint = 2;


// Создаем объект игрока
const player = {
    x: playerX,
    y: playerY,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    draw() {
        
        const playerImage = new Image();
        playerImage.src = this.isAttacking ? './assets/diver-action.png' : './assets/diver.png';

        const imgWidth = playerImage.naturalWidth;  // Исходная ширина изображения
        const imgHeight = playerImage.naturalHeight; // Исходная высота изображения

        const aspectRatio = imgWidth / imgHeight;
        const newWidth = PLAYER_WIDTH;
        const newHeight = newWidth / aspectRatio;

        // Отрисовка изображения
        ctx.drawImage(playerImage, this.x - newWidth / 2, this.y, newWidth, newHeight);

    }
};


// Функция для создания случайного элемента
function createRandomElement() {
    // const type = Math.floor(Math.random() * 3); // 0 - NPC, 1 - Враг, 2 - Специальный элемент

    const randomValue = Math.random();
    let type;

    if (randomValue <  0.03) {
        type = 2; // Специальный элемент
    } else if (randomValue < 0.7) {
        type = 0; // NPC
    } else {
        type = 1; // Враг
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
        type: type, // 0 - NPC, 1 - Враг, 2 - Специальный элемент
        img: null,

        draw() {
             if (this.img) {
                const { newWidth, newHeight } = getScaledDimensions(this.img.naturalWidth, this.img.naturalHeight, this.width);
                ctx.drawImage(this.img, this.x - newWidth / 2, this.y, newWidth, newHeight);
                // ctx.drawImage(this.img, this.x - this.width / 2, this.y, this.img.naturalWidth, this.img.naturalWidth);
            }
        },
        update() {
            this.y += this.speed;
        }
    };

    // Пример вызова функции
    setElementImage(type, correctAnswersCount, element);

    elements.push(element);
}

// Функция для установки изображений
function setElementImage(type, correctAnswers, element) {
    // if (correctAnswers >= 8 && correctAnswers < 16) {
    //     // Если правильных ответов от 8 до 15, используем специальное изображение
    //     element.img = new Image();
    //     element.img.src = './assets/special-8-15.png'; // Путь к изображению для диапазона 8-15 правильных ответов
    // } else if (correctAnswers >= 16) {
    //     // Если правильных ответов 16 или больше, используем другое изображение
    //     element.img = new Image();
    //     element.img.src = './assets/special-16-plus.png'; // Путь к изображению для 16+ правильных ответов
    // } else {

        // Назначаем изображение в зависимости от типа
        // if (type === 0) { // NPC

        //     let npcImagesByLevel = npcImages;

        //     if (correctAnswers >= checkpoint && correctAnswers < (checkpoint * 2)) {
        //         // Если правильных ответов от 8 до 15, используем специальное изображение
        //         npcImagesByLevel = npcImages2; // Путь к изображению для диапазона 8-15 правильных ответов
        //     } else if (correctAnswers >= (checkpoint * 2)) {
        //         // Если правильных ответов 16 или больше, используем другое изображение
        //         npcImagesByLevel = npcImages;
        //     }  else {
        //         npcImagesByLevel = npcImages;
        //     }


        //     const randomIndex = Math.floor(Math.random() * npcImagesByLevel.length);
        //     element.img = new Image();
        //     element.img.src = npcImagesByLevel[randomIndex];
        // } else if (type === 1) { // Враг

        //     let enemyImagesByLevel = enemies;


        //     if (correctAnswers >= checkpoint && correctAnswers < (checkpoint * 2)) {
        //         // Если правильных ответов от 8 до 15, используем специальное изображение
        //         enemyImagesByLevel = enemies; // Путь к изображению для диапазона 8-15 правильных ответов
        //     } else if (correctAnswers >= (checkpoint * 2)) {
        //         // Если правильных ответов 16 или больше, используем другое изображение
        //         enemyImagesByLevel = enemies;
        //     }  else {
        //         enemyImagesByLevel = enemies;
        //     }

        //     const randomIndex = Math.floor(Math.random() * enemyImagesByLevel.length);
        //     element.img = new Image();
        //     element.img.src = enemyImagesByLevel[randomIndex].img;
        // } else if (type === 2) { // Специальный элемент

        //     let specialImagesByLevel = './assets/question.png';

        //     if (correctAnswers >= checkpoint && correctAnswers < (checkpoint * 2)) {
        //         // Если правильных ответов от 8 до 15, используем специальное изображение
        //         specialImagesByLevel = './assets/question.png'; // Путь к изображению для диапазона 8-15 правильных ответов
        //     } else if (correctAnswers >= (checkpoint * 2)) {
        //         // Если правильных ответов 16 или больше, используем другое изображение
        //         specialImagesByLevel = './assets/question.png';
        //     }  else {
        //         specialImagesByLevel = './assets/question.png';
        //     }

        //     element.img = new Image();
        //     element.img.src = specialImagesByLevel;
        // }
    // }


    let imageSource;
    
    const isMidRange = correctAnswers >= checkpoint && correctAnswers < checkpoint * 2;
    const isHighRange = correctAnswers >= checkpoint * 2;
    
    switch (type) {
        case 0: // NPC
            const npcImagesByLevel = isMidRange ? npcImages2 : npcImages;
            imageSource = npcImagesByLevel[Math.floor(Math.random() * npcImagesByLevel.length)];
            break;
        case 1: // Враг
            const enemyImagesByLevel = enemies; // Изображения врагов одинаковы для всех уровней
            imageSource = enemyImagesByLevel[Math.floor(Math.random() * enemyImagesByLevel.length)].img;
            break;
        case 2: // Специальный элемент
            imageSource = './assets/question.png'; // Для специальных элементов изображение фиксировано
            break;
    }

    // Назначаем изображение для элемента
    element.img = new Image();
    element.img.src = imageSource;

}



// Функция для обработки столкновений
function checkCollision(player, element) {

    // Определяем текущую линию игрока
    const playerLineIndex = LINES_X.indexOf(player.x);
    const elementLineIndex = LINES_X.indexOf(element.x);

    // Проверяем, находятся ли игрок и элемент на одной линии
    if (playerLineIndex !== elementLineIndex) {
        return false; // Если не на одной линии, то нет столкновения
    }

    // Проверяем столкновения по X и Y
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
                if (onButtonClick) onButtonClick(modal);
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
            await bubble.waitBubblesEnd(setCheckpointModal);

        } else if (correctAnswersCount == (checkpoint * 3)) {

            isFinal = true;
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(setFinishModal);

        }
        else {
            console.log(`Это правильный ответ, это ${correctAnswersCount} правильный ответ`);

            setTimeout(() => {
                resumeGame();
                document.querySelector('.modal')?.remove();
            }, 1000);
        }


    } else {
        answerElements[answerIndex].classList.add('incorrect');

        const correctAnswerIndex = lastQuestion.answers.findIndex(answer => answer.correct);
        answerElements[correctAnswerIndex].classList.add('correct');

        const correctAnswer = lastQuestion.answers.find(answer => answer.correct);
        console.log(`Это неправильный ответ. Правильный ответ: ${correctAnswer.text}`);


        setTimeout(() => {
            resumeGame();
            document.querySelector('.modal')?.remove();
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
        console.log("Все вопросы заданы!");
        return null;
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
        });
    }

}

function setCheckpointModal() {
    createModal({
        className: "final",
        buttonExit: true,
        bgImage: "sccss",
        onButtonClick: async (modal) => {
            bubble.moveBubble(); 
            await bubble.waitBubblesEnd(resumeGame);
            playerLives = 3;
            document.querySelector('.modal')?.remove();
        },
        callback: () => {},
        slides: [
            {
                title: "Вы переходите на следующий уровень!",
                content: '<p class="finish-text">Теперь ты стал сильнее! Враги также увеличили свои силы. Удачи!</p>',
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

// Основная логика игры
function updateGame() {
    if (gamePaused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isPlayerTransparent) {
        ctx.globalAlpha = 0.5; // Прозрачность 50%
    } else {
        ctx.globalAlpha = 1; // Полная непрозрачность
    }

    // Обновляем и рисуем игрока
    player.draw();

    // Сброс глобальной прозрачности
    ctx.globalAlpha = 1;

    // Обновляем и рисуем элементы
    elements.forEach((element, index) => {
        element.update();
        element.draw();

        // Проверяем столкновения
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
            else if (element.type === 2) { // Специальный элемент
                pauseGame();
                const question = getRandomQuestion();
                setQuestionModal(question);
                elements.splice(index, 1);
            }
        }

        if (element.y > canvas.height) {
            elements.splice(index, 1);
            if (element.type === 1) { // Если это акула, сбрасываем время столкновения
                lastSharkHitTime = 0; // Сброс времени столкновения при удалении акулы
            }
        }
    });


     // Отсчет времени до появления нового элемента
     if (timeUntilNextElement <= 0) {
        createRandomElement();
        timeUntilNextElement = 70; // устанавливаем новый интервал для появления элемента
    } else {
        timeUntilNextElement--; // уменьшаем счётчик до появления следующего элемента
    }

     // Добавляем новые элементы
    //  if (Math.random() < 0.02) {
    //     createRandomElement();
    // }

    document.querySelector(".gamer-hp").textContent = playerLives;    

    requestAnimationFrame(updateGame);
}

// Устанавливаем ширину и высоту canvas, основываясь на его стиле
function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    player.y = canvas.height - PLAYER_HEIGHT - 120;
    LINES_X = calculateLines(canvas.width);
    player.x = LINES_X[1];
}

// Сбрасываем игру
function resetGame() {
    playerLives = 3;
    elements = [];
    player.x = LINES_X[1]; // Возвращаем игрока в центр
    document.querySelector(".text").textContent = 0;
    isEnd = false;
    gamePaused = false;
    askedQuestions = [];
    correctAnswersCount = 0;
    isFinal = false;
}

// Управление игроком
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' && player.x > LINES_X[0]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) - 1];
    } else if (event.code === 'ArrowRight' && player.x < LINES_X[LINES_X.length - 1]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) + 1];
    }
});

// Функция для обработки нажатий (тапов) на экран
canvas.addEventListener('touchstart', (event) => {
    const touchX = event.touches[0].clientX;

    // Если тап на левой половине экрана — перемещаем влево
    if (touchX < canvas.width / 2 && player.x > LINES_X[0]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) - 1];
    } 
    // Если тап на правой половине экрана — перемещаем вправо
    else if (touchX >= canvas.width / 2 && player.x < LINES_X[LINES_X.length - 1]) {
        player.x = LINES_X[LINES_X.indexOf(player.x) + 1];
    }
});

// Функция атаки
function attack() {
    let closestElement = null;
    let minDistance = Infinity; 

    elements.forEach((element, index) => {
        if (element.x === player.x && element.type == 1) { // Только врагов можно атаковать
            const distance = Math.abs(element.y - player.y);

            if (distance < minDistance) {
                minDistance = distance;
                closestElement = index;
            }
        }
    });

    // Удаляем ближайший элемент, если он найден
    if (closestElement !== null) {
        elements.splice(closestElement, 1);
    }

    // Устанавливаем состояние атаки
    player.isAttacking = true;

    // Возвращаем состояние после 1 секунды
    setTimeout(() => {
        player.isAttacking = false;
    }, 1000);
}

// Привязываем атаку к кнопке
attackButton.addEventListener('click', attack);

// Вызываем resizeCanvas при загрузке страницы
window.onload = resizeCanvas;
// Вызываем resizeCanvas при изменении размера окна
window.onresize = resizeCanvas;
// Запускаем игру
setStartModal();
// updateGame();
bubble.setBubbleArr();
