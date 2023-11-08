import { Schema, model } from 'mongoose';

interface postTypes {
    content: string;
}

const postSchema = new Schema<postTypes>({
    content: {
        type: String
    }
})

const Post = model<postTypes>('Post', postSchema)

export default Post;