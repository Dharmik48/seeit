import { useState } from 'react';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export default function NewPost() {
	// const [files, setFiles] = useState([]);

	function setImg(e) {
		// const img = new Image();

		if (e.target.files.length > 0) {
			console.log(e.target.files[0]);
			console.log(URL.createObjectURL(e.target.files[0]));
		}
		// console.log(e.target.files[0]);
	}

	return (
		<div className='App'>
			{/* <FilePond
				files={files}
				onupdatefiles={setFiles}
				onpreparefile={setImg()}
				maxFiles={1}
				name='files'
				server='/'
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			/> */}
			<input type='file' onChange={e => setImg(e)} />
		</div>
	);
}
