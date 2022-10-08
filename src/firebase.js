// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAkDwzkeHUDhQPLv_Q50RXwL5-u4uiOgY0',
  authDomain: 'warriors-4610b.firebaseapp.com',
  projectId: 'warriors-4610b',
  storageBucket: 'warriors-4610b.appspot.com',
  messagingSenderId: '570610472445',
  appId: '1:570610472445:web:fa0208b055d0fa2315f594',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
