import { useEffect, useState } from 'react';
// COMPONENTS
import Posts from './components/Posts';
import NewPost from './components/NewPost';
import { getDocs } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth';
import { colRef, auth, provider } from './firebase/firebase';

function App() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		getDocs(colRef).then(snapshot => {
			const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setPosts(data);
		});
	}, []);

	const signInWithGoogle = async () => {
		const data = await signInWithPopup(auth, provider);
		const { uid, photoURL, email, displayName } = data.user;
		setUser({ uid, photoURL, email, displayName });
	};

	return (
		<main className='w-full min-h-screen py-5 bg-secondary px-5 font-primary'>
			<header className='max-w-3xl flex items-center justify-between mx-auto mb-5 border-b border-darkText pb-3 lg:pb-5'>
				<h1 className='text-2xl'>👀 SeeIt</h1>
				{!user ? (
					<button
						onClick={() => signInWithGoogle()}
						className='border border-darkText rounded-full py-1.5 px-4 hover:bg-darkText hover:text-primary transition-colors focus:bg-darkText focus:text-primary focus:outline-none'
					>
						Sign In
					</button>
				) : (
					<img
						src={user.photoURL}
						className='max-h-8 lg:max-h-10'
						alt={user.displayName}
					/>
				)}
			</header>
			<section className='max-w-xl mx-auto grid gap-5'>
				{user && <NewPost />}
				<Posts posts={posts} />
			</section>
		</main>
	);
}

export default App;
