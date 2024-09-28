// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

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

function getUID() {
    const user = getAuth(app).currentUser;
    return user.uid;
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

export { auth, provider, handleSignIn, handleCreateGroup, getGroups, getUID, getName };