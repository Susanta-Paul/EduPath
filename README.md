# 📚 E-Learning & Quiz Platform

An advanced MERN-stack based **E-Learning Platform** that allows students to enroll in courses, watch videos, attempt quizzes, and track progress.  
Admins can manage users, courses, and quizzes.  

This project also integrates **ImageKit & Cloudinary** for media storage and provides a secure authentication system with JWT tokens (access + refresh).

---

## 🚀 Features

- 🔑 Authentication (JWT-based login/signup with refresh tokens)
- 🎥 Course video hosting & streaming
- 📑 Quiz creation & submission
- 👩‍🏫 Admin dashboard for course/user management
- ☁️ Image & file uploads using ImageKit / Cloudinary
- 🔒 Role-based access control (Student / Admin)
- 🌐 Fully responsive UI

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS, ShadCN UI  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT (Access + Refresh Tokens)  
**Media Handling:** ImageKit, Cloudinary  

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Susanta-Paul/EduPath.git
```
### 2. Install dependencies
```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```
### 3. Configure Environment Variables
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ORIGIN=http://localhost:3000

# ImageKit
IMAGEKIT_ENDPOINT=your_imagekit_endpoint
IMAGEKIT_PRIVATE_API_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_API_KEY=your_imagekit_public_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_CLOUD_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_SECRET=your_cloudinary_api_secret

```
### 4. Run the App
```bash
# Start backend
cd backend
npm start

# Start frontend
cd ../frontend
npm run dev


```
