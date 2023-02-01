import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'

export const createQuiz = (currentQuizId, title, description) => {
    // Alert.alert(description)
    return firestore().collection('Quizzes').doc(currentQuizId).set({
        title,
        description,
        isPublish: false,
        users: [],
    });
};

export const createUser = (email) => {
    return firestore().collection('Users').add({
        email: email,
        isAdmin: false,
    });
}

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

// Update quiz publishing state
export const PulishQuiz = (quizId, isPublish) => {
    return firestore().collection('Quizzes').doc(quizId).update({
        isPublish: isPublish,
    })
};

// Get User info by email
export const getUserInfoByEmail = async (email) => {

    try {
        let user = null
        const q = await firestore().collection("Users").get()

        await q.docs.forEach(async element => {
            if (email == element.data().email)
                user = { id: element.id, email: element.data().email, isAdmin: element.data().isAdmin }
        });

        return user;
    } catch (error) {
        console.log(error);
    }

}

//submit quiz
export const submitQuiz = async ( quizId, userId, answers, userEmail ) => {
    let quiz = null
    let question = 1;

    // user finish
    await firestore().collection('Quizzes').doc(quizId).get().then(data => {
        quiz = data.data();
    });
    quiz.users.push(userEmail)
    firestore().collection('Quizzes').doc(quizId).update({
        users: quiz.users
    });


    //update answer
    for (let i = 0; i < answers.length; i++) {
        await firestore().collection('Quizzes').doc(quizId).collection('QNA').doc(answers[i].questionId).get().then(data => {
            question = data.data();
        });

        let res = question.answers;
        res.push({ userId: userId, answer: answers[i].answer });

        firestore().collection('Quizzes').doc(quizId).collection('QNA').doc(answers[i].questionId).update({
            // answers: question.answers.push({userId: userId, answer: answers[i].answer})
            answers: res
        })
    }
}

//Check if user finished the quiz
// true finished, false unfinished
export const checkQuizFinish = async (quizId, userEmail) => {
    let finish = false;

    await firestore().collection('Quizzes').doc(quizId).get().then(data => {
        data.data().users.forEach(element => {
            if (element == userEmail) {
                finish = true;
            }
        });
    });

    return finish;
}