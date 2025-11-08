# Vibe Commerce - Full Stack E-Commerce Application

A full-featured shopping cart application built with React, Node.js/Express, and MongoDB Atlas. Includes real-time cart updates, smooth UI interactions, and cloud-backed data persistence.

## Features

### Frontend (React)
- Responsive product grid layout
- Real-time cart management (add, update, remove items)
- Checkout form with validation
- Order summary via modal receipt
- Toast notifications for user feedback
- Basic animations for transitions
- Fully responsive across devices

### Backend (Node.js/Express)
- RESTful API with 8 endpoints
- MongoDB Atlas integration for cloud storage
- CORS support for cross-origin requests
- Centralized error handling
- Console-based production logging

### Database (MongoDB Atlas)
- Persistent storage of orders
- Query orders by customer email
- Auto-generated order IDs
- Automatic timestamps

## Quick Start

### Prerequisites
- Node.js v14.0.0+
- npm v6.0.0+
- A MongoDB Atlas account

### Installation

1. Clone the repository

```bash
git clone https://github.com/Garimasingh1283/E-commerce.git
cd E-commerce
```

2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file:
```bash
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://ecommerce_user:YourPassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=vibe_commerce
```

- Start backend:
```bash
npm run dev
```

3. Frontend Setup:
```bash
cd ../frontend
npm install
npm start
```

Browser opens at: http://localhost:3000

---

## API Endpoints

### Base URL
`http://localhost:4000/api`

### Endpoints

**Products**
- `GET /api/products` - Get all products

**Cart**
- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update quantity
- `DELETE /api/cart/:id` - Remove item

**Orders**
- `GET /api/orders` - Get all orders
- `GET /api/orders/email/:email` - Get orders by email
- `POST /api/checkout` - Process checkout & save order
