// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//need function to connect to firestore
import {getFirestore} from 'firebase/firestore';

//need to set up auth
import {getAuth} from 'firebase/auth'

//need stuff for storage
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsm7Fv-jtBDcvMthCSSMjXw2YRlZjV2Xw",
  authDomain: "fir-blog-f9947.firebaseapp.com",
  projectId: "fir-blog-f9947",
  storageBucket: "fir-blog-f9947.appspot.com",
  messagingSenderId: "423771355747",
  appId: "1:423771355747:web:073dcaa3cc924224509656"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//set up database and export it
export const db = getFirestore(app)

//activate auth
export const auth = getAuth(app)

//activate storage
export const storage = getStorage(app)