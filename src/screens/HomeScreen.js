import React, { useEffect, useState } from 'react'
import { Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Alert } from 'react-native'
import { signOut } from '../utils/auth';
import FormButton from '../components/shared/FormButton';
import { COLORS } from '../constants/theme';
import { getQuizzes, PulishQuiz } from '../utils/database';


const HomeScreen = ({ navigation }) => {

  const [allQuizzes, setAllQuizzes] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const getAllQuizzes = async () => {
    // setRefreshing(true);
    const quizzes = await getQuizzes();

    // Transform quiz data
    let tempQuizzes = [];
    await quizzes.docs.forEach(async quiz => {
      await tempQuizzes.push({ id: quiz.id, ...quiz.data() });
    });
    await setAllQuizzes([...tempQuizzes]);

    setRefreshing(false);
  }

  // const handlePublish = async (quizId, isPublish) => {
  //   setRefreshing(true);
  //   await PulishQuiz(quizId, isPublish);
  //   setRefreshing(false);
  // }

  useEffect(() => {
    getAllQuizzes();
  }, [refreshing])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: COLORS.white,
          elevation: 4,
          paddingHorizontal: 20,
        }}>
        <Text style={{ fontSize: 20, color: COLORS.black }}>Questionnaire App</Text>
        <Text
          style={{
            fontSize: 20,
            padding: 10,
            color: COLORS.error,
          }}
          onPress={signOut}>
          Logout
        </Text>
      </View>

      {/* Quiz list */}
      <FlatList
        data={allQuizzes}
        onRefresh={getAllQuizzes}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        style={{
          paddingVertical: 20,
        }}
        renderItem={({ item: quiz }) => (
          <View
            style={{
              padding: 20,
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: COLORS.white,
              elevation: 2,
            }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={{ fontSize: 18, color: COLORS.black }}>
                {quiz.title}
              </Text>
              <Text style={{ color: '#CC0033' }}>
                {quiz.isFinished ? 'finished' : 'unfinished'}
              </Text>
              {quiz.description != '' ? (
                <Text style={{ opacity: 0.5 }}>{quiz.description}</Text>
              ) : null}
            </View>
            <View>
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  marginVertical: 15,
                  borderRadius: 50,
                  backgroundColor: COLORS.primary + '20',
                }}
                onPress={() => {
                  navigation.navigate('PlayQuizScreen', {
                    quizId: quiz.id,
                  });
                }}>
                <Text style={{ color: COLORS.primary }}>Play</Text>
              </TouchableOpacity>
              {/*               
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  backgroundColor: COLORS.primary + '20',
                }}
                onPress={() => { handlePublish(quiz.id, !quiz.isPublish) }}>
                <Text style={{ color: COLORS.primary }}>{quiz.isPublish ? "unPublish" : "Publish"}</Text>
              </TouchableOpacity>
              */}
            </View>


            {/* <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                borderRadius: 50,
                backgroundColor: COLORS.primary + '20',
              }}
              onPress={() => {
                // navigation.navigate('PlayQuizScreen', {
                //   quizId: quiz.id,
                // });
              }}>
              <Text style={{ color: COLORS.primary }}>edit</Text>
            </TouchableOpacity> */}
          </View>
        )}
      />
{/* 
      Button */}
      <FormButton
        labelText="Create Quiz"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          borderRadius: 50,
          paddingHorizontal: 30,
        }}
        handleOnPress={() => navigation.navigate('CreateQuizScreen')}
      />


    </SafeAreaView>
  );
};

export default HomeScreen;