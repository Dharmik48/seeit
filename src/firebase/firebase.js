// FIREBASE IMPORTS
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAeN1qn2__7qUNjVky4EqnQyN-E-_VmmsA',
	authDomain: 'seeit-51d77.firebaseapp.com',
	projectId: 'seeit-51d77',
	storageBucket: 'seeit-51d77.appspot.com',
	messagingSenderId: '919059894715',
	appId: '1:919059894715:web:4389bfa653c002eed9349e',
	measurementId: 'G-NG8XJQPQWV',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const postsColRef = collection(db, 'posts');

export {db, auth, provider, storage, postsColRef}
