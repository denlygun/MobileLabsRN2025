import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDivF10BaiOjVMnOSB6z5ljO3ulcGcZ6jg",
    authDomain: "lab04-7578a.firebaseapp.com",
    projectId: "lab04-7578a",
    storageBucket: "lab04-7578a.appspot.com",
    messagingSenderId: "828026691384",
    appId: "1:828026691384:ios:b9d29bdfb459dff105abcd"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;