import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import 'firebase/compat/firestore';


export const firebaseConfig = {
    apiKey: "AIzaSyC792GylNpvacFDj89j9W97jBYpq7fNNQE",
    authDomain: "eatpizza-cdcd6.firebaseapp.com",
    projectId: "eatpizza-cdcd6",
    storageBucket: "eatpizza-cdcd6.appspot.com",
    messagingSenderId: "388307025925",
    appId: "1:388307025925:web:411d81b036bf74c64f9c6c",
    measurementId: "G-46XPGHH7P6"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}