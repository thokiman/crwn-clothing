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

//seeding userAuth data to firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const collectionRef = firestore.collection("users");
  console.log(
    "this is firestore.collection('users')// query reference/ users :",
    collectionRef
  );
  const snapshotCollectionRef = await collectionRef.get();
  console.log(
    "this is collectionSnapshot object from firestore.collection('users')// snapshot",
    snapshotCollectionRef
  );
  const getDocumentSnapshotFromCollection = {
    collection: snapshotCollectionRef.docs.map((doc) => doc.data()),
  };
  console.log(
    "this is getDocumentSnapshotFromCollection object from firestore.collection('users')// getDocumentSnapshotFromCollection",
    getDocumentSnapshotFromCollection
  );

  console.log(
    "this is firestore.doc(users/userAuth.uid)// query reference/ userRef :",
    firestore.doc(`users/${userAuth.uid}`)
  );

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(
    "this is documentSnapshot object from firestore.doc(users/userAuth.uid)// snapshot :",
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
// seeding SHOP_DATA to firebase
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  //1.create new collections
  const collectionRef = firestore.collection(collectionKey);
  console.log(
    "this is firestore.collection(collectionKey)// collectionRef :",
    collectionRef
  );
  //call batch
  const batch = firestore.batch();
  objectToAdd.forEach((obj) => {
    //2.create new document with unique id
    const newDocRef = collectionRef.doc();
    console.log(
      "this is addCollectionAndDocument// collection.doc()/ :",
      newDocRef
    );
    // 3.set the actual value into document
    batch.set(newDocRef, obj);
  });
  //4.return promise after commit
  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title: title,
      items: items,
    };
  });
  console.log(
    "this is firebase utils// transformedCollection :",
    transformedCollection
  );

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
