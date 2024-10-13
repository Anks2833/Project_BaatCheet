# BaatCheet - Frontend

## Introduction

This is the **frontend** for **BaatCheet**, a real-time video chatting app built using React and Tailwind CSS. It handles the user interface, interactions, and communication with the backend server via REST APIs and WebSockets.

## Features

- User-friendly UI with role-based controls (Leader, Co-leader, Elder, Member).
- Real-time video chat using WebRTC.
- Responsive design powered by Tailwind CSS.
- Dynamic participant management with options to promote or kick users.
- Real-time chat with all participants.
- Toggling microphone, video, and screen sharing permissions.

{{ Upcoming features }}
- Customizable user profiles
- Breakout rooms for smaller group discussions
- In-call file sharing

## Tech Stack

- **React.js**: For building the UI.
- **Tailwind CSS**: For styling and responsiveness.
- **Socket.io**: For real-time communication.
- **WebRTC**: For real-time video and audio chat.
- **Axios**: For HTTP requests
- **React Router**: For navigation

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. **Clone the repository**:
   ````bash
   git clone https://github.com/Anks2833/Project_BaatCheet.git
   cd Project_BaatCheet/frontend

2. **Install dependencies**:
   ```bash
   npm install or npm i

3. **Set up environment variables**:
   Create a `.env` file in the frontend directory and add the following:
   ```
   REACT_APP_API_URL=your_backend_api_url
   REACT_APP_SOCKET_URL=your_backend_socket_url
   ```
   Adjust the URLs as needed for your development or production environment.
   ````

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
