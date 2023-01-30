import React, { useState, useEffect } from 'react';
import {
    View, Text, SafeAreaView, StatusBar, FlatList,
    Image, TouchableOpacity, Alert,
} from 'react-native';
import { COLORS } from '../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormButton from '../components/shared/FormButton';
// import ResultModal from '../components/playQuizScreen/ResultModal';
import { getQuizById, getQuestionsByQuizId } from '../utils/database';



const PlayQuizScreen = ({ navigation, route }) => {

    const [currentQuizId, setCurrentQuiz] = useState(route.params.quizId)
    const [title, setTitle] = useState('')
    const [questions, setQuestions] = useState([])
    const [questionNum, setQuestionNum] = useState(0)
    const [answers, setAnswers] = useState([]);

    const getQuizAndQuestionDetials = async () => {
        //Get Quiz
        let currentQuiz = await getQuizById(currentQuizId)
        currentQuiz = currentQuiz.data()
        setTitle(currentQuiz.title)

        //Get Questions for current quiz
        const questions = await getQuestionsByQuizId(currentQuizId)

        //Transform and shuffle options
        let tempQuestions = [];
        await questions.docs.forEach(async res => {
            let question = res.data();
            let temp = []
            for (let i = 0; i < question.option.length; i++) {
                temp.push(false);
            }
            answers.push(temp)
            await tempQuestions.push(question)
        });

        setQuestions([...tempQuestions]);
    }

    useEffect(() => {
        getQuizAndQuestionDetials()
    }, [])

    const handleOnSubmit = () => {
        let result = []
        if (questionNum != questions.length) Alert.alert("Please finish all questions!")

        for (let i = 0; i < questions.length; i++) {
            let temp = [];
            for (let j = 0; j < answers.length; j++)
                if (answers[i][j]) temp.push(questions[i][j])
            result.push(temp);
        }

        // Alert.alert(answers.toString())
    }

    // const getOptionBgColor = (currentQuestion, currentOption) => {
    //     if (currentQuestion.selectedOption) {
    //         if (currentOption == currentQuestion.selectedOption) {

    //             return COLORS.success;

    //         } else {
    //             return COLORS.white;
    //         }
    //     } else {
    //         return COLORS.white;
    //     }
    // };

    // const getOptionTextColor = (currentQuestion, currentOption) => {
    //     if (currentQuestion.selectedOption) {
    //         if (currentOption == currentQuestion.selectedOption) {
    //             return COLORS.white;
    //         } else {
    //             return COLORS.black;
    //         }
    //     } else {
    //         return COLORS.black;
    //     }
    // };

    return (
        <SafeAreaView style={{ flex: 1, position: 'relative', }}>
            <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />

            {/* Top Bar */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: COLORS.white,
                    elevation: 4,
                }}>
                {/* Back Icon */}
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    onPress={() => navigation.goBack()}
                />

                {/* Title */}
                <Text style={{ fontSize: 16, marginLeft: 10 }}>{title}</Text>

                {/* questions num */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    {/* done */}
                    <View style={{
                        backgroundColor: COLORS.success,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}>
                        <MaterialIcons name="check" size={14} style={{ color: COLORS.white }} />
                        <Text style={{ color: COLORS.white, marginLeft: 6 }}>{questionNum}</Text>
                    </View>
                    {/* to do */}
                    <View
                        style={{
                            backgroundColor: COLORS.error,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                        }}>
                        <MaterialIcons name="close" size={14} style={{ color: COLORS.white }} />
                        <Text style={{ color: COLORS.white, marginLeft: 6 }}>
                            {questions.length - questionNum}
                        </Text>
                    </View>
                </View>
            </View>


            {/* Questions and Options list */}
            <FlatList
                data={questions}
                style={{ flex: 1, backgroundColor: COLORS.background }}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.question}
                renderItem={({ item, index }) => (
                    <View style={{
                        marginTop: 14,
                        marginHorizontal: 10,
                        backgroundColor: COLORS.white,
                        elevation: 2,
                        borderRadius: 2,
                    }}>
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 16 }}>{index + 1}.{item.question}</Text>
                            {
                                item.imageUrl != "" ? (
                                    <Image
                                        source={{
                                            uri: item.imageUrl
                                        }}
                                        resizeMode={'contain'}
                                        style={{
                                            width: '80%',
                                            height: 150,
                                            marginTop: 20,
                                            marginLeft: '10%',
                                            borderRadius: 5,
                                        }}
                                    />
                                ) : null
                            }
                        </View>

                        {/* Options */}
                        {item.type == "0" ? (item.option.map((option, optionIndex) => {
                            return (<TouchableOpacity
                                key={optionIndex}
                                style={{
                                    paddingVertical: 14,
                                    paddingHorizontal: 20,
                                    borderTopWidth: 1,
                                    borderColor: COLORS.border,
                                    backgroundColor: answers[index][optionIndex] ? (COLORS.success) : (COLORS.white),
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}

                                onPress={() => {
                                    //check did the question be selected before
                                    let isEmpty = true;
                                    answers[index].forEach(element => {
                                        if (element == true) isEmpty = false;
                                    });
                                    // increase count
                                    if (isEmpty) setQuestionNum(questionNum + 1);

                                    answers[index][optionIndex] = true

                                    for (let i = 0; i < answers[index].length; i++) {
                                        if (i != optionIndex) answers[index][i] = false;
                                    }

                                    let tempQuestions = [...questions];

                                    tempQuestions[index].selectedOption = true;

                                    setQuestions([...tempQuestions]);
                                }}>
                                <Text style={{
                                    width: 25,
                                    height: 25,
                                    padding: 2,
                                    borderWidth: 1,
                                    borderColor: COLORS.border,
                                    textAlign: 'center',
                                    marginRight: 16,
                                    borderRadius: 25,
                                    color: answers[index][optionIndex] ? (COLORS.white) : (COLORS.black),
                                }}>
                                    {optionIndex + 1}</Text>
                                <Text style={{ color: answers[index][optionIndex] ? (COLORS.white) : (COLORS.black) }}>{option}</Text>
                            </TouchableOpacity>)
                        })) : null}
                        {item.type == "1" ? (item.option.map((option, optionIndex) => {
                            return (
                                <TouchableOpacity
                                    key={optionIndex}
                                    style={{
                                        paddingVertical: 14,
                                        paddingHorizontal: 20,
                                        borderTopWidth: 1,
                                        borderColor: COLORS.border,
                                        backgroundColor: answers[index][optionIndex] ? (COLORS.success) : (COLORS.white),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}

                                    onPress={() => {
                                        // if (item.selectedOption) {
                                        //     return null;
                                        // }

                                        // Increase correct/incorrect count
                                        answers[index][optionIndex] = !answers[index][optionIndex]

                                        let isEmpty = true
                                        answers[index].forEach(element => {
                                            if (element) isEmpty = false;
                                        });

                                        if (!item.selectedOption) {
                                            setQuestionNum(questionNum + 1);
                                        }
                                        // if(item.selectedOption) setQuestionNum(questionNum + 1);
                                        // else setQuestionNum(questionNum - 1);

                                        let tempQuestions = [...questions];
                                        if (isEmpty) {
                                            setQuestionNum(questionNum - 1);
                                            tempQuestions[index].selectedOption = false;
                                        } else {
                                            tempQuestions[index].selectedOption = true;
                                        }
                                        // tempQuestions[index].selectedOption = true;
                                        // Alert.alert(tempQuestions[0].selectedOption.toString())
                                        setQuestions([...tempQuestions]);
                                    }}>
                                    <Text style={{
                                        width: 25,
                                        height: 25,
                                        padding: 2,
                                        borderWidth: 1,
                                        borderColor: COLORS.border,
                                        textAlign: 'center',
                                        marginRight: 16,
                                        borderRadius: 25,
                                        color: answers[index][optionIndex] ? (COLORS.white) : (COLORS.black),
                                    }}>
                                        {optionIndex + 1}</Text>
                                    <Text style={{ color: answers[index][optionIndex] ? (COLORS.white) : (COLORS.black) }}>{option}</Text>
                                </TouchableOpacity>
                            )
                        })) : null}
                        {item.type == "2" ? (item.option.map((option, optionIndex) => {})) : null}
                        {item.type == "3" ? (<Text>3</Text>) : null}


                        {/* {item.option.map((option, optionIndex) => {
                            return (
                                <TouchableOpacity
                                    key={optionIndex}
                                    style={{
                                        paddingVertical: 14,
                                        paddingHorizontal: 20,
                                        borderTopWidth: 1,
                                        borderColor: COLORS.border,
                                        backgroundColor: answers[index][optionIndex] ? (COLORS.success) : (COLORS.white),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                    }}

                                    onPress={() => {
                                        // if (item.selectedOption) {
                                        //     return null;
                                        // }

                                        // Increase correct/incorrect count
                                        answers[index][optionIndex] = !answers[index][optionIndex]
                                        
                                        let isEmpty = true
                                        answers[index].forEach(element => {
                                            if(element) isEmpty = false;
                                        });

                                        if (!item.selectedOption) {
                                            setQuestionNum(questionNum + 1);
                                        }
                                        // if(item.selectedOption) setQuestionNum(questionNum + 1);
                                        // else setQuestionNum(questionNum - 1);

                                        let tempQuestions = [...questions];
                                        if(isEmpty){
                                            setQuestionNum(questionNum - 1);
                                            tempQuestions[index].selectedOption = false;
                                        }else{
                                            tempQuestions[index].selectedOption = true;
                                        }
                                        // tempQuestions[index].selectedOption = true;
                                        // Alert.alert(tempQuestions[0].selectedOption.toString())
                                        setQuestions([...tempQuestions]);
                                    }}>
                                    <Text style={{
                                        width: 25,
                                        height: 25,
                                        padding: 2,
                                        borderWidth: 1,
                                        borderColor: COLORS.border,
                                        textAlign: 'center',
                                        marginRight: 16,
                                        borderRadius: 25,
                                        color: answers[index][optionIndex] ? (COLORS.white) : (COLORS.black),
                                    }}>
                                        {optionIndex + 1}</Text>
                                    <Text style={{ color: answers[index][optionIndex] ? (COLORS.white) : (COLORS.black) }}>{option}</Text>
                                </TouchableOpacity>
                            )
                        })} */}
                    </View>
                )}

                ListFooterComponent={() => (
                    <FormButton labelText='Submit' style={{ margin: 10 }}
                        handleOnPress={handleOnSubmit}
                    />
                )}
            />


        </SafeAreaView>
    )
}
export default PlayQuizScreen