import {useEffect, useState} from "react";
import {onSnapshot, orderBy, query} from "firebase/firestore";
import {postsColRef} from "../firebase/firebase.js";
import Post from './Post';

export default function Posts({ currentUser, setFlash }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		onSnapshot(query(postsColRef, orderBy('createdAt', 'desc')), snapshot => {
			const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
			setPosts(data);
		});
	}, []);

	const renderPosts = () =>
		posts.map(post => (
			<Post
				data={post}
				currentUser={currentUser}
				setFlash={setFlash}
				key={post.id}
			/>
		));

	return (
		<section className='grid gap-5 font-light mt-5 lg:mt-10 dark:bg-darkText'>
			{renderPosts()}
		</section>
	);
}
