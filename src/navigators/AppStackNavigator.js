import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestScreen, HomeScreen, CreateQuizScreen, AddQuestionScreen, PlayQuizScreen } from '../screens';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../constants/theme';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AppStackNavigator() {
    return (
        // <Stack.Navigator
        //     screenOptions={{
        //         headerShown: false,
        //     }}>

        //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
        //     <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
        //     <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />
        //     <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />
        // </Stack.Navigator>

        // <View style={styles.container}>
        //     <SafeAreaView style={{ flex: 1 }}>
        //         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        //             paddingVertical: 10, paddingHorizontal: 20, backgroundColor: COLORS.white, elevation: 4,
        //         }}>
        //             <TouchableOpacity style={{ flex: 1 }} >
        //                 <MaterialIcons name="home" size={30} color="#161924" />
        //             </TouchableOpacity>

        //             <Text style={{ fontSize: 24 }}>Ube</Text>

        //             <TouchableOpacity style={{ alignItems: "flex-end", flex: 1 }} >
        //                 <MaterialIcons name="reorder" size={30} color="#161924" />
        //             </TouchableOpacity>
        //         </View>

        //         <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        //             <Text style={styles.text}>Home Page</Text>
        //         </View>
        //     </SafeAreaView>
        // </View>
        <Drawer.Navigator>
            <Drawer.Screen name="test" component={TestScreen} />
            <Drawer.Screen name="HomeScreen" component={HomeScreen} />
            
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
})

export default AppStackNavigator