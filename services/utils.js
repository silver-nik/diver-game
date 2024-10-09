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

export { getScaledDimensions, calculateLines ,generateUniqueCode }