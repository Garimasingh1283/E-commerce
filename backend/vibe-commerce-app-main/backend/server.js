require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connectDB();

const mockProducts = [
  { id: 1, name: "Wireless Headphones", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Samsung Galaxy 15", price: 43499, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { id: 3, name: "Bluetooth car Speaker", price: 2299, image: "https://images.unsplash.com/photo-1495435229349-e86db7bfa013?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { id: 4, name: "USB-C Fast Charger", price: 699, image: "https://images.unsplash.com/photo-1585386959984-a4155229a6f4?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { id: 5, name: "Laptop Sleeve", price: 899, image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { id: 6, name: "MacBook pro", price: 122599, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop&crop=entropy" }
];


let cart = [];

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  res.json({ cart, total });
});

app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  const numProductId = parseInt(productId);
  const numQty = parseInt(qty);
  const product = mockProducts.find(p => p.id === numProductId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const existingItem = cart.find(item => item.id === numProductId);

  if (existingItem) {
    existingItem.qty += numQty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: numQty });
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  res.json({ message: 'Item added to cart', cart, total });
});

app.put('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const { qty } = req.body;
  const numQty = parseInt(qty);
  const item = cart.find(item => item.id === productId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found in cart' });
  }

  if (numQty <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else {
    item.qty = numQty;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  res.json({ message: 'Cart updated', cart, total });
});

app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== productId);
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  res.json({ message: 'Item removed', cart, total });
});

app.post('/api/checkout', async (req, res) => {
  const { name, email, items } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const itemsToCheckout = items && items.length > 0 ? items : cart;

  if (itemsToCheckout.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  try {
    const total = itemsToCheckout.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const Order = require('./models/Order');

    const orderItems = itemsToCheckout.map(item => ({
      productId: String(item.id || item._id || item.productId || ''),
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty),
      subtotal: Number(item.price * item.qty)
    }));

    const order = new Order({
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      items: orderItems,
      total: total,
      status: 'confirmed'
    });

    const savedOrder = await order.save();
    cart = [];

    res.status(201).json({
      success: true,
      receipt: {
        orderNumber: savedOrder.orderNumber,
        name: savedOrder.name,
        email: savedOrder.email,
        items: savedOrder.items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          qty: item.qty,
          subtotal: item.subtotal
        })),
        total: savedOrder.total,
        timestamp: savedOrder.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Checkout failed: ' + error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString(), cartItems: cart.length });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
