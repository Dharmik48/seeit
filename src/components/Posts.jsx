import Post from './Post';

export default function Posts({ posts }) {
	const renderPosts = () => posts.map(post => <Post data={post} />);

	return (
		<section className='max-w-xl mx-auto grid gap-5 py-5 font-primary font-light'>
			{renderPosts()}
		</section>
	);
}
