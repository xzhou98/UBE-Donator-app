import { getAllQuestions } from '../utils/database';



let index = 0;
let answers = [{answer: 'A', image:"https://firebasestorage.googleapis.com/v0/b/springbeta-6cb29.appspot.com/o/images%2Fquestions%2F100000_101730?alt=media&token=0ba81b38-3d30-425d-bd3b-09db5ed405fe",
questionId: '0'}]; 



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
    answers.push(answer)
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
    getAnswer,
    getIndex,
    indexIncrement,
    addAnswers,
};

module.exports = global;