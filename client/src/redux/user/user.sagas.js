import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";

//other sagas function, reusable function generator
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );

    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

//other sagas function, generator function
export function* signInWithGoogle() {
  try {
    const userPop = yield auth.signInWithPopup(googleProvider);
    const { user } = userPop;
    // console.log("this is user.saga// signInWithGoogle/ /userPop :", userPop);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

//other sagas function, generator function
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const userEmailAndPassword = yield auth.signInWithEmailAndPassword(
      email,
      password
    );
    // console.log(
    //   "this is user.saga// signInWithEmail/ /userEmailAndPassword :",
    //   userEmailAndPassword
    // );
    const { user } = userEmailAndPassword;
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}
//other sagas function, generator function
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    // console.log(
    //   "this is user.saga// isUserAuthenticated/ userAuth :",
    //   userAuth
    // );
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}
//other sagas function, generator function
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}
//other sagas function, generator function
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}
//other sagas function, generator function
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const userCreate = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const { user } = userCreate;
    // console.log("this is sign-up// auth.createUserWithEmail :", userCreate);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

//main function
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}
//main function
export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
//main function
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

//main function
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
//main function
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
//main function
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
