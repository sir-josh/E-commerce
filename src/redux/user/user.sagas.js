import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";
import { auth, googleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";
import { googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure } from "./user.actions";

export function* signInWithGoogle(){
    try {
        const AuthenticatedUser = yield auth.signInWithPopup(googleProvider);
        const { user } = AuthenticatedUser;
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password}}){
    yield console.log("here");
    try {
        const AuthenticatedUser = yield auth.signInWithEmailAndPassword(email,password);
        const { user } = AuthenticatedUser;
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(emailSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(emailSignInFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas(){
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}