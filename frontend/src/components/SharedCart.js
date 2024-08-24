import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const SharedCart = () => {
  const { cartId } = useParams();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'sharedCarts', cartId),
      (doc) => {
        if (doc.exists()) {
          setCart({ id: doc.id, ...doc.data() });
        } else {
          setError(new Error('Cart not found'));
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching shared cart: ", error);
        setError(error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [cartId]);

  const addToCart = async (product) => {
    try {
      await updateDoc(doc(db, 'sharedCarts', cartId), {
        items: arrayUnion(product)
      });
    } catch (error) {
      console.error("Error adding to cart: ", error);
      setError(error);
    }
  };

  const removeFromCart = async (product) => {
    try {
      await updateDoc(doc(db, 'sharedCarts', cartId), {
        items: arrayRemove(product)
      });
    } catch (error) {
      console.error("Error removing from cart: ", error);
      setError(error);
    }
  };

  if (loading) return <div>Loading shared cart...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!cart) return <div>Cart not found</div>;

  return (
    <div className="shared-cart">
      <h2>Shared Cart: {cart.name}</h2>
      <ul>
        {cart.items.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total: ${cart.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
    </div>
  );
};