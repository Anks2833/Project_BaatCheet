# BaatCheet - Backend

## Introduction
This is the **backend** for **BaatCheet**, a real-time video chatting app. The backend handles user authentication, session management, role-based access control, and real-time communication using Socket.io. It is built using Node.js, Express.js, and MongoDB.

## Features
- User authentication using JWT (JSON Web Tokens)
- Role-based access control for Leaders, Co-leaders, Elders, and Members
- Real-time communication via Socket.io for managing participant actions
- REST API for handling participant data, meetings, and permissions
- MongoDB for storing user and meeting data

## Tech Stack
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for building the REST API
- **MongoDB**: NoSQL database for data storage
- **JWT**: Authentication with JSON Web Tokens
- **Socket.io**: Real-time bidirectional event-based communication

## Prerequisites
- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm (v6 or later)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anks2833/Project_BaatCheet.git
   cd Project_BaatCheet/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install or npm i
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the backend directory and add the following:
   ```
   PORT=your_port_number
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URI=your_mongodb_connection_string
   
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FRONTEND_URL=your_frontend_url
   
   SESSION_SECRET=your_session_secret

   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```