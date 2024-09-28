// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore,addDoc,collection, getDoc, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0pRjX1S6fCnU4lXIcTZYE2k5Eg_qgh-w",
  authDomain: "groupsync-96180.firebaseapp.com",
  projectId: "groupsync-96180",
  storageBucket: "groupsync-96180.appspot.com",
  messagingSenderId: "835797552606",
  appId: "1:835797552606:web:804155d87f0cc0dc34214f"
};

firebase.initializeApp(firebaseConfig)
const db = getFirestore();

async function handleSignIn(name, uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) {
        const userData = (await docSnap).data();
        console.log("user exists");
        console.log(userData["name"]);
    } else {
        console.log("user does not exist");
        
        await setDoc(doc(db, "users", uid), {
            name: name,
            uid: uid,
            groups: [],
        });

        console.log("account created");
    }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { auth, provider, handleSignIn };