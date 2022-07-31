import { useEffect, useState } from 'react';
// FIREBASE
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';

export default function Post({ data, currentUser: user }) {
	const [isLiked, setIsLiked] = useState(data.likedBy.includes(user?.uid));

	// console.log(data.likedBy.includes(user?.uid));

	useEffect(() => {
		setIsLiked(data.likedBy.includes(user?.uid));
	}, [user]);

	function likePost() {
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
		<div className='bg-[#fff] border border-[#ccc] rounded-lg shadow-lg'>
			<div className='p-4'>
				<h1 className='mx-auto mb-5'>{data.title}</h1>
				<img src={data.img} className='mx-auto' alt={data.title} />
			</div>
			<div className='bg-primary px-4 py-2 rounded-lg'>
				<FontAwesomeIcon
					icon={isLiked ? heartFilled : heartOutline}
					className={`cursor-pointer transition-colors ${
						isLiked ? 'text-brightRed' : 'hover:text-lightRed'
					}`}
					size='lg'
					onClick={likePost}
				/>
				{data.likedBy.length}
			</div>
		</div>
	);
}
