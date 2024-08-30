import { calcPointNum, setFishesArrayToMidByWeight } from './config-func.js';

const gameConfig = {
    // среднее время игры
    gameAvarageTime: 3,
    // стандартная(начальная/максимальная) скорость движения
    gameDefaultEnemySpeed: 4,
    // минимальная скорость движения
    gameMinEnemySpeed: 1,
    // счет нужный для выигрыша
    gameScoreToWin: 2409,

    url: 'https://jsonplaceholder.typicode.com/posts/',

    // массивы вариаций рыб и врагов
    fishs: ["fish1", "fish2"],
    enemies: ["shark"],

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
    defaultDiverHP: 1,

    maxAvalibleSharkHP: 2,
    // очки за врага (если отключено динамическое вычисление)
    // pointsPerEnemy: 2409,

};

gameConfig.allFishes = [...gameConfig.fishs, ...gameConfig.enemies];

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