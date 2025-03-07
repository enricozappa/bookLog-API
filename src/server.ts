import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

// Connect to DB
connectDB();

// Launch server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
