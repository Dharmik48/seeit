import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
// FIREBASE
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart as heartOutline, faMessage, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faHeart as heartFilled} from '@fortawesome/free-solid-svg-icons';

export default function Post({ data, currentUser: user, setFlash}) {
	const [isLiked, setIsLiked] = useState(false);
	const [docRef, setDocRef] = useState({});
	const [postOwner, setPostOwner] = useState({});

	useEffect(() => {
		setIsLiked(data.likedBy.includes(user?.uid));
	}, [user]);

	useEffect(() => {
		setDocRef(doc(db, 'posts', data.id))

		getDoc(doc(db, 'users', data.uid))
			.then(data => setPostOwner(data.data()))
	}, [])

	function likePost() {
		if (!user) {
			setFlash(prevFlash => ({
				...prevFlash,
				show: true,
				msg: 'Please Sign In first!',
				success: false,
			}));
			return;
		}

		let newIsLikedBy;
		!isLiked
			? (newIsLikedBy = [...data.likedBy, user?.uid])
			: (newIsLikedBy = data.likedBy.filter(u => u !== user?.uid));

		setIsLiked(prevIsLiked => !prevIsLiked);

		updateDoc(docRef, {
			likedBy: newIsLikedBy,
		});
	}

	function deletePost() {
		deleteDoc(docRef)
			.then(() => {
				setFlash(prevFlash => ({...prevFlash, show: true, success: true, msg: "Post deleted"}))
			})
	}

	return (
		<div
			className='bg-[#fff] border border-[#ccc] rounded-lg shadow-lg dark:bg-darkText
		dark:border-darkText'
		>
			<div className='p-4 flex flex-col items-start gap-5'>
				<div className='w-full flex items-center gap-2'>
					<img
						src={postOwner.photoURL}
						alt={postOwner.displayName || 'unknown'}
						className='h-10 aspect-square'
					/>
					<h1 className='w-full text-sm dark:text-primary'>{postOwner.displayName}</h1>
				</div>
				<h1 className='dark:text-primary'>{data.title}</h1>
				<img src={data.img} className='mx-auto' alt={data.title} />
			</div>
			<div className='flex items-center justify-between px-4 py-2 rounded-lg flex items-center gap-1 dark:bg-darkText'>
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-0.5'>
						<FontAwesomeIcon
							icon={isLiked ? heartFilled : heartOutline}
							className={`cursor-pointer transition-colors dark:text-primary ${
								isLiked ? 'text-brightRed' : 'hover:text-lightRed'
							}`}
							size='lg'
							onClick={likePost}
						/>
						<span className='font-primary dark:text-primary'>{data.likedBy.length}</span>
					</div>
					<Link to={`/posts/${data.id}`} className='flex items-center gap-0.5'>
						<FontAwesomeIcon icon={faMessage} className='cursor-pointer dark:text-primary' />
						<span className='font-primary dark:text-primary'>{data.likedBy.length}</span>
					</Link>
				</div>
				{postOwner.uid === user?.uid &&
					<FontAwesomeIcon icon={faTrashAlt} className='cursor-pointer dark:text-primary' onClick={() => deletePost()}/>
				}
			</div>
		</div>
	);
}
