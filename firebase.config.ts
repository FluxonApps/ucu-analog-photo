import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXtt_3y0LDZkkek3FiW-Mqyse78WOMjg4",
  authDomain: "ucu-analog-photography.firebaseapp.com",
  projectId: "ucu-analog-photography",
  storageBucket: "ucu-analog-photography.appspot.com",
  messagingSenderId: "296094918538",
  appId: "1:296094918538:web:bab0fe09d473b899d9ca73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
