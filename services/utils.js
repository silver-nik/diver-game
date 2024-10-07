let getScaledDimensions = (originalWidth, originalHeight, targetWidth) => {
    const aspectRatio = originalWidth / originalHeight;
    const newWidth = targetWidth;
    const newHeight = newWidth / aspectRatio;
    return { newWidth, newHeight };
}

let calculateLines = (canvasWidth) => {
    const leftLine = canvasWidth * 0.25;  
    const centerLine = canvasWidth * 0.5; 
    const rightLine = canvasWidth * 0.75;
    return [leftLine, centerLine, rightLine];
};

export { getScaledDimensions, calculateLines }