import { gameConfig } from '../services/config.js';

class Fishes {
    constructor() {
        this.getElements();
        this.initConfigs();
    }

    getElements() {
        this.fishElements = document.querySelectorAll('.fish');
    }

    initConfigs() {
        this.defaultSharkHP = gameConfig.defaultSharkHP;
        this.fishs = gameConfig.allFishes;
    }

    setSharkModule(sharkModule) {  
        this.sharkModule = sharkModule;
    }

    updateFishSpeed(elapsed, map) {

        this.fishElements.forEach(el => {  
            const speed = map.get(el) / Math.exp(0.0001 * elapsed);
            el.style.animationDuration = speed > gameConfig.gameMinEnemySpeed ? `${speed}s` : `${gameConfig.gameMinEnemySpeed}s`;
        });
        
    }

    getRandomFish(el) {
        const fishesList = el.classList.contains("fish-middle") ? gameConfig.fishesToMiddle : gameConfig.fishs;
        return fishesList[Math.floor(Math.random() * fishesList.length)];
    }

    setFish(el) {
        const randomClassName = this.getRandomFish(el);
        this.clearFish(el);
        el.classList.add(randomClassName);
        el.style.visibility = "";
    
        if(el.classList.contains("fish-middle")) {
            el.style.animationDuration = `${gameConfig.gameDefaultEnemySpeed}s`;
            if(randomClassName == "shark") {
                this.sharkModule.updateSharkHealth();            
            } else {
                el.querySelector(".hp").textContent = "";
            }
        } else {
            el.style.animationDuration = `${gameConfig.gameDefaultEnemySpeed}s`;
            el.querySelector(".hp").textContent = "";
        }

    }

    clearFish(el) {
        this.fishs.forEach(fishClass => el.classList.remove(fishClass));
    }

    resetGame() {
        this.initConfigs();

        this.fishElements.forEach(fish => {
            fish.removeAttribute("style");
            this.clearFish(fish);
        });

  
    }
  
}

export default Fishes;