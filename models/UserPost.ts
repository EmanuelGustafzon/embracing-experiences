import { models } from 'mongoose';
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
      type: String,
      required: true,
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

const UserPost = models.UserPost || model<userPostTypes>('UserPost', UserPostSchema)

export default UserPost;