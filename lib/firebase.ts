// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDajJP6igQu0MSSPGLqIkJxW9Ymco1X53E",
  authDomain: "x-1dc53.firebaseapp.com",
  projectId: "x-1dc53",
  storageBucket: "x-1dc53.firebasestorage.app",
  messagingSenderId: "229055473877",
  appId: "1:229055473877:web:6a988d6da8d95ad21d9a5c",
  measurementId: "G-9G6V24J9VL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth = getAuth(app);

 export { auth }