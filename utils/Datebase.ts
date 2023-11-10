import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

let connected = false

const connectMongo = async () => {
    const DB_URI: any = process.env.DB_URI

    if(connected) return

    try {
        const connectToMongo = await mongoose.connect(DB_URI || 'mongodb://0.0.0.0:27017/embracingX',  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as any)
        console.log(`MongoDB Connected: ${connectToMongo.connection.host}`);
        connected = true
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
    }
}

export default  connectMongo;