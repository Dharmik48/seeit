import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';

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

const colRef = collection(db, 'posts');

getDocs(colRef).then(snapshot => {
	const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
	console.log(data);
});

function App() {
	return <h1>SeeIt</h1>;
}

export default App;
