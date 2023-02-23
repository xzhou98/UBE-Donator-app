import React, { useState, useRef, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestScreen, HomeScreen, CreateQuizScreen, AddQuestionScreen, PlayQuizScreen } from '../screens';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/theme';
import Controler from '../views/Controler';


const Stack = createStackNavigator();


function AppStackNavigator({ navigation }) {
    const [currentTab, setCurrentTab] = useState("0");
    //To get the current Status of menu ...
    const [showMenu, setShowMenu] = useState(false);

    // Animated Properties...
    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale initially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

    // useEffect(() => {
    //     navigation.navigate('PlayQuizScreen', {
    //            quizId: quiz.id,
    //          });
    // }, [currentTab])

    return (
        // <Stack.Navigator
        // screenOptions={{
        //     headerShown: false,
        // }}>
        //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
        //     <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
        //     <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />
        //     <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />



        // </Stack.Navigator>

        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: "flex-start", padding: 15 }}>
                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {
                        // Tab Bar Buttons....
                    }
                    {TabButton(currentTab, setCurrentTab, "Home", "home")}
                    {TabButton(currentTab, setCurrentTab, "Test", "reorder")}

                </View>

                <View>
                    {TabButton(currentTab, setCurrentTab, "logOut", "logout")}
                </View>

            </View>

            {
                //Over lay View ...
            }

            <Animated.View style={{
                flexGrow: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingHorizontal: 15,
                paddingVertical: 20,
                borderRadius: showMenu ? 15 : 0,
                // Transforming View..
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }}>

                {
                    //Men Button...
                }

                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <TouchableOpacity onPress={() => {
                        // Do Actions Here...
                        // Scaling the view...
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.90,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(offsetValue, {
                            toValue: showMenu ? 0 : 250,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        Animated.timing(closeButtonOffset, {
                            toValue: showMenu ? -30 : 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                            .start()

                        setShowMenu(!showMenu);
                    }}>
                        <MaterialIcons style={{ color: "black", paddingTop: 30, }} name={showMenu ? "close" : "reorder"} size={24} />

                    </TouchableOpacity>
                    <Controler current={currentTab}>
                        <HomeScreen></HomeScreen>
                        <TestScreen></TestScreen>
                        {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 20, }}> 1 </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 20, }}> 2 </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', paddingTop: 20, }}> 3 </Text> */}
                    </Controler>

                    {/* <NavigationContainer>
                    <Stack.Navigator initialRouteName="HomeScreen">
                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                        <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
                        <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />
                        <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />
                    </Stack.Navigator>
                    </NavigationContainer> */}

                </Animated.View>

            </Animated.View>

        </SafeAreaView>

    );
}

const TabButton = (currentTab, setCurrentTab, title, iconName) => {
    return (
        <TouchableOpacity onPress={() => {
            if (title == "logOut") {

            } else {
                switch (title) {
                    case 'Home':
                        setCurrentTab('0')
                        break;
                    case 'Test':
                        setCurrentTab('1')
                        break;
                    default:
                        break;
                }
                // setCurrentTab(title)
            }
        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == title ? 'white' : 'transparent',
                paddingLeft: 20,
                paddingRight: 30,
                borderRadius: 8,
                marginTop: 20,
            }}>
                <MaterialIcons style={{ color: currentTab == title ? "#ADD8DB" : "black" }} name={iconName} size={24} />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#ADD8DB" : "black"
                }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ADD8DB",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
})

export default AppStackNavigator