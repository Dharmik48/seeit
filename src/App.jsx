import { useEffect, useState } from 'react';
// COMPONENTS
import { signInWithPopup, signOut } from 'firebase/auth';
import {addDoc, doc, onSnapshot, orderBy, query, setDoc} from 'firebase/firestore';
import NewPost from './components/NewPost';
import Posts from './components/Posts';
import { auth, postsColRef, usersColRef, provider, db } from './firebase/firebase';
import useDarkMode from './hooks/useDarkMode';
import FlashMsg from './components/FlashMsg';
import Header  from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

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
		onSnapshot(query(postsColRef, orderBy('createdAt', 'desc')), snapshot => {
			const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setPosts(data);
		});
	}, []);

	useEffect(() => {
		let timeout;
		if (flash.show) {
			timeout = setTimeout(() => setFlash({ show: false, msg: '', success: false }), 5000);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [flash]);

	const signInWithGoogle = async () => {
		const data = await signInWithPopup(auth, provider);
		const { uid, photoURL, email, displayName } = data.user;
		const userRef = doc(db, 'users', uid);

		setDoc(userRef, {uid, photoURL, email, displayName})
			.then(() => {
				setFlash(prevFlash => ({
					...prevFlash,
					show: true,
					msg: 'Signed In Successfully',
					success: true,
			}));
		})
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
				<div className={`max-w-fit ml-auto ${user && 'mb-5'}`}>
					<label
						className='relative py-1 px-1.5 w-14 grid items-center h-7 bg-primary rounded-full cursor-pointer'
						htmlFor='themeCheckbox'
						onClick={() => setTheme(colorTheme)}
					>
						<FontAwesomeIcon
							icon={colorTheme === 'light' ? faMoon : faSun}
							className={`h-5 aspect-square rounded-full transition-transform ${
								colorTheme === 'light' ? 'translate-x-0.5' : 'translate-x-6'
							}`}
						/>
					</label>
					<input
						type='checkbox'
						id='themeCheckbox'
						className='opacity-0 absolute'
					/>
				</div>
				{flash.show && <FlashMsg flash={flash} setFlash={setFlash} />}
				{user && <NewPost currentUser={user} />}
				<Posts posts={posts} currentUser={user} setFlash={setFlash} />
			</section>
		</main>
	);
}

export default App;
