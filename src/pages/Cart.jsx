// src/pages/Cart.jsx
import React, { useState } from "react";
import ReceiptModal from "../components/ReceiptModal";

const formatPrice = (p) => `₹${p.toLocaleString()}`;

const Cart = ({ cart, updateQty, removeFromCart, clearCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill your name and email.");
    setShowModal(true);
  };

  return (
    <main className="page cart-page">
      <h2 className="section-title">Shopping cart</h2>
      {cart.length === 0 ? (
        <p className="empty">Your cart is empty. Add items from the products page.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-thumb" />
                <div className="cart-meta">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                    <span className="qty">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-right">
                  <div className="cart-price">{formatPrice(item.price * item.qty)}</div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="total-row">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <form onSubmit={handleCheckout} className="checkout-form">
              <input
                className="input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="input"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <div className="checkout-actions">
                <button type="button" className="btn btn-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
                <button type="submit" className="btn btn-primary">
                  Checkout
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {showModal && (
        <ReceiptModal
          form={form}
          total={total}
          close={() => {
            setShowModal(false);
            clearCart();
            setForm({ name: "", email: "" });
          }}
        />
      )}
    </main>
  );
};

export default Cart;
