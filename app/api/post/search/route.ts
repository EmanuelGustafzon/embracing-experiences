import Post from "@/models/Post";
import connectMongo from "@/utils/Datebase";
import {Aggregate, Query} from "mongoose";

export const POST = async (req: Request) => {
    const { searchTerm } = await req.json();
    try {
        await connectMongo();
        const posts = await Post.find({$text: {$search: searchTerm}})
        if(!posts) return new Response('fail', {status: 404})
        return new Response(JSON.stringify(posts), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response('we are having problemd', {status: 500})
    }
}