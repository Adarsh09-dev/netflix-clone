import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyC_M4zlvYupwJhMAxug4mmM4kwzCcNDj78",
    authDomain: "netflix-clone-37338.firebaseapp.com",
    projectId: "netflix-clone-37338",
    storageBucket: "netflix-clone-37338.firebasestorage.app",
    messagingSenderId: "1090024714580",
    appId: "1:1090024714580:web:d53ead805316c804f958c1",
    measurementId: "G-C58YC5GQ5E"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        const user = res.user;

        await addDoc(collection(db, "user"),
            {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
        console.log("Signup successful!");

    } catch (error) {
        console.log(error);
        toast.error(error.code);

    }
}

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        console.log("Login successful!", res.user);

    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const logout = async () => {
    try {

        await signOut(auth);

        console.log("Logout successful!");

    } catch (error) {

        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

export { analytics, auth, db, login, signup, logout };