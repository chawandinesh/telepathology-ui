// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkl6dKLTwmws0LDximN5g3Sp3HeIRZqOA",
  authDomain: "telepathology-ui.firebaseapp.com",
  projectId: "telepathology-ui",
  storageBucket: "telepathology-ui.appspot.com",
  messagingSenderId: "335676926337",
  appId: "1:335676926337:web:e12075f561465cbebaa080"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage()