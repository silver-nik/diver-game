import { gameConfig } from './config.js';

class DiverGame {
    constructor() {
        
        this.bufferZone = gameConfig.bufferZone;
        this.defaultSharkHP = gameConfig.defaultSharkHP;
        this.defaultDiverHP = gameConfig.defaultDiverHP;
        this.fishs = gameConfig.allFishes;
        this.pointPerEnemy = gameConfig.pointsPerEnemy;

        this.diverHP = this.defaultDiverHP; // текущие очки здоровья дайвера
        this.sharkHP = this.defaultSharkHP; // текущие очки здоровья акулы
        this.enemySpeed = gameConfig.gameDefaultEnemySpeed;
        this.points = 0;  // текущие очки

        this.isHit = false; // флаг столкновения
        this.isScored = false; // флаг засчитанных очков
        this.isEnd = false; // флаг конца игры
        this.isDifficult = false; // флаг увеличения сложности (для установки hp)
        this.isNewFish = false; // флаг что рыба установлена                

        this.activeLine = document.querySelector('.fish-middle'); // линия середины (активная, где дайвер и акулы)
        this.diver = document.querySelector('.diver'); 
        this.fishElements = document.querySelectorAll('.fish');
        this.text = document.querySelector('.text');
        this.game = document.querySelector('.game');
        this.gamerHp = document.querySelector('.gamer-hp');

        this.gameWidth = parseInt(getComputedStyle(this.game).width);
        this.animationFrame;

        document.addEventListener("click", (e) => this.handleClick(e));

        this.gamerHp.textContent = this.diverHP;
        this.startTime = Date.now(); 

        this.initGame();

    }

    updateSharkHealth() {
        const hpElement = this.activeLine.querySelector(".hp");
        hpElement.textContent = this.sharkHP; 
    }

    updateSharkSize() {
        if(!this.activeLine.classList.contains("bigger")) {
            this.activeLine.classList.add("bigger");
        }
    }

    handleShark(el, fishLeft) {
        const sharkHP = parseInt(el.querySelector(".hp").textContent, 10);

        if (fishLeft < -90) {
            this.resetShark(el);
        }

        if (sharkHP > 0 && fishLeft < this.bufferZone && fishLeft > 0) {
            this.handleSharkHit();
        } else if (fishLeft >= this.bufferZone && fishLeft < this.gameWidth && sharkHP == 0 && !this.isScored) {
           console.log("cool");
            this.calcPoints(this.pointPerEnemy);
            this.isScored = true;
        }

    }

    resetShark(el) {
        this.sharkHP = this.defaultSharkHP;
        this.setFish(el);    
        this.isHit = false;
        this.isScored = false;
    }

    handleSharkHit() {
        if(!this.isHit) {
            this.diverHP--;
            this.isHit = true;
            this.gamerHp.textContent = this.diverHP;        
        }
    }

    updateFishSpeed() {
        this.fishElements.forEach(el => {
            el.style.animationDuration = `${this.enemySpeed}s`;
        });
    }

    getRandomFish(el) {
        const fishesList = el.classList.contains("fish-middle") ? gameConfig.fishesToMiddle : gameConfig.fishs;
        console.log(fishesList[Math.floor(Math.random() * fishesList.length)]);
        return fishesList[Math.floor(Math.random() * fishesList.length)];
    }

    handleClick() {
        this.diver.classList.add('action1');
        setTimeout(() => this.diver.classList.remove('action1'), 1000);

        if(this.sharkHP > 0 && this.activeLine.classList.contains("shark")) {
            this.sharkHP--;
            this.updateSharkHealth();
        }
    }

    increaseDifficult() {

        if(this.isEnd) return;

        const elapsedTimeSecond = (Date.now() - this.startTime) / 1000;
        const gameSpeed = gameConfig.gameDefaultEnemySpeed / Math.exp(0.01 * elapsedTimeSecond);

        if(gameSpeed <= gameConfig.gameMinEnemySpeed) {
            this.enemySpeed = gameConfig.gameMinEnemySpeed;
        } else {
            this.enemySpeed = gameSpeed;
        }

        this.updateFishSpeed();

        const midGameTime = (gameConfig.gameAvarageTime / 2) * 60;
        
        if (elapsedTimeSecond > midGameTime && !this.isDifficult && parseInt(window.getComputedStyle(this.activeLine).left) <= -90) {
            this.defaultSharkHP = gameConfig.maxAvalibleSharkHP;

            this.updateSharkSize();
            
            this.isDifficult = true;
        }

        this.animationSpeed = requestAnimationFrame(() => this.increaseDifficult());        
    }

    setFish(el) {
        const randomClassName = this.getRandomFish(el);
        this.fishs.forEach(fishClass => el.classList.remove(fishClass));
    
        if(el.classList.contains("fish-middle")) {
            if(randomClassName == "shark") {
                this.updateSharkHealth();
            } else {
                el.querySelector(".hp").textContent = "";
            }
        } else {
            el.querySelector(".hp").textContent = "";
        }

        el.classList.add(randomClassName);
        el.style.visibility = "";
        el.style.animationDuration = `${this.enemySpeed}s`;
    }

    calcPoints(points) {
        this.points += points;
        this.text.textContent = this.points;
    }

    endGame() {
        this.fishElements.forEach(fish =>  {
            this.activeLine.style.left = this.bufferZone + "px";
            fish.style.left = window.getComputedStyle(fish).left;
            fish.style.animation = "none";
        });
        
        this.diver.style.transform = "rotate(180deg)";
        this.isEnd = true;
        cancelAnimationFrame(this.animationFrame);
        cancelAnimationFrame(this.animationSpeed);
    }

    setLose() {
        console.log('Sum is less than 2409. Try again.');
        this.endGame();
    }

    setWin() {
        console.log('Sum is 2409 or more. Excellent!');
        this.endGame();
    }

    setResultModal(sum) {
        if (sum < gameConfig.gameScoreToWin) {
            this.setLose();
        } else if (sum >= gameConfig.gameScoreToWin) {
            this.setWin();
        } else {
            console.log('Invalid sum');
        }
    }
    
    getCurrentPosition = () => {

        if(this.isEnd) return;

        this.fishElements.forEach(el => {

            const fishLeft = parseInt(getComputedStyle(el).left);

            if (fishLeft < -90) {
                this.setFish(el); 
                console.log(el.dataset.new);
                el.dataset.new = true;
            }


            if (fishLeft > this.gameWidth) {
                el.dataset.new = false;
            } 

            // провекра что это акула по середине
            if (el.classList.contains("fish-middle") && el.classList.contains("shark")) { 
                this.handleShark(el, fishLeft);
            }

        });

        // проверка, что дайвер убит
        if(this.diverHP <= 0) {
            this.setResultModal(this.points);
        }

        if(this.sharkHP == 0) {
            this.activeLine.querySelector(".hp").textContent = "";
        }

        this.animationFrame = requestAnimationFrame(this.getCurrentPosition);

    }   
    
    initGame() {
        this.fishElements.forEach(el => {
            this.setFish(el);
        })

        this.increaseDifficult();
        this.getCurrentPosition();

    }
}

document.addEventListener("DOMContentLoaded", () => new DiverGame());
