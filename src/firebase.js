// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";
import { gapi } from "gapi-script";

const API_KEY = "AIzaSyBqy78XyR_vlenpR9IxSbrW_QNAPxq2jPI";
const CLIENT_ID =
  "357613363605-s18klentru09gkgdjcqeo8q1k57r1hi1.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

async function initializeGapiClient() {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
          scope: SCOPES,
        })
        .then(() => {
          console.log("GAPI client initialized");
          resolve();
        })
        .catch((error) => {
          console.error("Error initializing GAPI client", error);
          reject(error);
        });
    });
  });
}

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0pRjX1S6fCnU4lXIcTZYE2k5Eg_qgh-w",
  authDomain: "groupsync-96180.firebaseapp.com",
  projectId: "groupsync-96180",
  storageBucket: "groupsync-96180.appspot.com",
  messagingSenderId: "835797552606",
  appId: "1:835797552606:web:804155d87f0cc0dc34214f",
};

firebase.initializeApp(firebaseConfig);
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

async function getDays() {
  await initializeGapiClient();
  await gapi.auth2.getAuthInstance().signIn();
  const events = await new Promise((resolve, reject) => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        resolve(response.result.items);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const days = events.map((event) => {
    return new Date(
      event.start.dateTime || event.start.date
    ).toLocaleDateString();
  });

  const currUserDoc = (await getDoc(doc(db, "users", getUID()))).data();
  const currGroups = currUserDoc["groups"];

  for (let i = 0; i < currGroups.length; i++) {
    const groupDoc = (await getDoc(doc(db, "groups", currGroups[i]))).data();
    const groupDays = groupDoc["busyDays"];

    groupDays[getUID()] = days;

    await setDoc(doc(db, "groups", currGroups[i]), {
      owner: groupDoc["owner"],
      name: groupDoc["name"],
      members: groupDoc["members"],
      busyDays: groupDays,
    });
  }

  return days;
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
      busyDays: [await getDays()],
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
  });

  const currUserDoc = (await getDoc(doc(db, "users", getUID()))).data();
  const currGroups = currUserDoc["groups"];
  currGroups.push(groupName);

  await setDoc(doc(db, "users", getUID()), {
    name: getName(),
    uid: getUID(),
    groups: currGroups,
  });
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  handleSignIn,
  handleCreateGroup,
  getGroups,
  getUID,
  getName,
};
