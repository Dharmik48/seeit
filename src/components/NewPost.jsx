import { useState } from 'react';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

export default function NewPost() {
	const [previewImgUrl, setPreviewImgUrl] = useState('');
	const [imgUrl, setImgUrl] = useState('');

	// function uploadImg(e) {
	// 	if (!e.target.files[0]) return;

	// 	const image = e.target.files[0];
	// 	const imgRef = ref(storage, `/images/${v4()}`);
	// 	uploadBytes(imgRef, image).then(async () => {
	// 		const url = await getDownloadURL(imgRef);
	// 		setImgUrl(url);
	// 	});
	// }

	function showImgPreview(e) {
		if (!e.target.files[0]) return;

		const img = e.target.files[0];
		const url = URL.createObjectURL(img);
		setPreviewImgUrl(url);
	}

	return (
		<div className='grid bg-primary border border-[#ccc] p-3 rounded-lg shadow-lg'>
			<form className='flex items-center border-2 border-secondary rounded-lg'>
				<FontAwesomeIcon icon={faAdd} size='lg' className=' p-2 lg:p-3' />
				<input
					type='text'
					placeholder='New Post'
					className='w-full bg-primary h-full p-2 lg:p-4 border-x-2 border-secondary focus:outline-none'
				/>
				<label htmlFor='imageUploadBtn' className='p-3 lg:p-3.5 cursor-pointer'>
					<FontAwesomeIcon icon={faImage} className='text-lg lg:text-xl' />
				</label>
				<input
					type='file'
					id='imageUploadBtn'
					className='hidden'
					onChange={e => showImgPreview(e)}
				/>
			</form>
			{previewImgUrl && (
				<>
					<div className='relative my-3'>
						<img src={previewImgUrl} className='w-full' />
						<FontAwesomeIcon
							icon={faTimesCircle}
							size='2xl'
							className='absolute top-3 right-3 cursor-pointer bg-primary aspect-square rounded-full text-[#181a1d]'
							onClick={() => setPreviewImgUrl('')}
						/>
					</div>
					<button className='border-2 border-secondary py-2 px-6 rounded-full justify-self-end transition-colors hover:bg-secondary'>
						Post
					</button>
				</>
			)}
		</div>
	);
}
