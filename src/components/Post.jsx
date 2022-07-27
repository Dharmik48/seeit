// FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartFilled } from '@fortawesome/free-solid-svg-icons';

export default function Post({ data }) {
	return (
		<div className='bg-[#fff] border border-[#ccc] rounded-lg shadow-lg'>
			<div className='p-4'>
				<h1 className='mx-auto mb-5'>{data.title}</h1>
				<img src={data.img} className='mx-auto' alt={data.title} />
			</div>
			<div className='bg-primary px-4 py-2 rounded-lg'>
				<FontAwesomeIcon icon={heartOutline} />
			</div>
		</div>
	);
}
