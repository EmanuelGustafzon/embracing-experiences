import mongoose, { Schema, model, models } from 'mongoose';

interface postTypes {
    content: string;
}

const postSchema = new Schema<postTypes>({
    content: {
        type: String
    }
})

const Post = models.Post || model<postTypes>('Post', postSchema)


export default Post;