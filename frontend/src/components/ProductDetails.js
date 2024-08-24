// src/components/ProductDetails.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useReviews } from '../hooks/useReviews';
import { useUnifiedCart } from '../hooks/useUnifiedCart';


export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { reviews, loading: reviewsLoading, error: reviewsError, addReview } = useReviews(productId, 5);
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });
  const [cartId, setCartId] = useState('');
  const { createCart, addToCart } = useUnifiedCart(cartId);

  const product = products.find(p => p.id === productId);
  if (!product) return <div>Product not found</div>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview({
      product_id: productId,
      user_id: 'current-user-id', // Replace with actual user ID
      ...newReview
    });
    setNewReview({ rating: 5, content: '' });
  };

  const handleAddToSharedCart = async () => {
    try {
      if (!cartId) {
        const newCartId = await createCart(`Shared Cart for ${product.name}`);
        setCartId(newCartId);
      }
      await addToCart(product);
      navigate(`/shared-cart/${cartId}`);
    } catch (error) {
      console.error("Error adding to shared cart: ", error);
    }
  };

  return (
    <div className="product-details">
      <img src={product.image_url} alt={product.name} className="product-image-large" />
      <h2>{product.name}</h2>
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
      <p>{product.description}</p>

      <button onClick={handleAddToSharedCart}>Add to Shared Cart</button>

      
      <p>Review Summary: {product.review_summary}</p>
      <p>Review Sentiment: {product.review_sentiment.toFixed(2)}</p>

      <h3>Reviews</h3>
      {reviewsLoading && <p>Loading reviews...</p>}
      {reviewsError && <p>Error loading reviews: {reviewsError.message}</p>}
      {reviews.map(review => (
        <div key={review.id} className="review">
          <p>Rating: {review.rating}/5</p>
          <p>{review.content}</p>
          <p>By: {review.user_id} on {review.timestamp.toLocaleDateString()}</p>
        </div>
      ))}

      <form onSubmit={handleReviewSubmit}>
        <h4>Add a Review</h4>
        <select 
          value={newReview.rating} 
          onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
        >
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <textarea
          value={newReview.content}
          onChange={(e) => setNewReview({...newReview, content: e.target.value})}
          placeholder="Write your review here"
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};