import React, {useState, useRef, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddSeedScreen,
  ContactUsScreen,
  DonationScreen,
  HomeScreen,
  HelpScreen,
  ReviewScreen,
  EditScreen,
  UserDonationsScreen,
} from '../screens';
import SubStackNavigator from './SubStackNavigator'
import AdminManageUserStackNavigator from './AdminManageUserStackNavigator'
import {
  Text,
  Alert,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  Button,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../constants/theme';
import Controler from '../views/Controler';
import {signOut} from '../utils/auth';
import auth from '@react-native-firebase/auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {getUserInfoByEmail} from '../utils/database';
const Drawer = createDrawerNavigator();

// const Stack = createStackNavigator();

function AppStackNavigator({navigation}) {
  const [currentTab, setCurrentTab] = useState('0');
  //To get the current Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale initially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [currentUser, setCurrentUser] = useState(null);
  const [render, setRebder] = useState(false);

  const onAuthStateChanged = async user => {
    try {
        cur_user = await getUserInfoByEmail(user.email);
        setCurrentUser(cur_user)
    } catch (error) {
        console.log(error);
    }

    // await setCurrentUser(user);
    //   setRebder(true)
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props} style={{backgroundColor: '#dce7e9'}}>
        <DrawerItemList {...props} color="red" />
        <TouchableOpacity
          onPress={() => {
            try {
              signOut();
            } catch (error) {
              console.log(error);
            }
          }}
          style={{paddingVertical: 16}}>
          <Text style={{margin: 16, fontWeight: 'bold', color: '#161924'}}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Technical Support" component={HelpScreen} />
      <Drawer.Screen name="Donation" component={DonationScreen} />
      <Drawer.Screen name="Review" component={SubStackNavigator} />
      <Drawer.Screen name="Help" component={ContactUsScreen} />
      {currentUser?.email === 'zxy357038667@gmail.com' && (
        <Drawer.Screen name="AddSeed" component={AddSeedScreen} />
      )}
      {currentUser?.isAdmin === true && (
        <Drawer.Screen name="UserDonations" component={AdminManageUserStackNavigator} />
      )}
    </Drawer.Navigator>
  );
}

// return (
//     render?
//     <SafeAreaView style={styles.container}>
//         <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'}/>
//         <View style={{ justifyContent: "flex-start", padding: 15 }}>
//             <View style={{ flexGrow: 1, marginTop: 50 }}>
//                 {
//                     // Tab Bar Buttons....
//                 }
//                 {TabButton(currentTab, setCurrentTab, "Home", "home")}
//                 {TabButton(currentTab, setCurrentTab, "Donation", "chat")}
//                 {currentUser.email == 'zxy357038667@gmail.com' ? TabButton(currentTab, setCurrentTab, "AddSeed", "explore"):<></>}
//                 {TabButton(currentTab, setCurrentTab, "Contact Resource", "call")}
//                 {TabButton(currentTab, setCurrentTab, "Help", "help")}
//             </View>

//             <View>
//                 {TabButton(currentTab, setCurrentTab, "logOut", "logout")}
//             </View>

//         </View>

//         {
//             //Over lay View ...
//         }

//         <Animated.View style={{
//             flexDirection: 'column',
//             flexGrow: 1,
//             backgroundColor: 'white',
//             position: 'absolute',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             paddingHorizontal: 15,
//             paddingTop: 20,
//             borderRadius: showMenu ? 15 : 0,
//             // Transforming View..
//             transform: [
//                 { scale: scaleValue },
//                 { translateX: offsetValue }
//             ]
//         }}>
//             {
//                 //Men Button...
//             }

//             <Animated.View style={{
//                 transform: [{
//                     translateY: closeButtonOffset
//                 }],
//                 height: '100%',
//                 // backgroundColor: 'red',
//             }}>
//                 <View style={{
//                     // position: 'absolute',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     // paddingVertical: 20,
//                     // paddingHorizontal: 20,
//                     backgroundColor: COLORS.white,
//                     flex: 1
//                 }}>
//                     <TouchableOpacity onPress={() => {
//                         // Do Actions Here...
//                         // Scaling the view...
//                         Animated.timing(scaleValue, {
//                             toValue: showMenu ? 1 : 0.90,
//                             duration: 300,
//                             useNativeDriver: true
//                         })
//                             .start()

//                         Animated.timing(offsetValue, {
//                             toValue: showMenu ? 0 : 250,
//                             duration: 300,
//                             useNativeDriver: true
//                         })
//                             .start()

//                         Animated.timing(closeButtonOffset, {
//                             toValue: showMenu ? -30 : 0,
//                             duration: 300,
//                             useNativeDriver: true
//                         })
//                             .start()

//                         setShowMenu(!showMenu);
//                     }}>
//                         <MaterialIcons style={{ color: "black" }} name={showMenu ? "close" : "menu"} size={30} />

//                     </TouchableOpacity>
//                     <Text style={{ color: "black", fontSize: 24, fontWeight: 'bold' }}>Ube</Text>
//                     <TouchableOpacity onPress={() => {
//                         setCurrentTab("Home")
//                     }}>
//                         <MaterialIcons style={{ color: "black" }} name={"home"} size={30} />
//                     </TouchableOpacity>

//                 </View>
//                 <View style={{ flex: 9}}>
//                     <Controler current={currentTab}>
//                         <HomeScreen></HomeScreen>
//                         <ContactUsScreen></ContactUsScreen>
//                         <HelpScreen></HelpScreen>
//                         <DonationScreen></DonationScreen>
//                         <AddSeedScreen></AddSeedScreen>
//                     </Controler>
//                 </View>

//             </Animated.View>

//         </Animated.View>

//     </SafeAreaView>
//     :<></>
// );
// }

// const TabButton = (currentTab, setCurrentTab, title, iconName) => {
//     return (
//         <TouchableOpacity onPress={() => {
//             if (title == "logOut") {
//                 signOut();
//             } else {
//                 setCurrentTab(title)
//             }
//         }}>
//             <View style={{
//                 flexDirection: "row",
//                 alignItems: 'center',
//                 paddingVertical: 8,
//                 backgroundColor: currentTab == title ? 'white' : 'transparent',
//                 paddingLeft: 20,
//                 paddingRight: 30,
//                 borderRadius: 8,
//                 marginTop: 20,
//             }}>
//                 <MaterialIcons style={{ color: currentTab == title ? "#ADD8DB" : "black" }} name={iconName} size={24} />
//                 <Text style={{
//                     fontSize: 15,
//                     fontWeight: 'bold',
//                     paddingLeft: 15,
//                     color: currentTab == title ? "#ADD8DB" : "black"
//                 }}>{title}</Text>
//             </View>
//         </TouchableOpacity>
//     )
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8DB',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    color: '#161924',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default AppStackNavigator;
