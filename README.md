# 🎉 Event Management System (MERN + Next.js)

A full-stack **Event Management System** built using **Next.js**, **Node.js**, **Express**, and **MongoDB**. This platform enables users to view, manage, and organize events with a responsive interface and API-powered backend.

## 🌍 Live Demo

**Frontend:** [Live Site](https://week-8-capstone-architectphilemon-1.onrender.com)  
**Backend API:** [Render Backend](https://week-8-capstone-architectphilemon.onrender.com)

> ⚠️ Make sure both frontend and backend are deployed and running to use the application properly.

---

## ⚙️ Tech Stack

**Frontend**
- Next.js (React Framework)
- Tailwind CSS
- Axios (API calls)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose

**Hosting**
- Render (both frontend and backend)

---

## 📁 Folder Structure

project-root/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ └── server.js
├── frontend/ (Next.js app)
│ ├── pages/
│ ├── components/
│ ├── public/
│ ├── styles/
│ └── next.config.js
└── README.md

yaml
Copy
Edit

---

## 🚀 Features

- 🗓️ View all upcoming events
- ➕ Create a new event
- 🔍 View detailed event info
- 🌐 API-connected frontend (via Axios)
- 🧑‍💼 Organized and responsive UI (Tailwind)
- ⚡ Fast performance using Next.js SSR/SSG

---

## 🔧 Installation

### Prerequisites
- Node.js
- MongoDB Atlas or local MongoDB
- Git

---

### 1. Clone the Repo

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-8-capstone_-architectPhilemon.git
cd week-8-capstone_-architectPhilemon
2. Setup Backend
bash
Copy
Edit
cd backend
npm install
touch .env
.env file:

ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
Start the backend:

bash
Copy
Edit
npm run dev
3. Setup Frontend (Next.js)
bash
Copy
Edit
cd ../frontend
npm install
touch .env.local
.env.local file:

ini
Copy
Edit
NEXT_PUBLIC_API_URL=https://week-8-capstone-architectphilemon-1.onrender.com
Run the frontend in dev mode:

bash
Copy
Edit
npm run dev
Build for production:

bash
Copy
Edit
npm run build
npm start
🚀 Deployment (Render)
Backend:
Push backend/ folder to GitHub.

Create a Render Web Service.

Set:

Build Command: npm install

Start Command: npm start

Add your environment variables (e.g., MONGO_URI, PORT)

Frontend (Next.js on Render):
Push frontend/ folder to GitHub.

Create another Render Web Service.

Set:

Build Command: npm install && npm run build

Start Command: npm start

Environment: NEXT_PUBLIC_API_URL

👨‍💻 Author
Philemon Mwendwa
GitHub: @architectPhilemon

📄 License
Licensed under the MIT License.
