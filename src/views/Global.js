import { getAllQuestions } from '../utils/database';



let qId = 1;
let answers = [{isTrueAnswer: false, answer: [], image:"", nextQuestionId: '1', questionId: '0'}]; 
// let answers = []

const removeAll = () => {
    answers = [];
}

const setQId = (id) => {
    qId = id;
}

const getQId = () => {
    return qId
}

const getAnswer = () => {
    return answers
}

const addAnswersById = (id, option) => {
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].questionId == id){
            answers[i].answer.push(option);
        }
    }
}

const setNextQuestionId = (curId, nextId) => {
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].questionId == curId){
            answers[i].nextQuestionId = nextId;
        }
    }
}

const skipQuestionsById = (curId, nextId) => {
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].questionId == curId){
            answers[i].nextQuestionId = nextId;
            answers[i].answer = ["Skip"];
        }
    }
}

const addAnswers = (answer) => {
    answers.push(answer);
}


const global = {
    skipQuestionsById,
    setNextQuestionId,
    addAnswersById,
    removeAll,
    getAnswer,
    getQId,
    setQId,
    addAnswers,
};

module.exports = global;