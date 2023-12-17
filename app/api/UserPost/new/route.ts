import connectMongo from '@/utils/Datebase';
import UserPost from '@/models/UserPost';
import { join } from 'path';
import { writeFile } from 'fs/promises';

export const POST = async (request: Request) => {
  if (request.method === 'POST') {
    const data = await request.formData();

    const image: File | null = data.get('image') as unknown as File;
    const title = data.get('title');
    const content = data.get('content');
    const userEmail = data.get('userEmail');

    try {
      let imagePath = '';

      if (image) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
    
        const path = join(process.cwd(),'images', image.name);
        await writeFile(path, buffer);

        imagePath = `/images/${image.name}`;
      }

      await connectMongo();

      const newUserPost = new UserPost({
        title,
        image: imagePath,
        content,
        userEmail,
      });

      await newUserPost.save();

      return new Response('You successfully created a new post', { status: 201 });
    } catch (error) {
      console.error('Error saving post:', error);
      return new Response('We have some problems. Please try again in a few minutes', { status: 500 });
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
};

