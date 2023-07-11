import mongoose from 'mongoose';

async function connectDB() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        // Establish MongoDB connection
        await mongoose.connect('mongodb://localhost:27017/my-task-manager', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
}

export default connectDB;
