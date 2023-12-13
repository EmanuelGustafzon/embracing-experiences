import connectMongo from '@/utils/Datebase';
import UserPost from '@/models/UserPost';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('userEmail')
    try {
        await connectMongo(); 
        if(query) {
            const posts = await UserPost.find({userEmail: query})
            if (posts.length === 0) return new Response("No posts found for the specified user", { status: 404 });
            return new Response(JSON.stringify(posts), { status: 200 });
        }
        const allUserPosts = await UserPost.find()
        if (allUserPosts.length === 0) return new Response("No posts found for the specified user", { status: 404 });
        return new Response(JSON.stringify(allUserPosts), { status: 200 });

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    } 
}

