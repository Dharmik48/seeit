import Post from './Post';

export default function Posts({ posts, currentUser }) {
	const renderPosts = () =>
		posts.map(post => (
			<Post data={post} currentUser={currentUser} key={post.id} />
		));

	return (
		<section className='grid gap-5 font-light mt-5 lg:mt-10 dark:bg-darkText'>
			{renderPosts()}
		</section>
	);
}
