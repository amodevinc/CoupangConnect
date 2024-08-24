import { useState, useEffect, useCallback } from 'react';
import { db } from '../firebaseConfig';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot, 
  query, 
  where,
  arrayUnion,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';

export const useSharedCart = (userId) => {
  const [userCarts, setUserCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'sharedCarts'),
      where('members', 'array-contains', userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const carts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUserCarts(carts);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching carts: ", err);
      setError(err);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const createSharedCart = useCallback(async (name, theme) => {
    if (!userId) {
      console.error("Cannot create cart: User ID is not available");
      return;
    }
    try {
      const newCart = {
        name,
        theme,
        creator: userId,
        members: [userId],
        items: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await addDoc(collection(db, 'sharedCarts'), newCart);
    } catch (err) {
      console.error("Error creating shared cart: ", err);
      setError(err);
    }
  }, [userId]);

  const addItemToCart = useCallback(async (cartId, item) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      await updateDoc(cartRef, {
        items: arrayUnion({...item, votes: 0}),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding item to cart: ", err);
      setError(err);
    }
  }, []);

  const removeItemFromCart = useCallback(async (cartId, itemId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      const cart = userCarts.find(cart => cart.id === cartId);
      const updatedItems = cart.items.filter(item => item.id !== itemId);
      await updateDoc(cartRef, {
        items: updatedItems,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error removing item from cart: ", err);
      setError(err);
    }
  }, [userCarts]);

  const updateItemQuantity = useCallback(async (cartId, itemId, newQuantity) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      const cart = userCarts.find(cart => cart.id === cartId);
      const updatedItems = cart.items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      await updateDoc(cartRef, {
        items: updatedItems,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error updating item quantity: ", err);
      setError(err);
    }
  }, [userCarts]);

  const inviteUser = useCallback(async (cartId, invitedUserId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      await updateDoc(cartRef, {
        members: arrayUnion(invitedUserId),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error inviting user to cart: ", err);
      setError(err);
    }
  }, []);

  const removeUser = useCallback(async (cartId, removedUserId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      const cart = userCarts.find(cart => cart.id === cartId);
      if (cart.creator === removedUserId) {
        throw new Error("Cannot remove the creator from the cart");
      }
      await updateDoc(cartRef, {
        members: arrayRemove(removedUserId),
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error removing user from cart: ", err);
      setError(err);
    }
  }, [userCarts]);

  const completeCart = useCallback(async (cartId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      await updateDoc(cartRef, {
        status: 'completed',
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error completing cart: ", err);
      setError(err);
    }
  }, []);

  const deleteCart = useCallback(async (cartId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      await deleteDoc(cartRef);
    } catch (err) {
      console.error("Error deleting cart: ", err);
      setError(err);
    }
  }, []);

  const upvoteItem = useCallback(async (cartId, itemId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      const cart = userCarts.find(cart => cart.id === cartId);
      const updatedItems = cart.items.map(item => 
        item.id === itemId ? {...item, votes: (item.votes || 0) + 1} : item
      );
      await updateDoc(cartRef, {
        items: updatedItems,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error upvoting item: ", err);
      setError(err);
    }
  }, [userCarts]);

  const downvoteItem = useCallback(async (cartId, itemId) => {
    try {
      const cartRef = doc(db, 'sharedCarts', cartId);
      const cart = userCarts.find(cart => cart.id === cartId);
      const updatedItems = cart.items.map(item => 
        item.id === itemId ? {...item, votes: Math.max((item.votes || 0) - 1, 0)} : item
      );
      await updateDoc(cartRef, {
        items: updatedItems,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error downvoting item: ", err);
      setError(err);
    }
  }, [userCarts]);

  const calculateTotal = useCallback((cartId) => {
    const cart = userCarts.find(cart => cart.id === cartId);
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [userCarts]);

  return {
    userCarts,
    loading,
    error,
    createSharedCart,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    inviteUser,
    removeUser,
    completeCart,
    deleteCart,
    upvoteItem,
    downvoteItem,
    calculateTotal
  };
};