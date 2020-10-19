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

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
    const collectionRef = firestore.collection(collectionKey)

    const batch = firestore.batch()
    objectsToAdd.forEach(obj=>{
      const newDocRef = collectionRef.doc()
      batch.set(newDocRef, obj)
    })
    return await batch.commit()
  }

  export const convertCollectionsSnapshotToMap = (collections)=>{
    const transformedCollections = collections.docs.map(doc => {
      const {title, items} = doc.data()
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    })

  return transformedCollections.reduce((acumulator, collection)=>{
      acumulator[collection.title.toLowerCase()] = collection
      return acumulator
    },{})
  }

  export const getCurrentUser = () =>{
    return new Promise((resolve, reject)=>{
      const unsubscribe = auth.onAuthStateChanged(userAuth=>{
        unsubscribe()
        resolve(userAuth)
      }, reject)
    })
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  export const googleProvider = new firebase.auth.GoogleAuthProvider()
  googleProvider.setCustomParameters({prompt:'select_account'})

  export const signedInWithGoogle = ()=> auth.signInWithPopup(googleProvider)

  export default firebase