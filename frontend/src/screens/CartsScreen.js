import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import styles from '../css/CartsScreen.module.css';
import { ReactComponent as LogoSVG } from '../coupang_connect/coupang_connect_logo_small.svg';
import { ReactComponent as RightArrowSVG } from '../assets/right_arrow.svg';
import Lottie from 'react-lottie';
import loadingCartsAnimation from '../assets/lotties/loading_carts.json';

const UserAvatar = ({ initial }) => (
  <div className={styles.userAvatar}>{initial}</div>
);

const CartCard = ({ cart }) => (
  <Link to={`/cart/${cart.id}`} className={styles.cartCard}>
    <div className={styles.cartInfo}>
      <div className={styles.cartUsers}>
        {cart.members.slice(0, 3).map((member, index) => (
          <UserAvatar key={index} initial={member.charAt(0).toUpperCase()} />
        ))}
      </div>
      <div className={styles.cartDetails}>
        <h3 className={styles.cartName}>{cart.name}</h3>
        <p className={styles.itemCount}>{cart.items.length} items</p>
      </div>
    </div>
    <RightArrowSVG />
  </Link>
);

const CartsScreen = ({ userId }) => {
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingCartsAnimation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
    };
  const { userCarts } = useUnifiedCart(userId);
  const navigate = useNavigate();

  const handleCreateNewCart = () => {
    navigate('/create-cart');
  };

  const renderCartCards = () => {
    if(userCarts?.length === 0){
        return (
            <div>
                <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
            </div>
        )
    } else {
        return (
            userCarts.map(cart => (
                <CartCard key={cart.id} cart={cart} />
            ))
        )
    }
  }

  return (
    <div className={styles.cartsScreen}>
      <header className={styles.header}>
        <LogoSVG />
      </header>
      <main className={styles.main}>
        <button onClick={handleCreateNewCart} className={styles.createCartButton}>
          <span className={styles.plusIcon}>+</span> Create new cart
        </button>
        <div className={styles.cartList}>
          {renderCartCards()}
        </div>
      </main>
    </div>
  );
};

export default CartsScreen;