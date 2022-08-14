import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FlashMsg({flash, setFlash}) {
	const bgColor = flash.success ? 'bg-brightGreen' : 'bg-brightRed';

	return (
		<div
			className={`z-10 min-w-max flex items-center gap-10 justify-between text-primary fixed py-3 px-5 rounded-lg shadow-lg left-1/2 -translate-x-1/2 bottom-12 ${bgColor}`}
		>
			{flash.msg}
			<FontAwesomeIcon
				icon={faTimes}
				className='cursor-pointer'
				onClick={() => setFlash({ show: false, msg: '', success: false })}
			/>
		</div>
	);
}
