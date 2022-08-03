import { useEffect, useState } from 'react';
// COMPONENTS
import { signInWithPopup, signOut } from 'firebase/auth';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import NewPost from './components/NewPost';
import Posts from './components/Posts';
import { auth, colRef, provider } from './firebase/firebase';
import useDarkMode from './hooks/useDarkMode';
import FlashMsg from './components/FlashMsg';

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
			<header
				className={`max-w-3xl flex items-center justify-between mx-auto border-b border-darkText pb-3 lg:pb-5 ${
					user && 'mb-5 lg:mb-10'
				}`}
			>
				<h1 className='text-2xl dark:text-primary'>👀 SeeIt</h1>
				<div className='flex items-center'>
					<label
						className='flex items-center'
						onClick={() => setTheme(colorTheme)}
					>
						<input type='checkbox' className='' />
					</label>
				</div>
				{!user ? (
					<button
						onClick={() => signInWithGoogle()}
						className='border border-darkText rounded-full py-1.5 px-4 hover:bg-darkText hover:text-primary transition-colors focus:bg-darkText focus:text-primary focus:outline-none dark:text-primary dark:bg-darkText
            dark:hover:bg-darkText dark:hover:text-primary dark:border-primary'
					>
						Sign In
					</button>
				) : (
					<div className='flex items-center gap-3.5 lg:gap-5'>
						<span
							className='cursor-pointer dark:text-primary'
							onClick={signUserOut}
						>
							Sign out
						</span>
						<img
							src={user.photoURL}
							className='max-h-8 lg:max-h-10 rounded-full'
							alt={user.displayName}
						/>
					</div>
				)}
			</header>
			<section className='max-w-xl mx-auto grid relative'>
				{flash.show && <FlashMsg flash={flash} setFlash={setFlash} />}
				{user && <NewPost currentUser={user} />}
				<Posts posts={posts} currentUser={user} setFlash={setFlash} />
			</section>
		</main>
	);
}

export default App;
