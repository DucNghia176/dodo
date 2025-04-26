// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp2JR-gxY0dPtdbmtaP86xw3WP2vdIgXo",
  authDomain: "project-20225.firebaseapp.com",
  projectId: "project-20225",
  storageBucket: "project-20225.firebasestorage.app",
  messagingSenderId: "1000813459968",
  appId: "1:1000813459968:web:268c0172ba90b229c136e5",
  measurementId: "G-S3TCG07E9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getFirestore(app);
const analytics = getAnalytics(app);