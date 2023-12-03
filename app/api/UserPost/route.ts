import connectMongo from '@/utils/Datebase';
import UserPost from '@/models/UserPost';

export const GET = async (request: Request) => {
    try {
        await connectMongo(); 
        const allUserPosts = await UserPost.find()
        if (allUserPosts.length === 0) return new Response("There is no posts yet", { status: 404 });
        return new Response(JSON.stringify(allUserPosts), { status: 200 });
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    } 
}