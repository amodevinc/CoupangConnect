import { useState, useEffect, useMemo } from 'react';
import { useSharedCart } from './useSharedCart';

export const useGroupDiscount = (cartId, userId) => {
  const { userCarts } = useSharedCart(userId);
  const [discountedItems, setDiscountedItems] = useState([]);

  const cart = useMemo(() => userCarts.find(cart => cart.id === cartId), [userCarts, cartId]);

  const maxGroupSize = 6; // Maximum group size for discount
  const discountStep = 0.2; // 20% of max discount per additional member

  useEffect(() => {
    if (!cart || !cart.items) return;

    const groupSize = Math.min(cart.members?.length || 1, maxGroupSize);
    
    const updatedDiscountedItems = cart.items
      .filter(item => item && item.group_discount_eligible)
      .map(item => {
        const discountPercentage = Math.min((groupSize - 1) * discountStep, 1);
        const maxDiscountValue = item.max_discount_value || 0;
        const discountAmount = maxDiscountValue * discountPercentage;
        const discountedPrice = Math.max((item.price || 0) - discountAmount, 0);

        const maxDiscountValueWon = item.max_discount_value_won || 0;
        const discountAmountWon = maxDiscountValueWon * discountPercentage;
        const discountedPriceWon = Math.max((item.price_won || 0) - discountAmountWon, 0);

        return {
          ...item,
          discountPercentage,
          discountAmount,
          discountedPrice,
          discountAmountWon,
          discountedPriceWon
        };
      });

    setDiscountedItems(updatedDiscountedItems);
  }, [cart]);

  const totalDiscount = useMemo(() => {
    return discountedItems.reduce((total, item) => total + (item.discountAmount || 0), 0);
  }, [discountedItems]);

  const totalDiscountWon = useMemo(() => {
    return discountedItems.reduce((total, item) => total + (item.discountAmountWon || 0), 0);
  }, [discountedItems]);

  const groupSize = Math.min(cart?.members?.length || 1, maxGroupSize);
  const currentDiscountPercentage = Math.min((groupSize - 1) * discountStep, 1);

  return {
    discountedItems,
    totalDiscount,
    totalDiscountWon,
    groupSize,
    maxGroupSize,
    currentDiscountPercentage
  };
};