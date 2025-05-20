# MERN Blog Platform

A full-stack blog platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can register, login, create/edit/delete blog posts, and upload images using Cloudinary.

---

## ✨ Features

- 🛠️ Built using Vite + React + Axios
- ✅ User registration and login (JWT-based auth)
- 📝 Create, Read, Update, and Delete (CRUD) blog posts
- 🖼 Upload images via Cloudinary
- 🔒 Protected routes for authenticated users
- 🌐 Responsive UI with basic styling


---

## 🔧 Tech Stack

### Frontend
- React
- React Router
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv
- JWT for auth
- bcryptjs
- Multer for file handling
- Cloudinary for image storage
- cors

---
## 🚀 Project Structure
mern-blog-platform/
│
├── server/                       # Backend (Node.js + Express)
│   ├── models/                   # Mongoose schemas (User, Post)
│   ├── routes/                   # API routes for auth, posts, uploads
│   ├── middleware/               # JWT auth middleware
│   ├── utils/                    # Cloudinary config, multer setup
│   ├── .env                      # Server environment variables
│   ├── index.js                  # Express entry point
│   └── package.json
│
├── client/                       # Frontend (React + Vite)
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── components/           # Navbar, ImageUploader
│   │   ├── pages/                # Home, Login, Register, CRUD pages
│   │   ├── App.jsx               # Main App routes
│   │   ├── main.jsx              # React entry point
│   │   ├── axiosConfig.js        # Axios instance w/ token
│   │   ├── index.css             # Global styles
│   │   └── App.css               # Page/component styles
│   ├── vite.config.js            # Vite config
│   ├── eslint.config.js          # ESLint rules
│   └── package.json

