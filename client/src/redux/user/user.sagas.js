import { takeLatest, put, all, call } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { 
    signInSuccess, 
    signInFailure, 
    signOutSuccess, 
    signOutFailure,
    signUpSuccess,
    signUpFailure
} from "./user.actions";

export function* getSnapshotFromUserAuth(UserAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, UserAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailure(error));
    }  
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
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

export function* signOutUser(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp(userCredentials){
    const { payload: { email, password, displayName }} = userCredentials;
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({ userAuth: user, additionalData: {displayName}}))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInUserAfterSignUp({ payload: { userAuth, additionalData }}){
    yield getSnapshotFromUserAuth(userAuth, additionalData);
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onUserSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUser);
}

export function* onUserSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInUserAfterSignUp);
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onUserSignOutStart),
        call(onUserSignUpStart),
        call(onSignUpSuccess)
    ]);
}