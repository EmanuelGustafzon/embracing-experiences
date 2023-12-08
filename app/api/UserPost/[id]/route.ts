import connectMongo from '@/utils/Datebase';
import UserPost from '@/models/UserPost';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const userPostId = params.id 
    try {
        await connectMongo();
        const userPost = await UserPost.findById(userPostId);
        
        if (!userPost) return new Response("Post Not Found", { status: 404 });
        return new Response(JSON.stringify(userPost), { status: 200 });

      } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
      }
  }
  
  export async function PATCH (request: Request, { params }: { params: { id: string } }) {
    const { title, content, image} = await request.json();

    try {
        await connectMongo();
        const userPost = await UserPost.findById(params.id);

        if (!userPost) {
          return new Response("Post not found", { status: 404 });
        } 

        const imagePathArray = userPost?.image.split('/')
        const imageSrc = imagePathArray && imagePathArray[imagePathArray.length -1]
        if(imageSrc) {
          await unlink("public/images/" + imageSrc)
        }

        let imagePath = '';
        if (image) {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const path = join(process.cwd(), 'public', 'images', image.name);
          await writeFile(path, buffer);
          imagePath = `/images/${image.name}`;
        }

        userPost.title = title;
        userPost.content = content;
        userPost.image = imagePath;

        await userPost.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        console.error("Error Updating Prompt:", error);
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

  export async function DELETE (request: Request, { params }: { params: { id: string } }) {
    const userPostId = params.id 
    try {

        await connectMongo();
        const userPost = await UserPost.findById(userPostId)
        const imagePathArray = userPost?.image.split('/')
        const imageSrc = imagePathArray && imagePathArray[imagePathArray.length -1]
        if(imageSrc) {
          await unlink("public/images/" + imageSrc)
        }
        await userPost?.deleteOne()
        return new Response("Prompt deleted successfully", { status: 200 });

      } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
      }
  }