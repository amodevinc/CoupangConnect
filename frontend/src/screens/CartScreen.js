import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartItem from '../components/CartItem';
import styles from '../css/Cart.module.css';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import PaymentScreen from './PaymentScreen';

const CartScreen = ({ userId }) => {
  const { cartId } = useParams();
  const {
    activeCart,
    regularItems,
    discountedItems,
    cartCalculations,
    removeItemFromCart,
    updateItemQuantity,
    voteOnItem,
    completeCart,
    setActiveCartId,
  } = useUnifiedCart(userId);
  const [localLoading, setLocalLoading] = useState(true);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  useEffect(() => {
    console.log('CartId changed:', cartId);
    if (cartId && cartId !== 'individual') {
      setActiveCartId(cartId);
    } else if (cartId === 'individual') {
      console.log("Individual cart selected");
    }
    setLocalLoading(false);
  }, [cartId, setActiveCartId]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (cartId) {
      setLocalLoading(false);
    }
  }, [cartId]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleProceedToPayment = () => {
    setShowPaymentScreen(true);
  };

  if (localLoading) return <div>Loading...</div>;

  if (showPaymentScreen) {
    return (
      <PaymentScreen
        activeCart={activeCart}
        regularItems={regularItems}
        discountedItems={discountedItems}
        cartCalculations={cartCalculations}
        completeCart={completeCart}
        onBack={() => setShowPaymentScreen(false)}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.selectAllContainer}>
        <label className={styles.selectAllLabel}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className={styles.selectAllCheckbox}
          />
          Select all
        </label>
      </div>
      <div className={styles.itemsList}>
        {discountedItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            selectAll={selectAll}
            removeItemFromCart={removeItemFromCart}
            updateItemQuantity={updateItemQuantity}
            voteOnItem={voteOnItem}
            userId={userId}
            isDiscounted={true}
          />
        ))}
        {regularItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            selectAll={selectAll}
            removeItemFromCart={removeItemFromCart}
            updateItemQuantity={updateItemQuantity}
            voteOnItem={voteOnItem}
            userId={userId}
            isDiscounted={false}
          />
        ))}
      </div>
      <div className={styles.bottomButtonsContainer}>
        <div className={styles.addItemContainer}>
          <button className={styles.addItemButton}>Add Item</button>
        </div>
        <button className={styles.proceedToPaymentButton} onClick={handleProceedToPayment}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
