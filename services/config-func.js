let calcPointNum = (min, value, minSpeed, maxSpeed) => {

    const sec = min * 60;
    const dur = (minSpeed + maxSpeed) / 2; 
    const perMinute = sec / dur;
    const total = perMinute * min;
    const poins = (value * 2) / total;

    return poins;

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