// src/components/ProductList.js
import React from 'react';
import { useProducts } from '../hooks/useProducts';

export const ProductList = ({ onProductSelect }) => {
  const { products } = useProducts();

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>Price: ${product.price.toFixed(2)} / ₩{product.price_won.toFixed(0)}</p>
          <p>Category: {product.category}</p>
          {product.group_discount_eligible && <p>Group Discount Eligible</p>}
          <button onClick={() => onProductSelect(product.id)}>View Details</button>
        </div>
      ))}
    </div>
  );
};