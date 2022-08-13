import { useEffect, useState } from 'react';
import {Routes, Route} from "react-router-dom";
import useFlash from "./hooks/useFlash.js";
// FIREBASE
import { signInWithPopup, signOut } from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import { auth, provider, db } from './firebase/firebase';
// COMPONENTS
import NewPost from './components/NewPost';
import Posts from './components/Posts';
import FlashMsg from './components/FlashMsg';
import Header  from './components/Header';
import ThemeToggle from "./components/ThemeToggle.jsx";
import PostDetail from "./components/PostDetail.jsx";

function App() {
	const [user, setUser] = useState(null);
	const [setFlash, flash] = useFlash();

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
      		<Header user={user} signInWithGoogle={signInWithGoogle} signUserOut={signUserOut} />
			<section className='max-w-xl mx-auto grid relative'>
				<ThemeToggle />
				{flash.show && <FlashMsg />}
				{user && <NewPost currentUser={user} />}
				<Routes>
					<Route exact path='/' element={<Posts currentUser={user} setFlash={setFlash} />} />
					<Route path='/posts/:postId' element={<PostDetail currentUser={user} setFlash={setFlash} />} />
				</Routes>
			</section>
		</main>
	);
}

export default App;
