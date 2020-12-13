import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDq1f5wsd-UE3niyumFdK2gBlUlgNMvvyk",
  authDomain: "crwn-db-ae76f.firebaseapp.com",
  projectId: "crwn-db-ae76f",
  storageBucket: "crwn-db-ae76f.appspot.com",
  messagingSenderId: "1046717103792",
  appId: "1:1046717103792:web:2806825794fc677bf68575",
  measurementId: "G-B86F20XYXV",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
