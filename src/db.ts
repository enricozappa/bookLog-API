import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const dbURI = process.env.DB;

        if (!dbURI) {
            throw new Error('Missing DB connection string in environment variables');
        }

        const conn = await mongoose.connect(dbURI);
        console.log(`✅ MongoDB connected to: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ DB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;
