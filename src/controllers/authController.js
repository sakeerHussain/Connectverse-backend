// src/controller/authController.js
const dotenv = require("dotenv");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


// user signup logic
const signup = async (req, res) => {
    try {
        //get all data from request body
        const { username, email, password } = req.body
        //check if all the required fields are provided
        if(!(username &&  email && password)) {
            res.status(400).send('All fields are compulsory');
        }
        //check if the user already exist
        const existingUser = await User.findOne({ email })
        if(existingUser) {
           return res.status(401).send('user already exists with this email!');
        }
        //encrypt the password
        const encPassword = await bcrypt.hash(password, 10)
        // save the user in db
        const user = await User.create({
            username,
            email, 
            password: encPassword
        })
        //generate a token for user and send it
        const token = jwt.sign(
            { id: user._id, email },
                process.env.JWT_SECRET,  //use environment variable for the JWT secret
            {
                expiresIn: "2h"
            }
        ); 
        res.status(201).json({user, token})
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};


//user login logic
const login = async (req, res) => {
    try {
        // get all data from the request body
        const {email, password} = req.body
        //validation
        if(!(email && password)) {
            res.status(404).send("All field are mandatory!!");
        }
        // find user in db
        const user = await User.findOne({email})
        // if user is not present
        if(!user) {
            res.status(404).send("User not found . Please sign up first.");
        }  
        // match the password
        if(user && (await bcrypt.compare(password, user.password))){
            // generate a token for the user
            const token = jwt.sign(
                {id: user._id},
                process.env.JWT_SECRET,  //use environment variable for the JWT secret
            {
                expiresIn: "2h"
            }
            );

            // set token in user object
            user.token = token
            user.password = undefined  //Remove the password from the user object

            //cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 1000), // 3 days
                httpOnly : true
            };
            //sending respone with cookie
            res.status(200).cookie("token",token, options).json({
                success:true,
                token,
                user
            });
        } else {
            // if password doesn't match
            return res.status(401).send("Invalid Credentials")
         }
    } catch (error){
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};





module.exports = { signup, login };