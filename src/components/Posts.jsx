import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {doc, getDoc, onSnapshot, orderBy, query} from "firebase/firestore";
import {db, postsColRef} from "../firebase/firebase.js";
import Post from './Post';

export default function Posts({ currentUser, setFlash }) {
	const [posts, setPosts] = useState([]);
	const {postId} = useParams();

	useEffect(() => {
		if (!postId) {
			onSnapshot(query(postsColRef, orderBy('createdAt', 'desc')), snapshot => {
				const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
				setPosts(data);
			});
		} else {
			getDoc(doc(db, 'posts', postId))
				.then(data => setPosts([{...data.data(), id:postId}]))
		}
	}, [postId]);

	const renderPosts = () =>
		posts.map(post => (
			<Post
				data={post}
				currentUser={currentUser}
				setFlash={setFlash}
			/>
		));

	return (
		<section className='grid gap-5 font-light mt-5 lg:mt-10 dark:bg-darkText'>
			{renderPosts()}
		</section>
	);
}
