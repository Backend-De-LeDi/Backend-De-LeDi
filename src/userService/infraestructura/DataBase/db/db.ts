// db.ts
import mongoose from 'mongoose';
import ENV from '../../../config/env';

const mongoURL = ENV.mongoURL as string;

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURL, {
            // Puedes agregar opciones si las necesitas
            serverSelectionTimeoutMS: 30000, // 30 segundos de timeout
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
