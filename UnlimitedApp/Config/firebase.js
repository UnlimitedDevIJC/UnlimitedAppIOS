import { initializeApp, firebase } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";




// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjB38BqwYIgrUKHv7eEffrqbCEInUZBpo",
  authDomain: "unlimitedfuture-772c5.firebaseapp.com",
  databaseURL: "https://unlimitedfuture-772c5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "unlimitedfuture-772c5",
  storageBucket: "unlimitedfuture-772c5.appspot.com",
  messagingSenderId: "555923754491",
  appId: "1:555923754491:web:398d61e2ec9ba2356f4f5e",
  measurementId: "G-D5LVW1D5CJ"
};

const app = initializeApp(firebaseConfig);
const firestore= getFirestore(app);
export const storage = getStorage(app);


export const auth = getAuth(app);
export default firestore;
