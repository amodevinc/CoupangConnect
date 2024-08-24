import React from 'react';
import GroupDiscountProgressBar from '../components/GroupDiscountProgressBar';
import styles from '../css/CartView.module.css';

const CartView = ({ userId, regularItems,
  discountedItems,
  cartCalculations,
  removeItemFromCart,
  updateItemQuantity,
  voteOnItem,
  groupSize,
  maxGroupSize,
  currentDiscountPercentage,
  activeCart }) => {
console.info(`CART VIEW ACTIVE CART ${activeCart}`)

if (!activeCart) {
    return <div>No active cart selected. Please choose a cart from the navigation.</div>;
}

    const sortItems = (items) => [...items].sort((a, b) => ((b.votes || 0) - (a.votes || 0)));

    const safeToFixed = (number, decimalPlaces) => {
      return number !== undefined && number !== null && !isNaN(number)
        ? Number(number).toFixed(decimalPlaces).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : '0';
    };

    const renderItem = (item, isDiscounted) => (
        <li key={item.id} className={styles.itemCard}>
            <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemPrice}>
                    ₩{safeToFixed(item.price_won, 0)}
                    {isDiscounted && (
                        <span className={styles.discountedPrice}>
                            {' → '}₩{safeToFixed(item.discountedPriceWon, 0)}
                        </span>
                    )}
                </p>
                {isDiscounted && (
                    <p className={styles.discountPercentage}>
                        Discount: {safeToFixed(item.discountPercentage * 100, 0)}%
                        (₩{safeToFixed(item.discountAmountWon, 0)})
                    </p>
                )}
            </div>
            <div className={styles.itemActions}>
                <button
                    className={styles.voteButton}
                    onClick={() => voteOnItem(item.id, 1)}
                >
                    ▲
                </button>
                <span className={styles.voteCount}>{item.votes || 0}</span>
                <button
                    className={styles.voteButton}
                    onClick={() => voteOnItem(item.id, -1)}
                >
                    ▼
                </button>
                <button
                    className={styles.removeButton}
                    onClick={() => removeItemFromCart(item.id)}
                >
                    Remove
                </button>
            </div>
        </li>
    );

    return (
        <div className={styles.cartView}>
            <h2 className={styles.cartName}>{activeCart.name}</h2>
            <p className={styles.cartTheme}>Theme: {activeCart.theme || 'No theme'}</p>
            <GroupDiscountProgressBar
                groupSize={groupSize}
                maxGroupSize={maxGroupSize}
                currentDiscountPercentage={currentDiscountPercentage}
        totalDiscountWon={cartCalculations.totalDiscountWon}
      />
      {discountedItems.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Group Discount Items</h3>
          <ul className={styles.itemList}>
            {sortItems(discountedItems).map(item => renderItem(item, true))}
          </ul>
        </>
      )}

      {regularItems.length > 0 && (
        <>
          <h3 className={styles.sectionTitle}>Regular Items</h3>
          <ul className={styles.itemList}>
            {sortItems(regularItems).map(item => renderItem(item, false))}
          </ul>
        </>
      )}

      <div className={styles.cartSummary}>
        <p>Regular Items Subtotal: ₩{safeToFixed(cartCalculations.regularSubtotalWon, 0)}</p>
        <p>Discounted Items Subtotal: ₩{safeToFixed(cartCalculations.discountedSubtotalWon, 0)}</p>
        <p>Total Discount: ₩{safeToFixed(cartCalculations.totalDiscountWon, 0)}</p>
        <p>Total: ₩{safeToFixed(cartCalculations.totalWon, 0)}</p>
      </div>
    </div>
  );
};

export default CartView;