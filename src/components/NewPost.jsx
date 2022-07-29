import { useState } from 'react';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { v4 } from 'uuid';

export default function NewPost() {
	const [imgUrl, setImgUrl] = useState('');

	function uploadImg(e) {
		if (!e.target.files[0]) return;

		const image = e.target.files[0];
		const imgRef = ref(storage, `/images/${v4()}`);
		uploadBytes(imgRef, image).then(async () => {
			const url = await getDownloadURL(imgRef);
			setImgUrl(url);
		});
	}

	return (
		<div className='bg-primary border border-[#ccc] rounded-lg shadow-lg'>
			<form>
				<input type='text' placeholder='New Post' />
				<input type='file' onChange={e => uploadImg(e)} />
			</form>
			{imgUrl && <img src={imgUrl} />}
		</div>
	);
}
