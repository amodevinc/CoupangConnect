// src/components/ProductGallery.js
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';

export const ProductGallery = () => {
  const { products, loading, error } = useProducts(20); // Fetch 20 products

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  return (
    <div className="product-gallery">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.image_url} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p className="product-price">
            ${product.price.toFixed(2)} / ₩{product.price_won.toFixed(0)}
            {product.group_discount_eligible && (
              <span className="group-discount-badge">
                Group Discount Eligible
              </span>
            )}
          </p>
          <p className="max-discount">
            Max Discount: ${product.max_discount_value.toFixed(2)} / ₩{product.max_discount_value_won.toFixed(0)}
          </p>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};