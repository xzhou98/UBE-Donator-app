import { createContext, useEffect, useState } from "react";
import { getUserInfoByEmail } from '../utils/database';
// import { auth } from "@react-native-firebase/auth";
// import firestore from '@react-native-firebase/firestore';
// import { onAuthStateChanged } from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();

    // useEffect(() => {
    //   const unsub = onAuthStateChanged(auth, async (user) => {
    //     // if(user === null){
    //     //   setCurrentUser(user);
    //     // }else{
    //     //   try {
    //     //     firestore().collection("Users").where("email", "==", user.email).get().then(querySnapshot =(doc)=> {
    //     //         user.isAdmin = doc.data().isAdmin;
    //     //         user.id = doc.id;
    //     //     });
    //     //     setCurrentUser(user);
    //     //   } catch (error) {
    //     //     console.log(error);
    //     //   }
    //     // }
    //   }, []);

    //   return () => {
    //     unsub();
    //   };
    // });

    const getUserInfo = async () => {
        try {
            let a = await getUserInfoByEmail(auth().currentUser.email);
            setCurrentUser(a);
        } catch (error) {
            setCurrentUser({})
            console.log(error);
        }
    }
    useEffect(async () => {
        getUserInfo();
    }, [])

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

