import { getAllQuestions } from '../utils/database';



let qId = 0;
let answers = [{isTrueAnswer: false, answer: [], image:[], nextQuestionId: '1', questionId: '0'}]; 
let session = -1;

const getSession = () => {
    return session;
}

const changeSession = (num) => {
    session = num;
}

const removeAll = () => {
    answers = [];
}

const removeLastQuestion = () => {
    let index = 1;
    for (let i = 0; i < answers.length; i++) {
        const element = answers[i];
        if(element.isTrueAnswer)
            index = i;
    }
    answers.splice(index);
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
    let check = true;
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].questionId == curId){
            answers[i].nextQuestionId = nextId;
            answers[i].answer = ["Skip"];
            check = false;
        }
    }
    if(check){
        answers.push({ isTrueAnswer: true, answer: ["Skip"], image: [], nextQuestionId: nextId, questionId: curId })
    }
}

const addAnswers = (answer) => {
    answers.push(answer);
}


const global = {
    removeLastQuestion,
    skipQuestionsById,
    setNextQuestionId,
    addAnswersById,
    removeAll,
    getAnswer,
    getQId,
    setQId,
    getSession,
    addAnswers,
    changeSession
};

module.exports = global;