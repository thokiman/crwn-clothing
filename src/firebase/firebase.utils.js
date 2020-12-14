//<1>
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
//<1>
//<3>
//signup and signin google account
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  console.log(
    "this is firestore.doc(users/userAuth.uid)// query reference/ userRef :",
    firestore.doc(`users/${userAuth.uid}`)
  );
  console.log(
    "this is firestore.collection('users')// query reference/ users :",
    firestore.collection("users")
  );
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(
    "this is snapshot object from firestore.doc(users/userAuth.uid)// snapshot :",
    snapShot
  );
  if (!snapShot.exist) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (e) {
      console.log("error creating user :", e.message);
    }
  }
  return userRef;
};
//<3>
//<1>
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
//<1>
