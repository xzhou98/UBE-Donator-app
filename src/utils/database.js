import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native'
import moment from 'moment';


export const createUser = (email) => {
    return firestore().collection('Users').add({
        email: email,
        isAdmin: false,
        date: firestore.Timestamp.fromDate(new Date())
    });
}

/**
 * get all questions by session Id
 */
export const getQuestionsBySessionId = async (id) => {
    try {
        let result = []
        let questions = await firestore().collection('Questions').doc(id).get();
        await questions.data().questions.forEach(async (element, index) => {

            result.push(Object.assign({ id: `${index}` }, element));
        })
        return result
    } catch (error) {
        return error;
    }
}

export const getAnswersByAnswerId = async (userId, answersId) => {
    try {
        //get all users donation data
        let allUsers = await firestore().collection('DonationData').get();
        let answers = []
        let id = null

        await allUsers.docs.forEach(async (element) => {
            if (element.data().userId == userId) {
                id = element.id;
            }
        })

        const temp = await firestore().collection('DonationData').doc(id).collection('Answers').get();
        temp.forEach((element) => {
            if (element.id == answersId)
                answers = Object.assign({documentId: id}, element.data())
        })

        return answers
    } catch (error) {
        return error;
    }
}

/**
 * get all question from firebase
 */
export const getAllQuestions = async () => {
    // return firestore().collection('Questions').get();
    try {
        const q = await firestore().collection('Questions').get();
        let session = null
        await q.docs.forEach(async element => {
            let temp = []
            let startDate = new Date(element.data().startDate._seconds * 1000)
            let endDate = new Date(element.data().endDate._seconds * 1000)
            let newDate = new Date()
            if (startDate <= newDate && newDate <= endDate) {
                element.data().questions.forEach((x, index) => {
                    temp.push(Object.assign({ id: `${index}` }, x));
                })
                // session.push({date: moment(element.data().date._seconds * 1000).format('MMMM Do YYYY, h:mm:ss a'), questions: temp, session: element.data().session})
                session = { id: element.id, questions: temp, session: element.data().session }
            }
        })
        return session
    } catch (error) {
        return error;
    }
}

/**
 * get all sessions from database
 */
export const getAllSessions = async (userId) => {
    try {
        let id = "";
        let answers = [];
        let date = new Date();
        const data = await firestore().collection('DonationData').get();

        await data.docs.forEach(async element => {
            if (userId == element.data().userId)
                id = element.id;
        })

        const temp = await firestore().collection('DonationData').doc(id).collection('Answers').get();

        await temp.docs.forEach(async element => {
            let a = Object.assign({ id: element.id }, element.data())
            answers.push(a);
        })

        answers.sort(function (a, b) { return a.date._seconds - b.date._seconds });

        answers = answers.map((item) => {
            let date = moment(item.date._seconds * 1000)
            return { id: item.id, sessionId: item.sessionId, date: date.format('MMMM Do YYYY'), };
        })
        return answers
    } catch (error) {
        return error;
    }
}

// Get User info by email
export const getUserInfoByEmail = async (email) => {

    try {
        let user = null
        const q = await firestore().collection("Users").get()

        await q.docs.forEach(async element => {
            if (email == element.data().email) {
                let date = moment(element.data().date._seconds * 1000).format('MMMM Do YYYY, h:mm:ss a');
                user = { id: element.id, email: element.data().email, isAdmin: element.data().isAdmin, date: date }
            }
        });

        return user;
    } catch (error) {
        console.log(error);
    }

}

export const setUserInfo = (user) => {
    return firestore().collection('Users').doc(user.id).update({
        email: user.email,
        isAdmin: user.isAdmin,
        date: user.date,
    })
}

/**
 * get all donated sessions by userId
 */
export const getAllSessionsByUserId = async (userId) => {
    try {
        let result = [];
        const sessions = await firestore().collection("Questions").get()
        await sessions.docs.forEach(async element => {
            result.push({id: element.id, endDate: element.data().endDate, startDate: element.data().startDate, donationData: []})
        })
        result.sort(function (a, b) { return a.startDate._seconds - b.startDate._seconds });

    } catch (error) {
        
    }
}

export const getDonationDateBySessionId = async (userId, sessionId) => {
    try {
        let donationData = []
        const datas = await firestore().collection('DonationData').get();
        // datas.docs.forEach

    } catch (error) {
        
    }
}

//submit quiz
// export const submitQuiz = async ( quizId, userId, answers, userEmail ) => {
//     let quiz = null
//     let question = 1;

//     // user finish
//     await firestore().collection('Quizzes').doc(quizId).get().then(data => {
//         quiz = data.data();
//     });
//     quiz.users.push(userEmail)
//     firestore().collection('Quizzes').doc(quizId).update({
//         users: quiz.users
//     });


//     //update answer
//     for (let i = 0; i < answers.length; i++) {
//         await firestore().collection('Quizzes').doc(quizId).collection('QNA').doc(answers[i].questionId).get().then(data => {
//             question = data.data();
//         });

//         let res = question.answers;
//         res.push({ userId: userId, answer: answers[i].answer });

//         firestore().collection('Quizzes').doc(quizId).collection('QNA').doc(answers[i].questionId).update({
//             // answers: question.answers.push({userId: userId, answer: answers[i].answer})
//             answers: res
//         })
//     }
// }



//Check if user finished the quiz
// true finished, false unfinished
// export const checkQuizFinish = async (quizId, userEmail) => {
//     let finish = false;

//     await firestore().collection('Quizzes').doc(quizId).get().then(data => {
//         data.data().users.forEach(element => {
//             if (element == userEmail) {
//                 finish = true;
//             }
//         });
//     });

//     return finish;
// }


// export const createQuiz = (currentQuizId, title, description) => {
//     // Alert.alert(description)
//     return firestore().collection('Quizzes').doc(currentQuizId).set({
//         title,
//         description,
//         isPublish: false,
//         users: [],
//     });
// };

// Create new question for current quiz
// export const createQuestion = (currentQuizId, currentQuestionId, question) => {
//     Alert.alert(question.option.toString())
//     return firestore().
//         collection("Quizzes")
//         .doc(currentQuizId)
//         .collection('QNA')
//         .doc(currentQuestionId)
//         .set(question);
// }

// Get Quiz Details by id
// export const getQuizById = currentQuizId => {
//     return firestore().collection('Quizzes').doc(currentQuizId).get();
// };

// Get Questions by currentQuizId
// export const getQuestionsByQuizId = currentQuizId => {
//     return firestore()
//         .collection('Quizzes')
//         .doc(currentQuizId)
//         .collection('QNA')
//         .get();
// };

// Update quiz publishing state
// export const PulishQuiz = (quizId, isPublish) => {
//     return firestore().collection('Quizzes').doc(quizId).update({
//         isPublish: isPublish,
//     })
// };