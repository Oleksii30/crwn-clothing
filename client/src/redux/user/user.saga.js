import {takeLatest, call, put, all} from 'redux-saga/effects'

import UserActionTypes from './user.types'
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils'
import {signinSuccess, signinFailure, signoutFailure, signoutSuccess, signupSuccess,signupFailure} from './user.actions'

export function* getSnapshotFromUserAuth (userAuth, aditionalData){
    try{
    const userRef = yield call(createUserProfileDocument, userAuth, aditionalData) 
        console.log('userRef',userRef)       
        const userSnapshot = yield userRef.get()        
        yield put(signinSuccess({id:userSnapshot.id, ...userSnapshot.data()})) 
    }catch(error){
        yield put(signinFailure(error))
    }
}

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider) 
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signinFailure(error))
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInWithGoogle)
}

export function* signInWithEmail({payload:{email, password}}){
 try{
    const {user} = yield auth.signInWithEmailAndPassword(email,password)
    yield getSnapshotFromUserAuth(user)
 }catch(error){
    yield put(signinFailure(error))
 }
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail)
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser()
        if (!userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
    }catch(error){
        yield put(signinFailure(error))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut(){
    try{
        yield auth.signOut()
        yield put(signoutSuccess()) 
    }catch(error){
        yield put(signoutFailure(error))
    }
}

export function* onSignoutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* signUp({payload:{email,password,displayName}}){
   try{
    const {user} = yield auth.createUserWithEmailAndPassword(email,password)
    yield getSnapshotFromUserAuth (user, {displayName})
   
   }catch(error){
    yield put(signupFailure(error))
   }
}

export function* onSignupStart(){
    yield takeLatest(UserActionTypes.SIGNUP_START, signUp) 
}

export function* userSagas (){
    yield all([call(onGoogleSignInStart), 
               call(onEmailSignInStart),
               call(onCheckUserSession),
               call(onSignoutStart),
               call(onSignupStart)])
}

