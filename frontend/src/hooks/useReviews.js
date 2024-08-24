// src/hooks/useReviews.js
import { useState, useEffect } from 'react';
import { collection, addDoc, doc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useReviews = (productId, limitCount = 5) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, 'products', productId, 'reviews'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const reviewData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          product_id: doc.data().product_id,
          user_id: doc.data().user_id,
          content: doc.data().content,
          rating: doc.data().rating,
          sentiment_score: doc.data().sentiment_score,
          timestamp: doc.data().timestamp?.toDate()
        }));
        setReviews(reviewData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching reviews: ", error);
        setError(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [productId, limitCount]);

  const addReview = async (review) => {
    try {
      await addDoc(collection(db, 'products', productId, 'reviews'), {
        ...review,
        timestamp: new Date()
      });
    } catch (error) {
      console.error("Error adding review: ", error);
      throw error;
    }
  };

  return { reviews, loading, error, addReview };
};