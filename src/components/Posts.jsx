import Post from './Post';

export default function Posts({ posts }) {
	const renderPosts = () => posts.map(post => <Post data={post} />);

	return (
		<section className='grid gap-5 font-light mt-5 lg:mt-10'>
			{renderPosts()}
		</section>
	);
}
