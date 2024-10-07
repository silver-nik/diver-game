import { gameConfig } from "./services/config.js";

let getRandomQuestion = (askedQuestions, correctAnswersCount, checkpoint) => {
        
    let availableQuestions = gameConfig.questions1.filter(q => !askedQuestions.includes(q));

    if (correctAnswersCount >= checkpoint && correctAnswersCount < (checkpoint * 2)) {
        availableQuestions = gameConfig.questions2.filter(q => !askedQuestions.includes(q));
    } else if (correctAnswersCount >= (checkpoint * 2)) {
        availableQuestions = gameConfig.questions3.filter(q => !askedQuestions.includes(q));
    } 
    
    if (availableQuestions.length === 0) {

        askedQuestions = [];

        if (correctAnswersCount < checkpoint) {
            availableQuestions = gameConfig.questions1;
        } else if (correctAnswersCount >= checkpoint && correctAnswersCount < (checkpoint * 2)) {
            availableQuestions = gameConfig.questions2;
        } else if (correctAnswersCount >= (checkpoint * 2)) {
            availableQuestions = gameConfig.questions3;
        }
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];

    askedQuestions.push(question);
    
    return question;
}


export {
    getRandomQuestion
}

