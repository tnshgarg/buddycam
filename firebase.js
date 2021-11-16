import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7tfJoCcMVfbJoj3BrntLTYIauOF4y0qk",
  authDomain: "buddy-app-2.firebaseapp.com",
  projectId: "buddy-app-2",
  storageBucket: "buddy-app-2.appspot.com",
  messagingSenderId: "228500662086",
  appId: "1:228500662086:web:acbcdb18fb4a74eb95e747",
  measurementId: "G-3DK6FCR6K5",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
