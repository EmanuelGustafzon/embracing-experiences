import Image from 'next/image';
import * as cheerio from 'cheerio';
import Link from 'next/link';
import connectMongo from '@/utils/Datebase';
import Post from '@/models/Post';

interface IPostCard {
  searchTerm: string;
}

const fetchPosts = async () => {
    'use server'
    await connectMongo();
    const allPosts = await Post.find();
    return allPosts
}

const PostsWithSearch = async (searchTerm: string) => {
  'use server'
  await connectMongo();
  const posts = await Post.find({$text: {$search: searchTerm}});
  return posts
}

const PostCard: React.FC<IPostCard> = async ({ searchTerm }) => {
    let posts;
    if(searchTerm !== '') {
      posts = await PostsWithSearch(searchTerm);
    } else {
      posts = await fetchPosts();
    }

    return (
    <>
      {posts.length > 0 ? ( posts.map((post) => {
        if(post.isPublished) {
        const $ = cheerio.load(post.content);
        const h1Content = $('h1').text();
        const pContent = $('p').first().text();
        const imgSrc = $('img').first().attr('src');

        return (
          <div key={post._id} className="card w-96 glass m-2">
           <figure><Image src={imgSrc} width={390} height={250} alt="car!" /></figure>
            <div className="card-body">
              <h2 className="card-title">{h1Content}</h2>
              <p>{pContent}</p>
              <div className="card-actions justify-end">
                <Link href={`/blog/${post._id}`} className="btn btn-primary">Learn now!</Link>
              </div>
            </div>
          </div>
        );
        }
      })
      ) : (
      <div className='grid grid-cols-2 gap-4 place-content-center h-48 '>
      <span className="loading loading-ring loading-lg"></span>
      </div>     
      )}
    </>
  );
};

export default PostCard;