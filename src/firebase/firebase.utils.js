import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyD5RcSqDAdCS4ELn-qKZNMXJBtKKc-s6W8",
    authDomain: "crwn-db-2fc7e.firebaseapp.com",
    databaseURL: "https://crwn-db-2fc7e.firebaseio.com",
    projectId: "crwn-db-2fc7e",
    storageBucket: "crwn-db-2fc7e.appspot.com",
    messagingSenderId: "870618404906",
    appId: "1:870618404906:web:67a13e0b16b98af4d0cb53",
    measurementId: "G-BBPPVY0JP0"
  }

  export const createUserProfileDocument = async (userAuth, aditionalData)=>{
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()
    
    if(!snapShot.exists){
      const {displayName, email} = userAuth
      const createdAt = new Date()
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...aditionalData
        })
      }
      catch(error){
        console.log('error creating user', error.message)
      }
    }
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt:'select_account'})

  export const signedInWithGoogle = ()=> auth.signInWithPopup(provider)

  export default firebase