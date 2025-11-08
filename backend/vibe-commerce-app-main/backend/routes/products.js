const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const mockProducts = [
  { _id: '1', name: "Wireless Headphones", price: 1999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop" },
  { _id: '2', name: "Samsung Galaxy 15", price: 43499, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { _id: '3', name: "Bluetooth car Speaker", price: 2299, image: "https://images.unsplash.com/photo-1495435229349-e86db7bfa013?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { _id: '4', name: "USB-C Fast Charger", price: 699, image: "https://images.unsplash.com/photo-1585386959984-a4155229a6f4?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { _id: '5', name: "Laptop Sleeve", price: 899, image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop&crop=entropy" },
  { _id: '6', name: "MacBook pro", price: 122599, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop&crop=entropy" }
];

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.json(mockProducts);
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
