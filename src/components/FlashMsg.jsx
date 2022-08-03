import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FlashMsg({ flash, setFlash }) {
	const bgColor = flash.success ? 'bg-brightGreen' : 'bg-brightRed';

	return (
		<div
			className={`max-w-fit flex items-center gap-10 justify-between text-primary  sticky py-3 px-5 rounded-lg shadow-lg top-5 mx-auto ${bgColor}`}
		>
			{flash.msg}
			<FontAwesomeIcon
				icon={faTimes}
				className='cursor-pointer'
				onClick={() => setFlash({ show: false, msg: '' })}
			/>
		</div>
	);
}
