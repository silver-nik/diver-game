let getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let getPlayerCenter = (player, canvas) => {
    const rect = player.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top + rect.height / 2
    };
}

let getRandomEnemyObj = (arr, imageObj, hp) => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const selectedEnemy = arr[randomIndex];

    imageObj.src = selectedEnemy.img;
    hp = selectedEnemy.hp;

    return { imageObj, hp }
}

export { getPlayerCenter, getRandomInt, getRandomEnemyObj }