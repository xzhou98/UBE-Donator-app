import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
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
                answers = Object.assign({ documentId: id }, element.data())
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
        let answers = [];
        let date = new Date();
        const allAnswers = await firestore().collection('Questions').get();

        await allAnswers.docs.forEach(async (element) => {
            let startDate = new Date(element.data().startDate._seconds * 1000)
            let endDate = new Date(element.data().endDate._seconds * 1000)
            let newDate = new Date()
            let type = 0
            if (newDate > endDate) type = 0
            else if (newDate >= startDate && newDate <= endDate) type = 1
            else type = 2
            let a = { id: element.id, endDate: element.data().endDate, startDate: element.data().startDate, dateType: type };
            answers.push(a);
        })

        answers.sort(function (a, b) { return a.startDate._seconds - b.startDate._seconds });

        answers = answers.map((item) => {
            let startDate = moment(item.startDate._seconds * 1000)
            let endDate = moment(item.endDate._seconds * 1000)
            return { id: item.id, startDate: startDate.format('MM/DD/YYYY'), endDate: endDate.format('MM/DD/YYYY'), dateType: item.dateType };
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
        let result = []
        let answersId = 0;
        let allSessions = await getAllSessions()
        for (let i = 0; i < allSessions.length; i++) {
            allSessions[i] = [];
        }
        const allAnswers = await firestore().collection("DonationData").get()
        await allAnswers.docs.forEach(async element => {
            if (element.data().userId == userId)
                answersId = element.id
        })
        const answers = await firestore().collection("DonationData").doc(answersId).collection('Answers').get();
        await answers.docs.forEach(async element => {
            result.push({ id: element.id, sessionId: element.data().sessionId, session: element.data().session, date: element.data().date })
        })

        result.sort(function (a, b) { return a.date._seconds - b.date._seconds });

        result = result.map((item) => {
            let date = moment(item.date._seconds * 1000)
            return { id: item.id, sessionId: item.sessionId, session: item.session, date: date.format('MM/DD/YYYY') };
        })

        for (let i = 0; i < result.length; i++) {
            allSessions[result[i].session - 1].push(result[i])
        }
        return allSessions
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


/**
 * save user answers to firebase (include image)
 */
export const saveAnswersToFirebase = async (sessionId, userId, userEmail, sessionNum, answers) => {
    let date = new Date();

    //upload image to firebase storage and get the Url
    for (let i = 0; i < answers.length; i++) {
        const element = answers[i];
        if (element.image.length != 0) {
            for (let j = 0; j < element.image.length; j++) {
                const image = element.image[j];
                let momentDate = moment(date).format('MM-DD-YYYY-h:mm:ssa')

                const reference = storage().ref(`/images/${userEmail}/${sessionNum}/${momentDate}-question${element.questionId}-${j}.png`)
                await reference.putFile(image).then(() => {
                    console.log('Image Uploaded');
                });
                let imageUrl = await reference.getDownloadURL();
                answers[i].image[j] = imageUrl
            }
        }
    }

    //integrate all information
    let finalData = { answer: answers, date: date, session: sessionNum, sessionId: sessionId }


    let answersId = undefined;
    const allAnswers = await firestore().collection("DonationData").get()
    await allAnswers.docs.forEach(async element => {
        if (element.data().userId == userId)
            answersId = element.id
    })


    if (answersId == undefined) {
        await firestore().collection("DonationData").add({ userId: userId }).then((data) => {
            answersId = data._documentPath._parts[1]
        })
    }
    await firestore().collection("DonationData").doc(answersId).collection('Answers').add(finalData)
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