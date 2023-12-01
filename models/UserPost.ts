import { Schema, model } from 'mongoose';

interface userPostTypes {
    title: string;
    image: string;
    content: string;
    userEmail: string;
}

const UserPostSchema = new Schema<userPostTypes>({
    title: {
        type: String,
        required: true
    },
    image: {
      type: String
    },
    content: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
})

const UserPost = model<userPostTypes>('UserPost', UserPostSchema)

export default UserPost;