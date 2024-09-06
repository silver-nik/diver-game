import { calcPointNum, setFishesArrayToMidByWeight } from './config-func.js';

const gameConfig = {
    gameAvarageTime: 2,
    gameMaxEnemySpeed: 6,
    gameMinEnemySpeed: 4,
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

    npcWeight: 5,
    defaultSharkHP: 1,
    defaultDiverHP: 3,

    maxAvalibleSharkHP: 3,

    // очки за врага (если отключено динамическое вычисление)
    // pointsPerEnemy: 2409,

};

// закомментировать для фиксированных очков за врага
gameConfig.pointsPerEnemy = calcPointNum(
                                gameConfig.gameAvarageTime, 
                                gameConfig.gameScoreToWin,
                                gameConfig.gameMinEnemySpeed,
                                gameConfig.gameMaxEnemySpeed
                            );

export { gameConfig };