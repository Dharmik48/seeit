import Post from './Post';

export default function Posts({ posts }) {
	const renderPosts = () => posts.map(post => <Post data={post} />);

	return (
		<section className='grid gap-5 py-5 font-light'>{renderPosts()}</section>
	);
}
