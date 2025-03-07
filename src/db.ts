import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbURI = process.env.DB;

        if (!dbURI) {
            throw new Error('Missing DB connection string in environment variables');
        }

        await mongoose.connect(dbURI);
        console.log('DB connected...');
    } catch (error) {
        console.error(`DB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;
