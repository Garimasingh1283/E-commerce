// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import "./index.css";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <Router>
      <header className="app-header nav">
        <nav className="app-header">
          <div className="brand">
            <div className="logo">VC</div>
            <div>
              <div style={{fontSize: '0.95rem'}}>Vibe Commerce</div>
              <div style={{fontSize: '0.75rem', color:'#cbd5e1'}}>Mock e-commerce</div>
            </div>
          </div>

          <div className="nav-actions">
            <Link to="/" className="nav-link">Products</Link>
            <Link to="/cart" className="cart-badge" aria-label="Cart">
              <span>🛒</span>
              <span style={{opacity:0.9}}>{totalItems}</span>
            </Link>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Products addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQty={updateQty}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
