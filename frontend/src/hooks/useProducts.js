// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useProducts = (limitCount = 20) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'products'), limit(limitCount));
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => {
        const productData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          price_won: doc.data().price_won,
          category: doc.data().category,
          review_summary: doc.data().review_summary,
          review_sentiment: doc.data().review_sentiment,
          image_url: doc.data().image_url,
          group_discount_eligible: doc.data().group_discount_eligible,
          max_discount_value: doc.data().max_discount_value,
          max_discount_value_won: doc.data().max_discount_value_won
        }));
        setProducts(productData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products: ", error);
        setError(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [limitCount]);

  return { products, loading, error };
};