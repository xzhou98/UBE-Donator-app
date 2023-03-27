import { getAllQuestions } from '../utils/database';



let index = 0;
let answers = [{isTrueAnswer: false, answer: [], image:"",
nextQuestionId: '1', questionId: '0'}]; 

const removeAll = () => {
    answers = [];
}

const indexIncrement = () => {
    index++;
}

const getIndex = () => {
    return index
}

const getAnswer = () => {
    return answers
}

const addAnswers = (answer) => {
    answers.push(answer);
}

// const getAllQuestion = async () => {
//     try {
//         let q = await getAllQuestions();
//         console.log(q)
//         return q
//     } catch (error) {
//         Alert.alert(error)
//     }
// }

// let questions = getAllQuestion;

const global = {
    // questions,
    // getAllQuestion,
    removeAll,
    getAnswer,
    getIndex,
    indexIncrement,
    addAnswers,
};

module.exports = global;