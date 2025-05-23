# DevConnector Pro 🚀

A scalable developer networking platform that combines the best of LinkedIn and GitHub, enabling developers to showcase their skills, collaborate on projects, and build meaningful professional connections.

## 🌟 Features

### Phase 1 (MVP)
- 🔐 Secure Authentication (JWT)
- 👤 Developer Profiles
- 📂 Project Showcase
- 🔍 Developer Discovery
- 📝 Blog-style Posts
- 💬 Comments System
- 📁 Bookmarks

### Phase 2
- 📬 Direct Messaging
- 🧠 Collaborator Matching
- 📊 Analytics Dashboard
- 🏷️ Advanced Search
- 🔔 Real-time Notifications

### Phase 3
- 🧮 Smart Matching Algorithm
- 📥 Resume Parsing
- 📄 Profile Export
- ✨ Admin Dashboard
- ⛓️ Advanced Security

## 🛠️ Tech Stack

### Frontend
- React.js with Hooks
- React Router
- Formik/Yup
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Redis (optional)
- WebSocket (optional)

### DevOps
- Docker + Docker Compose
- GitHub Actions
- ESLint + Prettier

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/devconnector-pro.git
cd devconnector-pro
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend (.env)
cp backend/.env.example backend/.env

# Frontend (.env)
cp frontend/.env.example frontend/.env
```

4. Start development servers
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

## 📁 Project Structure

```
devconnector-pro/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── index.js
└── frontend/
    ├── components/
    ├── pages/
    ├── services/
    ├── contexts/
    ├── hooks/
    ├── assets/
    └── App.js
```

## 🔒 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000
```

## 📝 API Documentation

API documentation is available at `/api-docs` when running the backend server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by LinkedIn and GitHub 