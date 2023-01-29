import React, { useState } from 'react'
import { Text, View, SafeAreaView, ToastAndroid } from 'react-native'
import { COLORS } from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import { createQuiz } from '../utils/database';

const CreateQuizScreen = ({ navigation }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleQuizSave = async () => {
        const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
        //save to firestore
        await createQuiz(currentQuizId, title, description)

        //Navigate to Add Question String
        navigation.navigate('AddQuestionScreen', {
            currentQuizId: currentQuizId,
            currentQuizTitle: title,
        });

        //Reset
        setTitle('')
        setDescription('');
        ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                padding: 20,
            }}>
            <Text
                style={{
                    fontSize: 20,
                    textAlign: 'center',
                    marginVertical: 20,
                    fontWeight: 'bold',
                    color: COLORS.black,
                }}>
                Create Questionnaire
            </Text>

            <FormInput
                labelText="Title"
                placeholderText="enter quiz title"
                onChangeText={val => setTitle(val)}
                value={title}
            />
            <FormInput
                labelText="Description"
                placeholderText="enter quiz description"
                onChangeText={val => setDescription(val)}
                value={description}
            />

            <FormButton labelText="Save Quiz" handleOnPress={handleQuizSave} />

            {/* Temporary button - navigate without saving quiz*/}
            <FormButton
                labelText="Navigate to AddQuestionScreen"
                style={{
                    marginVertical: 20,
                }}
                handleOnPress={() => {
                    navigation.navigate('AddQuestionScreen', {
                        currentQuizId: '100000',
                        currentQuizTitle: '123',
                    });
                }}
            />
        </SafeAreaView>
    )
}

export default CreateQuizScreen