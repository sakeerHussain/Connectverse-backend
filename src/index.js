const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Create an instance of express
const app = express(); 
const PORT = process.env.PORT || 5000;

//Middleware setup
app.use(express.json());
app.use(cookieParser()); 

//connect to mongoDb database
connectDB();

//Routes setup
app.use("/api/auth", authRoutes);  //auth routes

//start the server
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});