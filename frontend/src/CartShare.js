import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Input, InputWrapper, ButtonsVerticalWrapper, ButtonsHorizontalWrapper } from './styledComponents';
import CustomTitleBar from './components/PageTitleBar.js';
import styles from './css/Cart.module.css';
import { useUnifiedCart } from './hooks/useUnifiedCart';

const ShareCart = () => {
  const { cartId } = useParams();
  const navigate = useNavigate();
  const { activeCart, generateSharingLink } = useUnifiedCart();
  const [link, setLink] = useState("");

  useEffect(() => {
    if (activeCart) {
      const generatedLink = generateSharingLink(cartId);
      setLink(generatedLink);
    }
  }, [activeCart, cartId, generateSharingLink]);

  const onShareClick = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard!');
    });
  }

  const onNextClick = () => {
    navigate(`/cart/${cartId}`);
  }

  if (!activeCart) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <CustomTitleBar
        leftIcon="arrow"
        rightIcon=""
        title={activeCart.name}
      />
      <InputWrapper>
        <Input value={link} readOnly/>
      </InputWrapper>
      <div className={styles.shareButtonsBottomContainer}>
        <button className={styles.shareButton} onClick={onShareClick}>Share</button>
        <button className={styles.nextButton} onClick={onNextClick}>Next</button>
      </div>
    </Container>
  );
}

export default ShareCart;