import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnifiedCart } from './hooks/useUnifiedCart.js';
import { Container, Button, Input, FormContainer, ButtonWrapper, InputGroup, Label, ErrorMessage } from './styledComponents';
import CustomTitleBar from './components/PageTitleBar.js';

const CreateCart = ({ userId }) => {
    console.log(`User id in create cart: ${userId}`)
    const [cartName, setCartName] = useState('');
    const [cartTheme, setCartTheme] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { createSharedCart } = useUnifiedCart(userId);
  
    const handleCreateCart = async () => {
      if (!cartName.trim()) {
        setError('Please enter a cart name');
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        const newCartId = await createSharedCart(cartName, cartTheme);
        console.info(`New cart id from createSharedCart ${newCartId}`);
        navigate(`/cart/${newCartId}`);
      } catch (err) {
        console.error('Failed to create cart:', err);
        setError('Failed to create cart. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Container>
        <CustomTitleBar
          leftIcon=""
          rightIcon="close"
          onRightIconClick={() => navigate(-1)}
        />
        <FormContainer>
          <InputGroup>
            <Label htmlFor="cartName">Cart Name</Label>
            <Input
              id="cartName"
              placeholder="e.g., John's cart"
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="cartTheme">Cart Theme</Label>
            <Input
              id="cartTheme"
              placeholder="e.g., Hiking"
              value={cartTheme}
              onChange={(e) => setCartTheme(e.target.value)}
            />
          </InputGroup>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormContainer>
        <ButtonWrapper>
          <Button onClick={handleCreateCart} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Cart'}
          </Button>
        </ButtonWrapper>
      </Container>
    );
  };
export default CreateCart;