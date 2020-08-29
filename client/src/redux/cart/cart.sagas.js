import { takeLatest, call, put, all } from "redux-saga/effects";

import { UserActionTypes } from "../user/user.types";
import { clearCart } from "./cart.actions";

export function* clearOutCart(){
    yield put(clearCart());
}

export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearOutCart);
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess)])
}