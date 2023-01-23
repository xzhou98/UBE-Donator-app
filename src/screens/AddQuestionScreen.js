import React, { useState } from 'react'
import { Text, View, ScrollView, KeyboardAvoidingView, Alert, ToastAndroid, Image, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants/theme';
import FormInput from '../components/shared/FormInput';
import FormButton from '../components/shared/FormButton';
import QuestionButton from '../components/shared/questionButton';
import { createQuestion } from '../utils/database';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';


const AddQuestionScreen = ({ navigation, route }) => {

    const [imageUri, setImageUri] = useState('');
    const [currentQuizId, setCurrentQuizId] = useState(route.params.currentQuizId)
    const [currentQuizTitle, setCurrentQuizTitle] = useState(route.params.currentQuizTitle)
    // const [questionNum, setQuestionNum] = useState(3)
    const [question, setQuestion] = useState('')

    // const [correctAnswer, setCorrectAnswer] = useState('')
    const [optionList, setOptionList] = useState([])

    const handleQuestionSave = async () => {
        if (currentQuizId == '') {
            Alert.alert("Please select a quiz first!")
        }

        if (question == '' || optionList.length == 0) {
            Alert.alert("Please input a question and option!")
            return;
        }

        optionList.forEach(element => {
            if (element[1] == '') {
                Alert.alert("Option is empty!")
                return;
            }
        });

        let currentQuestionId = Math.floor(
            100000 + Math.random() * 9000,
        ).toString();

        // Upload Image
        let imageUrl = '';

        if (imageUri != '') {
            const reference = storage().ref(
                `/images/questions/${currentQuizId}_${currentQuestionId}`,
            );
            await reference.putFile(imageUri).then(() => {
                console.log('Image Uploaded');
            });
            imageUrl = await reference.getDownloadURL();
        }


        let temp = []
        optionList.forEach(element => {
            temp.push(element[1]);
        });

        await createQuestion(currentQuizId, currentQuestionId, {
            question: question,
            option: temp,
            imageUrl: imageUrl,
        });

        ToastAndroid.show('Question saved', ToastAndroid.SHORT);

        //Reset
        setQuestion('');
        setOptionList([]);


    }

    const handleOption = () => {
        let num = optionList.length + 1

        setOptionList([...optionList, [num, ""]])
    }

    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            ({ assets }) => {
                if (assets && assets.length > 0) {
                    setImageUri(assets[0].uri);
                }
            },
        );
    };

    const deleteOption = () => {
        setOptionList((pre) => {
            pre.splice(optionList.length - 1, 1);
            // let newArr = pre;
            return [...pre];
        })
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, }}>
            <ScrollView style={{ flex: 1, backgroundColor: COLORS.white, }}>
                <View style={{ padding: 20 }}>
                    <Text
                        style={{ fontSize: 20, textAlign: 'center', color: COLORS.black }}>
                        Add Question
                    </Text>
                    <Text style={{ textAlign: 'center', marginBottom: 20 }}>
                        For {currentQuizTitle}
                    </Text>

                    <FormInput
                        labelText="Question"
                        placeholderText="enter question"
                        onChangeText={val => setQuestion(val)}
                        value={question}
                    />

                    {/* List options */}
                    {optionList.map((option) => {
                        return <FormInput
                            labelText={"Option" + option[0]}
                            placeholderText="enter question"
                            onChangeText={val => setOptionList((pre) => {
                                pre[option[0] - 1][1] = val;

                                return [...pre];
                            })}
                            value={option[1]}
                        />;
                    })}

                    {/* Image upload */}
                    {imageUri == '' ? (
                        <TouchableOpacity
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 28,
                                backgroundColor: COLORS.primary + '20',
                            }}
                            onPress={selectImage}>
                            <Text style={{ opacity: 0.5, color: COLORS.primary }}>
                                + add image
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Image
                            source={{
                                uri: imageUri,
                            }}
                            resizeMode={'cover'}
                            style={{
                                width: '100%',
                                height: 200,
                                borderRadius: 5,
                            }}
                        />
                    )}


                    <View style={{ flexDirection: 'row', marginVertical: 30, }}>
                        <QuestionButton
                            labelText="add Option"
                            handleOnPress={handleOption}
                        />
                        <View style={{ width: '10%' }}></View>
                        <QuestionButton
                            labelText="delete Option"
                            handleOnPress={deleteOption}
                        />
                    </View>

                    <FormButton style={{
                        marginVertical: 10,
                    }}
                        labelText="Save Question"
                        handleOnPress={handleQuestionSave}
                    />
                    <FormButton
                        labelText="Done & Go Home"
                        isPrimary={false}
                        handleOnPress={() => {
                            setCurrentQuizId('');
                            navigation.navigate('HomeScreen');
                        }}
                    />

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AddQuestionScreen