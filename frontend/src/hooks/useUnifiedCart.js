import { useState, useEffect, useMemo, useCallback } from 'react';
import { db } from '../firebaseConfig';
import { 
  collection, 
  doc, 
  addDoc,
  updateDoc, 
  onSnapshot, 
  query, 
  where,
  arrayUnion,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';

const MAX_GROUP_SIZE = 6;
const DISCOUNT_STEP = 0.2;

export const useUnifiedCart = (userId) => {
    const [userCarts, setUserCarts] = useState([]);
    const [activeCartId, setActiveCartId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const safeToFixed = (number, decimalPlaces) => {
        return number !== undefined && number !== null && !isNaN(number)
          ? Number(number).toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : '0';
      };

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
            console.log('Carts loaded:', carts);
        }, (err) => {
            console.error("Error fetching carts: ", err);
            setError(err);
            setLoading(false);
        });

        return unsubscribe;
    }, [userId]);

    const activeCart = useMemo(() => {
        console.log('ACTIVE CART ID: ', activeCartId)
        const cart = userCarts.find(cart => cart.id === activeCartId);
        console.log('Active cart:', cart);
        return cart || null;
    }, [userCarts, activeCartId]);

    const groupSize = useMemo(() => {
        return activeCart ? Math.min(activeCart.members?.length || 1, MAX_GROUP_SIZE) : 1;
    }, [activeCart]);

    const currentDiscountPercentage = useMemo(() => {
        return Math.min((groupSize - 1) * DISCOUNT_STEP, 1);
    }, [groupSize]);

    const calculateItemDiscount = useCallback((item) => {
        const quantity = item.quantity || 1;
        
        if (item.group_discount_eligible) {
            const maxDiscountValueWon = item.max_discount_value_won || 0;
            const discountAmountWon = maxDiscountValueWon * currentDiscountPercentage;
            const discountedPriceWon = Math.max(item.price_won - discountAmountWon, 0);

            return {
                ...item,
                quantity,
                discountPercentage: safeToFixed(currentDiscountPercentage, 0),
                discountAmountWon: safeToFixed(discountAmountWon, 0),
                discountedPriceWon: safeToFixed(discountedPriceWon, 0),
                totalPriceWon: safeToFixed(item.price_won * quantity, 0),
                totalDiscountedPriceWon: safeToFixed(discountedPriceWon * quantity, 0),
            };
        } else {
            return {
                ...item,
                quantity,
                discountPercentage: 0,
                discountAmountWon: 0,
                discountedPriceWon: item.price_won,
                totalPriceWon: item.price_won * quantity,
                totalDiscountedPriceWon: item.price_won * quantity,
            };
        }
    }, [currentDiscountPercentage]);

    const { regularItems, discountedItems } = useMemo(() => {
        if (!activeCart?.items) return { regularItems: [], discountedItems: [] };

        return activeCart.items.reduce((acc, item) => {
            const calculatedItem = calculateItemDiscount(item);
            if (item.group_discount_eligible && activeCart.members.length > 1) {
                acc.discountedItems.push(calculatedItem);
            } else {
                acc.regularItems.push(calculatedItem);
            }
            return acc;
        }, { regularItems: [], discountedItems: [] });
    }, [activeCart, calculateItemDiscount]);

    const cartCalculations = useMemo(() => {
        const regularSubtotal = regularItems.reduce((sum, item) => sum + item.totalPriceWon, 0);
        const discountedSubtotal = discountedItems.reduce((sum, item) => sum + item.totalPriceWon, 0);
        const totalDiscount = discountedItems.reduce((sum, item) => sum + (item.totalPriceWon - item.totalDiscountedPriceWon), 0);

        return {
            regularSubtotalWon: regularSubtotal,
            discountedSubtotalWon: discountedSubtotal,
            subtotalWon: regularSubtotal + discountedSubtotal,
            totalDiscountWon: totalDiscount,
            totalWon: regularSubtotal + discountedSubtotal - totalDiscount,
        };
    }, [regularItems, discountedItems]);

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
            const docRef = await addDoc(collection(db, 'sharedCarts'), newCart);
            setActiveCartId(docRef.id);
        } catch (err) {
            console.error("Error creating shared cart: ", err);
            setError(err);
        }
    }, [userId]);

    const addItemToCart = useCallback(async (item) => {
        if (!activeCartId) {
            console.error("No active cart selected");
            return;
        }
        try {
            const cartRef = doc(db, 'sharedCarts', activeCartId);
            await updateDoc(cartRef, {
                items: arrayUnion({
                    ...item,
                    quantity: 1,
                    votes: 0
                }),
                updatedAt: serverTimestamp()
            });
        } catch (err) {
            console.error("Error adding item to cart: ", err);
            setError(err);
        }
    }, [activeCartId]);

    const removeItemFromCart = useCallback(async (itemId) => {
        if (!activeCartId) return;
        try {
            const cartRef = doc(db, 'sharedCarts', activeCartId);
            const updatedItems = activeCart.items.filter(item => item.id !== itemId);
            await updateDoc(cartRef, {
                items: updatedItems,
                updatedAt: serverTimestamp()
            });
        } catch (err) {
            console.error("Error removing item from cart: ", err);
            setError(err);
        }
    }, [activeCart, activeCartId]);

    const updateItemQuantity = useCallback(async (itemId, newQuantity) => {
        if (!activeCartId) return;
        try {
            const cartRef = doc(db, 'sharedCarts', activeCartId);
            const updatedItems = activeCart.items.map(item => 
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
    }, [activeCart, activeCartId]);

    const addMemberToCart = useCallback(async (memberId) => {
        if (!activeCartId) return;
        try {
            const cartRef = doc(db, 'sharedCarts', activeCartId);
            await updateDoc(cartRef, {
                members: arrayUnion(memberId),
                updatedAt: serverTimestamp()
            });
        } catch (err) {
            console.error("Error adding member to cart: ", err);
            setError(err);
        }
    }, [activeCartId]);

    const voteOnItem = useCallback(async (itemId, voteType) => {
        if (!activeCartId || !userId) return;
        try {
          const cartRef = doc(db, 'sharedCarts', activeCartId);
          const updatedItems = activeCart.items.map(item => {
            if (item.id === itemId) {
              const currentVotes = item.votes || {};
              const userCurrentVote = currentVotes[userId];
              
              // Remove previous vote if exists
              if (userCurrentVote) {
                currentVotes[userCurrentVote === 'like' ? 'likeCount' : 'disagreeCount']--;
                delete currentVotes[userId];
              }
              
              // Add new vote if it's different from the previous one
              if (!userCurrentVote || userCurrentVote !== voteType) {
                currentVotes[userId] = voteType;
                currentVotes[voteType === 'like' ? 'likeCount' : 'disagreeCount'] = 
                  (currentVotes[voteType === 'like' ? 'likeCount' : 'disagreeCount'] || 0) + 1;
              }
              
              return { ...item, votes: currentVotes };
            }
            return item;
          });
          
          await updateDoc(cartRef, {
            items: updatedItems,
            updatedAt: serverTimestamp()
          });
        } catch (err) {
          console.error("Error voting on item: ", err);
          setError(err);
        }
      }, [activeCart, activeCartId, userId]);

    const completeCart = useCallback(async () => {
        if (!activeCartId) return;
        try {
            const cartRef = doc(db, 'sharedCarts', activeCartId);
            await updateDoc(cartRef, {
                status: 'completed',
                completedAt: serverTimestamp()
            });
        } catch (err) {
            console.error("Error completing cart: ", err);
            setError(err);
        }
    }, [activeCartId]);

    return {
        userCarts,
        activeCartId,
        activeCart,
        regularItems,
        discountedItems,
        groupSize,
        maxGroupSize: MAX_GROUP_SIZE,
        currentDiscountPercentage,
        cartCalculations,
        loading,
        error,
        createSharedCart,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        addMemberToCart,
        voteOnItem,
        completeCart,
        setActiveCartId
    };
};