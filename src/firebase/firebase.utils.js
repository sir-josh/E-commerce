import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDFu7YgMs-BogprQGekDjaSw4RX9M45exo",
    authDomain: "crwn-db-551d2.firebaseapp.com",
    databaseURL: "https://crwn-db-551d2.firebaseio.com",
    projectId: "crwn-db-551d2",
    storageBucket: "crwn-db-551d2.appspot.com",
    messagingSenderId: "373423983592",
    appId: "1:373423983592:web:ec05c92675f313113c325d",
    measurementId: "G-N0SYH9S5C3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async(userAuth, additionalData) => { 
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }

    return userRef;
};

export const addCollectionsAndItems = async (collectionKeyName, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKeyName);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
}

export const getCurrentUser = () =>{
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;