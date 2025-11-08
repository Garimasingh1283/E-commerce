const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, items, total } = req.body;

    if (!name || !email || !items || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const calculatedTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const order = new Order({
      name,
      email,
      items: items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        subtotal: item.price * item.qty
      })),
      total: calculatedTotal,
      status: 'confirmed'
    });

    const savedOrder = await order.save();

    res.status(201).json({
      success: true,
      receipt: {
        orderNumber: savedOrder.orderNumber,
        name: savedOrder.name,
        email: savedOrder.email,
        items: savedOrder.items,
        total: savedOrder.total,
        timestamp: savedOrder.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
