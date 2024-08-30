# Connectverse - User Registration and Authentication API

## Project Overview

Connectverse is a fictional social media platform that implements user registration and authentication using Node.js and JWT for secure token-based authentication. This backend API allows users to register, log in, and receive authentication tokens.

## Features

- User Registration with Email and Password
- User Login and Authentication using JWT
- Error Handling and Validation
- MongoDB as the Database

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud-based).

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sakeerHussain/Connectverse-backend.git
   cd Connectverse-backend
 2. **Install Dependencies**
   ```bash
   npm install

3. **Set Up Environment Variables**
    CONNECTION_STRING = your_mongodb_uri
    JWT_SECRET = your_jwt_secret
    PORT=5000

4. **Run the server**
    ```bash
    npm start
    
### API Endpoints

POST /api/auth/signup: Register a new user. Requires an email, username and password in the request body.
POST /api/auth/login: Login and receive a JWT token. Requires email and password in the request body.
Testing the API
You can use tools like Postman or thunderclient to test the API endpoints.

Example requests:

Signup: POST /api/auth/signup

Body: { "email": "user@example.com", "username": "your username" ,"password": "yourpassword" }
Login: POST /api/auth/login 

Body: { "email": "user@example.com", "password": "yourpassword" }