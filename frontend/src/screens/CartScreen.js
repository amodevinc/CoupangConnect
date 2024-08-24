import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartItem from '../components/CartItem';
import styles from '../css/Cart.module.css';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import PaymentScreen from './PaymentScreen';
import ProductSearchScreen from './ProductSearchScreen';
import emptyCartLottieAnimation from '../assets/lotties/empty_cart.json';
import Lottie from 'react-lottie';
import GroupDiscountProgressBar from '../components/GroupDiscountProgressBar';
import CustomTitleBar from '../components/PageTitleBar';
import styled from 'styled-components';

export const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: var(--base);
`;

const CartScreen = ({ userId }) => {

  /* PAGE LAYOUT */

  const { cartId } = useParams();
  const {
    activeCart,
    regularItems,
    discountedItems,
    cartCalculations,
    groupSize,
    maxGroupSize,
    currentDiscountPercentage,
    removeItemFromCart,
    updateItemQuantity,
    voteOnItem,
    completeCart,
    setActiveCartId,
    addItemToCart
  } = useUnifiedCart(userId);
  const [localLoading, setLocalLoading] = useState(true);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCartLottieAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
    };

  const renderProductItems = () => {
    if (discountedItems?.length === 0 && regularItems?.length === 0) {
      return (
        <div className={styles.itemsList}>
          <Lottie 
                options={defaultOptions}
                height={400}
                width={400}
            />
        </div>
      )
    } else {
      return (
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
      )
    }
  }

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
  const handleAddItem = (product) => {
    addItemToCart(product);
    setShowProductSearch(false);
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
      <GroupDiscountProgressBar
        groupSize={groupSize}
        maxGroupSize={maxGroupSize}
        currentDiscountPercentage={currentDiscountPercentage}
        totalDiscountWon={cartCalculations.totalDiscountWon}
      />
      <Container>
        <CustomTitleBar
            leftIcon=""
            rightIcon="link"
          />
      </Container>
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
      {renderProductItems()}
      <div className={styles.bottomButtonsContainer}>
        <div className={styles.addItemContainer}>
          <button className={styles.addItemButton} onClick={() => setShowProductSearch(true)}>
            Add Item
          </button>
        </div>
        <button className={styles.proceedToPaymentButton} onClick={handleProceedToPayment}>
          Pay
        </button>
      </div>
      {showProductSearch && (
        <ProductSearchScreen
          onAddItem={handleAddItem}
          onClose={() => setShowProductSearch(false)}
        />
      )}
    </div>
  );
};

export default CartScreen;
