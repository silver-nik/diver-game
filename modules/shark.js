import { gameConfig } from '../services/config.js';

class Shark {
    constructor() {
        this.getElements();
        this.initConfigs();
    }

    getElements() {
        this.activeLine = document.querySelector('.fish-middle');
        this.text = document.querySelector('.text');
        this.game = document.querySelector('.game');
        this.gamerHp = document.querySelector('.gamer-hp');
        this.gameWidth = parseInt(getComputedStyle(this.game).width);
    }

    initConfigs() {
        this.defaultSharkHP = gameConfig.defaultSharkHP;
        this.sharkHP = this.defaultSharkHP;
        this.bufferZone = gameConfig.bufferZone;
        this.pointPerEnemy = gameConfig.pointsPerEnemy;
        this.points = 0;  // текущие очки
        this.isHit = false; // флаг столкновения
        this.isScored = false; // флаг засчитанных очков
    }

    setFishesModule(fishesModule) {
        this.fishesModule = fishesModule;
    }

    setDiverModule(diverModule) {
        this.diverModule = diverModule;
    }

    hitByHealth() {
        this.sharkHP--;
    }

    updateDifficult(elapsedTimeSecond) {
        const midGameTime = (gameConfig.gameAvarageTime / 2) * 60;
        const shark = document.querySelector(".shark");
        
        if(!shark) {
            this.activeLine.classList.remove("bigger");
        } else {
            if(elapsedTimeSecond > midGameTime && parseInt(getComputedStyle(shark).left) > 400) {            
                this.defaultSharkHP = gameConfig.maxAvalibleSharkHP;
                this.updateSharkSize();
            } 
        }
    }

    updateSharkHealth(hp = this.sharkHP) {
        const hpElement = this.activeLine.querySelector(".hp");
        hpElement.textContent = hp; 
    }

    updateSharkSize() {
        const shark = document.querySelector(".shark");
        if(shark && !shark.classList.contains("bigger")) {
            shark.classList.add("bigger");
            this.updateSharkHealth(gameConfig.maxAvalibleSharkHP);
        }
    }

    calcPoints(points) {
        this.points += points;
        this.text.textContent = this.points;
    }

    handleShark(el, fishLeft) {

        const sharkHP = parseInt(el.querySelector(".hp").textContent, 10);

        if (fishLeft <= -70) {
            this.resetShark(el);
        }

        if(this.sharkHP == 0) {
            this.activeLine.querySelector(".hp").textContent = "";
        }

        if (sharkHP > 0 && fishLeft < this.bufferZone && fishLeft > 0 && !this.isHit) {
            this.handleSharkHit();
        } 
        
        if (fishLeft > 0 && fishLeft < this.gameWidth && sharkHP == 0 && !this.isScored) {
            this.calcPoints(this.pointPerEnemy);
            this.isScored = true;
        }

    }

    resetShark(el) {
        this.fishesModule.setFish(el);  
        this.sharkHP = this.defaultSharkHP;
        this.isHit = false;
        this.isScored = false;
    }

    handleSharkHit() {
        this.diverModule.diverHP--;
        this.isHit = true;
        this.gamerHp.textContent = this.diverModule.diverHP;        
    }

    resetGame() {
        this.initConfigs();
        this.activeLine.classList.remove("bigger");
        this.text.textContent = this.points;  
    }
}

export default Shark;