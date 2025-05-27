import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9ln4K_zylNjFEwksRg8u-H6ozraziQXU",
  authDomain: "lab06-1d16c.firebaseapp.com",
  projectId: "lab06-1d16c",
  storageBucket: "lab06-1d16c.firebasestorage.app",
  messagingSenderId: "529087976065",
  appId: "1:529087976065:web:f7e76a6631cc3a6c0ab380"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
