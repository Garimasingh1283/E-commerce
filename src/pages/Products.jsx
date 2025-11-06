// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProducts().then((data) => mounted && setProducts(data));
    return () => (mounted = false);
  }, []);

  return (
    <main className="page products-page">
      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>
    </main>
  );
};

export default Products;
