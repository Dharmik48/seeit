import { useEffect, useState } from 'react';
// COMPONENTS
import { signInWithPopup, signOut } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import NewPost from './components/NewPost';
import Posts from './components/Posts';
import { auth, colRef, provider } from './firebase/firebase';
import useDarkMode from './hooks/useDarkMode';
import FlashMsg from './components/FlashMsg';
import Header  from './components/Header';

function App() {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);
	const [flash, setFlash] = useState({
		show: false,
		msg: '',
		success: false,
	});
	const [setTheme, colorTheme] = useDarkMode();

	useEffect(() => {
		onSnapshot(query(colRef, orderBy('createdAt', 'desc')), snapshot => {
			const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setPosts(data);
		});
	}, []);

	useEffect(() => {
		let timeout;
		if (flash.show) {
			timeout = setTimeout(() => setFlash({ show: false, msg: '' }), 5000);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [flash]);

	const signInWithGoogle = async () => {
		const data = await signInWithPopup(auth, provider);
		data &&
			setFlash(prevFlash => ({
				...prevFlash,
				show: true,
				msg: 'Signed In Successfully',
				success: 'true',
			}));
		const { uid, photoURL, email, displayName } = data.user;
		setUser({ uid, photoURL, email, displayName });
	};

	const signUserOut = () => {
		signOut(auth).then(() => {
			setUser(null);
			setFlash(prevFlash => ({
				...prevFlash,
				show: true,
				msg: 'Signed Out Successfully',
				success: true,
			}));
		});
	};

	return (
		<main className='w-full min-h-screen py-5 bg-secondary px-5 font-primary dark:bg-darkText'>
            <Header setTheme={setTheme} colorTheme={colorTheme} user={user} signInWithGoogle={signInWithGoogle} signUserOut={signUserOut} />
			<section className='max-w-xl mx-auto grid relative'>
				{flash.show && <FlashMsg flash={flash} setFlash={setFlash} />}
				{user && <NewPost />}
				<Posts posts={posts} currentUser={user} setFlash={setFlash} />
			</section>
		</main>
	);
}

export default App;
