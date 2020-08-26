import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";
import { auth, googleProvider, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure } from "./user.actions";

export function* getSnapshotFromUserAuth(UserAuth){
    try{
        const userRef = yield call(createUserProfileDocument, UserAuth);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error));
    }  
}

export function* signInWithGoogle(){
    try {
        const AuthenticatedUser = yield auth.signInWithPopup(googleProvider);
        const { user } = AuthenticatedUser;
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password}}){
    try {
        const AuthenticatedUser = yield auth.signInWithEmailAndPassword(email,password);
        const { user } = AuthenticatedUser;
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
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