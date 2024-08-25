import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const { cartId, shareCode } = useParams();
  const navigate = useNavigate();
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
    addItemToCart,
    generateSharingLink,
    joinSharedCart,
    sharedUsers,
  } = useUnifiedCart(userId);
  const [localLoading, setLocalLoading] = useState(true);
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [showShareUI, setShowShareUI] = useState(false);
  const [sharingLink, setSharingLink] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [isSharedUser, setIsSharedUser] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyCartLottieAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    if (cartId && cartId !== 'individual') {
      setActiveCartId(cartId);
    } else if (cartId === 'individual') {
      console.log("Individual cart selected");
    }
    setLocalLoading(false);
  }, [cartId, setActiveCartId]);
  useEffect(() => {
    const initializeCart = async () => {
      if (cartId) {
        if (shareCode) {
          // User is accessing via shared link
          const joined = await joinSharedCart(cartId, shareCode, userId);
          if (joined) {
            setIsSharedUser(true);
            setActiveCartId(cartId);
          } else {
            // Handle invalid share link
            navigate('/');
            return;
          }
        } else {
          // Regular cart access
          setActiveCartId(cartId);
        }
      }
      setLocalLoading(false);
    };

    initializeCart();
  }, [cartId, shareCode, userId, joinSharedCart, setActiveCartId, navigate]);

  const handleShareCart = useCallback(async () => {
    if (activeCart) {
      const link = await generateSharingLink(activeCart.id);
      setSharingLink(link);
      setShowShareUI(true);
    }
  }, [activeCart, generateSharingLink]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(sharingLink).then(() => {
      alert('Link copied to clipboard!');
    });
  }, [sharingLink]);

  const handleCloseShareUI = useCallback(() => {
    setShowShareUI(false);
  }, []);

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
          rightIcon={isSharedUser ? null : "link"}
          onRightIconClick={isSharedUser ? null : handleShareCart}
        />
      </Container>
      
      {showShareUI && (
        <div className={styles.shareUIOverlay}>
          <div className={styles.shareUIContent}>
            <h2>Share Cart: {activeCart.name}</h2>
            <p>Shared Users: {sharedUsers}</p>
            <input type="text" value={sharingLink} readOnly className={styles.sharingLinkInput} />
            <div className={styles.shareButtonsContainer}>
              <button className={styles.copyButton} onClick={handleCopyLink}>Copy Link</button>
              <button className={styles.closeButton} onClick={() => setShowShareUI(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

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
      {!isSharedUser && (
        <div className={styles.bottomButtonsContainer}>
          <div className={styles.addItemContainer}>
            <button className={styles.addItemButton} onClick={() => setShowProductSearch(true)}>
              Add Item
            </button>
          </div>
          <button className={styles.proceedToPaymentButton} onClick={() => setShowPaymentScreen(true)}>
            Pay
          </button>
        </div>
      )}
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
