import {takeLatest, call, put, all} from 'redux-saga/effects'

import UserActionTypes from '../user/user.types'
import {clearCart} from './cart-actions'
import { onSignoutStart } from '../user/user.saga'

export function* clearCartonSignout(){
    yield put(clearCart())
}

export function* onSignOutSuccess(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartonSignout)
}

export function* cartSagas(){
    yield all([call(onSignOutSuccess)])
}