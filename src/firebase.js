// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD6qYmhQpAqdf9WuiC8VrU7QovXPPcHcrU",
    authDomain: "groupsync2-67f21.firebaseapp.com",
    projectId: "groupsync2-67f21",
    storageBucket: "groupsync2-67f21.appspot.com",
    messagingSenderId: "59246062851",
    appId: "1:59246062851:web:22159c6fe154f50d460d36",
    measurementId: "G-X7P94NC66T"
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
    const groupName = getUID() + name;
    await setDoc(doc(db, "groups", groupName), {
        owner: getName(),
        name: name,
        members: [],
        busyDays: {},
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