let calcPointNum = (min, fishSpeed, fishArr, enemyWeight, value) => {
    // время игры из минут в секунды
    const sec = min * 60;
    // количество рыб за указанное время
    const enemySum = sec / fishSpeed;
    // вероятность появления акулы (сумма акул в массиве : общее количество элементов в массиве)
    const q = enemyWeight / fishArr.length;
    // количество акул в enemySum
    const s = enemySum * q; 
    
    const points = value / Math.round(s);

    return points;

}

let setFishesArrayToMidByWeight = (fishesWeights) => {
    let arr = [];

    for (const fish in fishesWeights) {
        for (let i = 0; i < fishesWeights[fish]; i++) {
            arr.push(fish);
        }
    }

    return arr;

}



export { calcPointNum, setFishesArrayToMidByWeight };