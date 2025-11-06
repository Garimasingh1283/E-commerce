// src/components/ProductCard.jsx
import React from "react";

const formatPrice = (p) => `₹${p.toLocaleString()}`;

const ProductCard = ({ product, addToCart }) => {
  return (
    <article className="product-card">
      <div className="product-media">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <button
          className="btn btn-primary add-btn"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
