import { createContext, useEffect, useState } from "react";
// import { auth } from "@react-native-firebase/auth";
// import firestore from '@react-native-firebase/firestore';
// import { onAuthStateChanged } from "@react-native-firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({ id: 1 });

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
    useEffect(() => {
        const unsub = () => {
            setCurrentUser({ id: 2 });
        }
        return () => {
            unsub();
        };
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

