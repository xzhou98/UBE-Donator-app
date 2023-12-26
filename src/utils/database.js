import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
import moment from 'moment';
import seed from '../seed/session1.json';

export const createUser = async email => {
  return firestore()
    .collection('Users')
    .add({
      email: email,
      isAdmin: false,
      date: firestore.Timestamp.fromDate(new Date()),
      num: 0,
    });
};

/**
 * get all questions by session Id
 */
export const getQuestionsBySessionId = async id => {
  try {
    let result = [];
    let questions = await firestore().collection('Questions').doc(id).get();
    await questions.data().questions.forEach(async (element, index) => {
      result.push(Object.assign({id: `${index}`}, element));
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getAnswersByAnswerId = async (userId, answersId) => {
  try {
    //get all users donation data
    let allUsers = await firestore().collection('DonationData').get();
    let answers = [];
    let id = null;

    await allUsers.docs.forEach(async element => {
      if (element.data().userId == userId) {
        id = element.id;
      }
    });
    const temp = await firestore()
      .collection('DonationData')
      .doc(id)
      .collection('Answers')
      .get();
    temp.forEach(element => {
      if (element.id == answersId)
        answers = Object.assign(
          {documentId: id, answersId: answersId},
          element.data(),
        );
    });

    return answers;
  } catch (error) {
    return error;
  }
};
/**
 * get all question from firebase
 */
export const getAllQuestions = async () => {
  // return firestore().collection('Questions').get();
  try {
    const q = await firestore().collection('Questions').get();
    let session = null;
    await q.docs.forEach(async element => {
      let temp = [];
      let startDate = new Date(element.data().startDate._seconds * 1000);
      let endDate = new Date(element.data().endDate._seconds * 1000);
      let newDate = new Date();
      if (startDate <= newDate && newDate <= endDate) {
        element.data().questions.forEach((x, index) => {
          temp.push(Object.assign({id: `${index}`}, x));
        });
        // session.push({date: moment(element.data().date._seconds * 1000).format('MMMM Do YYYY, h:mm:ss a'), questions: temp, session: element.data().session})
        session = {
          id: element.id,
          questions: temp,
          session: element.data().session,
        };
      }
    });
    return session;
  } catch (error) {
    return error;
  }
};

/**
 * get all sessions from database
 */
export const getAllSessions = async userId => {
  try {
    let answers = [];
    const allAnswers = await firestore().collection('Questions').get();

    await allAnswers.docs.forEach(async element => {
      let startDate = new Date(element.data().startDate._seconds * 1000);
      let endDate = new Date(element.data().endDate._seconds * 1000);
      let newDate = new Date();
      let type = 0;
      if (newDate > endDate) type = 0;
      else if (newDate >= startDate && newDate <= endDate) type = 1;
      else type = 2;
      let a = {
        id: element.id,
        num: element.data().session,
        endDate: element.data().endDate,
        startDate: element.data().startDate,
        dateType: type,
      };
      answers.push(a);
    });
    answers.sort(function (a, b) {
      return b.startDate._seconds - a.startDate._seconds;
    });

    answers = answers.map(item => {
      let startDate = moment(item.startDate._seconds * 1000);
      let endDate = moment(item.endDate._seconds * 1000);
      return {
        id: item.id,
        num: item.num,
        startDate: startDate.format('MM/DD/YYYY'),
        endDate: endDate.format('MM/DD/YYYY'),
        dateType: item.dateType,
      };
    });
    return answers;
  } catch (error) {
    return error;
  }
};

// Get User info by email
export const getUserInfoByEmail = async email => {
  try {
    let user = null;
    const q = await firestore().collection('Users').get();

    await q.docs.forEach(async element => {
      if (email == element.data().email) {
        let date = moment(element.data().date._seconds * 1000).format(
          'MMMM Do YYYY, h:mm:ss a',
        );
        user = {
          id: element.id,
          email: element.data().email,
          isAdmin: element.data().isAdmin,
          date: date,
          num: element.data().num,
        };
      }
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const setUserInfo = user => {
  return firestore().collection('Users').doc(user.id).update({
    email: user.email,
    isAdmin: user.isAdmin,
    date: user.date,
  });
};

export const updateAnswer = async answers => {
  let newdata = {
    sessionId: answers.sessionId,
    session: answers.session,
    answer: answers.answer,
    date: answers.date,
  };
  console.log(newdata);
  return await firestore()
    .collection('DonationData')
    .doc(answers.documentId)
    .collection('Answers')
    .doc(answers.answersId)
    .update(newdata);
};

/**
 * get all donated sessions by userId
 */
export const getAllSessionsByUserId = async userId => {
  try {
    let result = [];
    let answersId = 0;
    let allSessions = await getAllSessions();
    for (let i = 0; i < allSessions.length; i++) {
      allSessions[i] = [];
    }
    const allAnswers = await firestore().collection('DonationData').get();
    await allAnswers.docs.forEach(async element => {
      if (element.data().userId == userId) answersId = element.id;
    });
    const answers = await firestore()
      .collection('DonationData')
      .doc(answersId)
      .collection('Answers')
      .get();
    await answers.docs.forEach(async element => {
      result.push({
        id: element.id,
        sessionId: element.data().sessionId,
        session: element.data().session,
        date: element.data().date,
      });
    });

    result.sort(function (a, b) {
      return b.date._seconds - a.date._seconds;
    });

    result = result.map(item => {
      let date = moment(item.date._seconds * 1000);
      return {
        id: item.id,
        sessionId: item.sessionId,
        session: item.session,
        date: date.format('MM/DD/YYYY'),
      };
    });

    for (let i = 0; i < result.length; i++) {
      len = allSessions.length
      allSessions[len - result[i].session].push(result[i]);
    }
    return allSessions;
  } catch (error) {}
};

export const getDonationDateBySessionId = async (userId, sessionId) => {
  try {
    let donationData = [];
    const datas = await firestore().collection('DonationData').get();
    // datas.docs.forEach
  } catch (error) {}
};

/**
 * save user answers to firebase (include image)
 */
export const saveAnswersToFirebase = async (
  sessionId,
  userId,
  userEmail,
  sessionNum,
  answers,
) => {
  let date = new Date();

  //upload image to firebase storage and get the Url
  for (let i = 0; i < answers.length; i++) {
    const element = answers[i];
    if (element.image.length != 0) {
      for (let j = 0; j < element.image.length; j++) {
        const image = element.image[j];
        let momentDate = moment(date).format('MM-DD-YYYY-h:mm:ssa');

        const reference = storage().ref(
          `/images/${userEmail}/${sessionNum}/${momentDate}-question${element.questionId}-${j}.png`,
        );
        await reference
          .putFile(image)
          .then(() => {
            console.log('Image Uploaded');
          })
          .catch(error => {
            console.log(image);
          });
        let imageUrl = await reference.getDownloadURL();
        answers[i].image[j] = imageUrl;
      }
    }
  }

  //integrate all information
  let finalData = {
    answer: answers,
    date: date,
    session: sessionNum,
    sessionId: sessionId,
  };

  let answersId = undefined;
  const allAnswers = await firestore().collection('DonationData').get();
  await allAnswers.docs.forEach(async element => {
    if (element.data().userId == userId) answersId = element.id;
  });

  if (answersId == undefined) {
    await firestore()
      .collection('DonationData')
      .add({userId: userId})
      .then(data => {
        answersId = data._documentPath._parts[1];
      });
  }

  await firestore()
    .collection('DonationData')
    .doc(answersId)
    .collection('Answers')
    .add(finalData);

  findalData = {
    answer: answers,
    date: date,
    session: sessionNum,
    sessionId: sessionId,
    userId: userId,
  };
  console.log(finalData);
  await firestore().collection("AllDonationData").add(finalData)
};

/**
 * remove donation session
 */
export const removeDonationSession = async (documentId, answerId) => {
  try {
    let allAnswer = await firestore()
      .collection('DonationData')
      .doc(documentId)
      .collection('Answers')
      .doc(answerId)
      .get();
    if (!allAnswer.exists) {
      console.log('No such document!');
      return;
    }

    allAnswer = allAnswer.data().answer;
    for (let i = 0; i < allAnswer.length; i++) {
      const images = allAnswer[i].image;

      if (images != undefined && images.length > 0) {
        for (let k = 0; k < images.length; k++) {
          const pathRegex = /o\/(.*?)\?alt/;
          const image = images[k];
          const matches = image.match(pathRegex);
          if (!matches) {
            console.error('URL format not recognized.');
            return;
          }
          const imagePath = decodeURIComponent(matches[1]);
          storage()
            .ref(imagePath)
            .delete()
            .then(() => {
              console.log(`Successfully deleted image at ${image}`);
            })
            .catch(error => {
              console.error(`Error deleting image at ${image}: `, error);
            });
        }
      }
    }

    firestore()
      .collection('DonationData')
      .doc(documentId)
      .collection('Answers')
      .doc(answerId)
      .delete()
      .then(() => {
        console.log('Doantion session deleted!');
      });
  } catch (error) {
    console.log(error);
  }
};

/**
 * run seed
 */
export const runSeed = async (startDate, endDate) => {
  try {
    seed.startDate = startDate;
    seed.endDate = endDate;
    // console.log(seed);

    await firestore().collection('Questions').add(seed);
  } catch (error) {}
};

export const getAllUserInfo = async () => {
  try {
    let alluser = [];
    const users = await firestore().collection('Users').get();
    await Promise.all( users.docs.map(async element => {
      let date = moment(element.data().date._seconds * 1000).format(
        'MMMM Do YYYY, h:mm:ss a',
      );
      alluser.push({
        id: element.id,
        email: element.data().email,
        isAdmin: element.data().isAdmin,
        date: date,
        num: element.data().num,
      });
    }));

    return alluser;
  } catch (error) {
    console.log(error);
  }
};

export const countInactNum = async (userId) => {
  try {
    return firestore().collection('Users').doc(userId).update({
      num: firestore.FieldValue.increment(1)
    });
  } catch (error) {
    console.log(error);
    return "Fail to increment num"
  }

}