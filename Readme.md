# BaatCheet - Video Chatting App(Under Development)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Introduction
**BaatCheet** is a real-time video chatting application. It allows users to create video meetings, chat with participants, and manage permissions. The project uses the MERN stack (MongoDB, Express.js, React.js, and Node.js) and incorporates WebRTC for real-time video communication.

## Features
- Multi-participant video chat functionality
- Real-time text chat during meetings
- Role-based permission management (Leader, Co-leader, Elder, Member)
- Participant management (kick, promote)
- In-meeting participant search
- Audio and video toggle controls
- Responsive design for desktop and mobile devices

## Tech Stack
- **Frontend**: React, Tailwind CSS, React Icons, WebRTC
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.io, WebRTC
- **Authentication**: JWT (JSON Web Tokens), Google OAuth
- **Deployment**: Vercel (Frontend), Render (Backend)

## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Anks2833/Project_BaatCheet.git
   cd Project_BaatCheet
   ```

2. **Install dependencies**:
   ```bash
   # Install backend dependencies
   cd backend
   npm install or npm i

   # Install frontend dependencies
   cd frontend
   npm install or npm i
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `backend` directory and add the following variables:
   ```
   PORT=your_port_number
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string

   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FRONTEND_URL=your_frontend_url

   SESSION_SECRET=your_session_secret
   ```

4. **Start the development servers**:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd frontend
   npm run dev
   ```
## Usage
1. Open your browser and navigate to `http://localhost:5173`
2. Sign up or log in using your credentials or Google account
3. Create a new meeting or join an existing one using a meeting ID
4. Enjoy video chatting with your participants!

## Contributing
I welcome contributions to BaatCheet! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request
