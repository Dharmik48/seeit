export default function Post({ data }) {
	return (
		<div className='border-[#ccc] border bg-primary rounded-lg p-4 gap-5'>
			<h1 className='mx-auto mb-5'>{data.title}</h1>
			<img src={data.img} className='mx-auto' alt={data.title} />
			<div></div>
		</div>
	);
}
