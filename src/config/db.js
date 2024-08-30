const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('MongoDb connected sucessfully');
    } catch (err) {
        console.error("MongoDB connection failed:" , err.message);
        process.exit(1);
    }
}

module.exports = connectDB