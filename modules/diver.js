import { gameConfig } from '../services/config.js';

class Diver {
    constructor() {
        this.getElements();
        this.initConfigs();
    }

    getElements() {
        this.activeLine = document.querySelector('.fish-middle'); // линия середины (активная, где дайвер и акулы)
        this.diver = document.querySelector('.diver'); 
        this.gamerHp = document.querySelector('.gamer-hp');
        this.text = document.querySelector('.text');
    }

    initConfigs() {
        this.defaultDiverHP = gameConfig.defaultDiverHP;
        this.diverHP = this.defaultDiverHP; // текущие очки здоровья дайвера
        this.gamerHp.textContent = this.diverHP;
    }

    setSharkModule(sharkModule) {  
        this.sharkModule = sharkModule;
    }

    handleClick(e) {
        this.diver.classList.add('action1');
        setTimeout(() => this.diver.classList.remove('action1'), 1000);

        if (e.target.closest('.modal') || e.target === document.querySelector('.modal')) return;

        if(this.sharkModule.sharkHP > 0 && this.activeLine.classList.contains("shark")) {
            this.sharkModule.hitByHealth();
            this.sharkModule.updateSharkHealth();
        } 
        
    }

    resetGame() {
        this.initConfigs();
    }
}

export default Diver;