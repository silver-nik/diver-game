import { calcPointNum, setFishesArrayToMidByWeight } from './config-func.js';

const gameConfig = {
    // среднее время игры
    gameAvarageTime: 5,
    // стандартная(начальная/максимальная) скорость движения
    gameDefaultEnemySpeed: 4,
    // минимальная скорость движения
    gameMinEnemySpeed: 1,
    // счет нужный для выигрыша
    gameScoreToWin: 2409,

    url: 'https://jsonplaceholder.typicode.com/posts/', // endpoint https://ptgame.idurn.ru/save_game_result

    npcImages: ['./assets/npc.png', './assets/npc-2.png', './assets/npc-3.png', './assets/npc-4.png', './assets/npc-5.png', './assets/npc-6.png', './assets/npc-7.png', './assets/npc-8.png', './assets/npc-9.png'],
    increaseHpIcon: './assets/heart-icon.svg',
    decreaseHpIcon: './assets/heart-icon-lse.svg',

    enemies: [
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
    ],

    // массив рыб для центральной линии (формируется из fishesWeight)
    fishesToMiddle: [],
    // массив рыб для остальных линии (формируется из fishs и enemies)
    allFishes: [],

    // веса для рыб (чем больше вес тем больше вероятность появления)
    fishesWeight: {
        "fish1": 1,
        "fish2": 1,
        "shark": 7 
    },

    // зона дайвера
    bufferZone: 70,

    // начальные значения жизней
    defaultSharkHP: 1,
    defaultDiverHP: 3,

    maxAvalibleSharkHP: 3,
    // очки за врага (если отключено динамическое вычисление)
    // pointsPerEnemy: 2409,

};

// gameConfig.allFishes = [...gameConfig.fishs, ...gameConfig.enemies];

gameConfig.fishesToMiddle = setFishesArrayToMidByWeight(gameConfig.fishesWeight);

// закомментировать для фиксированных очков за рыбу
gameConfig.pointsPerEnemy = calcPointNum(
                                gameConfig.gameAvarageTime, 
                                gameConfig.gameDefaultEnemySpeed, 
                                gameConfig.fishesToMiddle, 
                                gameConfig.fishesWeight.shark,
                                gameConfig.gameScoreToWin
                            );

export { gameConfig };