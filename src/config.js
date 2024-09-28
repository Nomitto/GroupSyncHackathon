// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };