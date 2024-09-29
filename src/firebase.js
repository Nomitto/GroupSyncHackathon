// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6kszWeTFwMqnvPx_01Y_47Cjzs65Pufg",
    authDomain: "groupsync3-2bcd1.firebaseapp.com",
    projectId: "groupsync3-2bcd1",
    storageBucket: "groupsync3-2bcd1.appspot.com",
    messagingSenderId: "25760581876",
    appId: "1:25760581876:web:ed9f386f99a984b11336a1",
    measurementId: "G-PJZLXMYQ44"
};

firebase.initializeApp(firebaseConfig)
const db = getFirestore();

function getUID() {
    const user = getAuth(app).currentUser;
    return user.uid;
}

function getUser() {
    return getAuth(app).currentUser;
}

function getName() {
    const user = getAuth(app).currentUser;
    return user.displayName;
}

async function getGroups() {
    const docSnap = getDoc(doc(db, "users", getUID()));
    const data = (await docSnap).data();
    const groupArr = data["groups"];

    return groupArr;
}

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
            busyDays: [],
        });

        console.log("account created");
    }
}

async function handleCreateGroup(name) {
    const groupName = name; // getUID() + name;

    // await setDoc(doc(db, "groups", groupName), {
    //     owner: getName(),
    //     name: name,
    //     members: [],
    //     busyDays: {},
    // })

    await setDoc(doc(db, "chats", groupName), {
        messages: []
    })

    const currUserDoc = (await getDoc(doc(db, "users", getUID()))).data()
    const currGroups =  currUserDoc["groups"]
    currGroups.push(groupName)

    await setDoc(doc(db, "users", getUID()), {
        name: getName(),
        uid: getUID(),
        groups: currGroups
    })
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { auth, provider, handleSignIn, handleCreateGroup, getGroups, getUID, getName, getUser };