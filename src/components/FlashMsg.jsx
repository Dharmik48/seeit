import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FlashMsg({ msg, setFlash }) {
	return (
		<div className='max-w-fit flex items-center gap-10 justify-between text-primary bg-brightRed sticky py-3 px-5 rounded-lg shadow-lg top-5 mx-auto'>
			{msg}
			<FontAwesomeIcon
				icon={faTimes}
				className='cursor-pointer'
				onClick={() => setFlash({ show: false, msg: '' })}
			/>
		</div>
	);
}
