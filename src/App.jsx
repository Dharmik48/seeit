// COMPONENTS
import Posts from './components/Posts';
// FIREBASE IMPORTS
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import NewPost from './components/NewPost';

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

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getDocs(colRef).then(snapshot => {
			const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setPosts(data);
		});
	}, []);

	return (
		<main className='w-full min-h-screen py-5 bg-secondary px-5 font-primary'>
			<section className='max-w-xl mx-auto'>
				<h1 className='text-2xl'>👀 SeeIt</h1>
				<NewPost />
				<Posts posts={posts} />
			</section>
		</main>
	);
}

export default App;
