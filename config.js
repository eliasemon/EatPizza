import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFunctions } from 'firebase/functions';
export const firebaseConfig = {
  // apiKey: "AIzaSyC792GylNpvacFDj89j9W97jBYpq7fNNQE",
  // authDomain: "eatpizza-cdcd6.firebaseapp.com",
  // projectId: "eatpizza-cdcd6",
  // storageBucket: "eatpizza-cdcd6.appspot.com",
  // messagingSenderId: "388307025925",
  // appId: "1:388307025925:web:411d81b036bf74c64f9c6c",
  // measurementId: "G-46XPGHH7P6"
  //apiKey: "AIzaSyDFj6qQdYKlj-EJTgAdjFreU9CuIBijFck",
// authDomain: "eatpizza2-439c8.firebaseapp.com",
//  projectId: "eatpizza2-439c8",
//  storageBucket: "eatpizza2-439c8.appspot.com",
//  messagingSenderId: "1046079182430",
  //appId: "1:1046079182430:web:353d60443cfc4e7b5186cf",
//  measurementId: "G-56XRY7LQHS"

  };

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = initializeAuth(firebaseApp , {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const functions = getFunctions(firebaseApp);



// if(!firebase.apps.length){
//     firebase.initializeApp(firebaseConfig)
// }

