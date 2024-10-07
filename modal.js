let createModal = (modalObj, questionFunc) => {
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
                    questionFunc(index);
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


export {
    createModal
}