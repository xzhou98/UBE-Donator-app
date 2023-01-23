import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'

export const createQuiz = (currentQuizId, title, description) => {
    // Alert.alert(description)
    return firestore().collection('Quizzes').doc(currentQuizId).set({
        title,
        description,
    });
};

// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
    Alert.alert(question.option.toString())
    return firestore().
        collection("Quizzes")
        .doc(currentQuizId)
        .collection('QNA')
        .doc(currentQuestionId)
        .set(question);
}

// Get All Quizzes
export const getQuizzes = () => {
    return firestore().collection('Quizzes').get();
};

// Get Quiz Details by id
export const getQuizById = currentQuizId => {
    return firestore().collection('Quizzes').doc(currentQuizId).get();
};

// Get Questions by currentQuizId
export const getQuestionsByQuizId = currentQuizId => {
    return firestore()
        .collection('Quizzes')
        .doc(currentQuizId)
        .collection('QNA')
        .get();
};