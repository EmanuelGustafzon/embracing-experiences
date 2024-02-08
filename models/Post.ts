import mongoose, { Schema, model, models } from 'mongoose';

interface postTypes {
    status: boolean;
    title: string;
    content: string;
    map: string;
    question: string;
    options: optionsTypes;
}

interface optionsTypes {
    option: string;
    correct: boolean;
}

const optionSchema = new Schema<optionsTypes>({
    option: {
        type: String,
        correct: Boolean
    }
})

const postSchema = new Schema<postTypes>({
    status: {
        isPublished: false
    },
    title: {
        type: String
    },
    content: {
        type: String,
        indexes: true
    },
    map: {
        type: String
    },
    question: {
        type: String,
    },
    options: [
        optionSchema
    ]
})

postSchema.path('content').index({text: true});

const Post = models.Post || model<postTypes>('Post', postSchema)


export default Post;