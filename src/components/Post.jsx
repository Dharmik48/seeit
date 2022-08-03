import { useEffect, useState } from 'react';
// FIREBASE
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';

export default function Post({ data, currentUser: user, setFlash}) {
	const [isLiked, setIsLiked] = useState(data.likedBy.includes(user?.uid));

	useEffect(() => {
		setIsLiked(data.likedBy.includes(user?.uid));
	}, [user]);

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
		const docRef = doc(db, 'posts', data.id);

		let newIsLikedBy;

		!isLiked
			? (newIsLikedBy = [...data.likedBy, user?.uid])
			: (newIsLikedBy = data.likedBy.filter(u => u !== user?.uid));

		setIsLiked(prevIsLiked => !prevIsLiked);

		updateDoc(docRef, {
			likedBy: newIsLikedBy,
		});
	}

	return (
		<div
			className='bg-[#fff] border border-[#ccc] rounded-lg shadow-lg dark:bg-darkText 
		dark:border-darkText dark:rounded-lg'
		>
			<div className='p-4 wrapper'>
				<div>
					<img
						src={data.userPhoto}
						alt={data.userName || 'unknown'}
						className='userAvatar'
					/>
				</div>
				<div style={{margin: "auto auto auto 0"}}>
					<h1 className='postUserName dark:text-primary'>{data.userName}</h1>
				</div>
			</div>
			<div className='p-4'>
				<h1 className='mx-auto mb-5 dark:text-primary'>{data.title}</h1>
				<img src={data.img} className='mx-auto' alt={data.title} />
			</div>
			<div className='bg-primary px-4 py-2 rounded-lg flex items-center gap-1 dark:bg-darkText'>
				<FontAwesomeIcon
					icon={isLiked ? heartFilled : heartOutline}
					className={`cursor-pointer transition-colors ${
						isLiked ? 'text-brightRed' : 'hover:text-lightRed'
					}`}
					size='lg'
					onClick={likePost}
				/>
				<span className='font-primary'>{data.likedBy.length}</span>
			</div>
		</div>
	);
}
