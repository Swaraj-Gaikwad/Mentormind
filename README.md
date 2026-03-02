# MERN E-Commerce Platform

This is a full-stack E-Commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## 📁 Project Structure
```
mentormind/
│
├── ecommerce-frontend/   → React + Tailwind frontend
├── server/               → Node.js + Express backend
```

---

## 🚀 Features

### User
- Register & Login (JWT Authentication)
- View Products
- Search & Category Filtering
- Add to Cart
- Update Quantity
- Place Order (Cash on Delivery)
- View My Orders

### Admin
- Admin Login
- Add / Edit / Delete Products
- Manage Inventory
- View All Orders
- Update Order Status

---

## ⚙️ Tech Stack

Frontend:
- React.js
- Tailwind CSS
- Vite

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

---

## 🛠 How to Run Locally

### 1️⃣ Start Backend

```
cd server
npm install
npm start
```

### 2️⃣ Start Frontend
```
cd ecommerce-frontend
npm install
npm run dev
```

---

## 🌐 Database

MongoDB Atlas is used as cloud database.

---

## 🔐 Environment Variables

Create `.env` file inside `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

---