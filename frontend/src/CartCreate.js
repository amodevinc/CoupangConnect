import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ButtonDisabled, Button, Input, InputWrapper, ButtonWrapper } from './styledComponents';
import CustomTitleBar from  './components/PageTitleBar.js';

const CreateCart = () => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();  // Initialize useNavigate

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleCreateCart = () => {
        // Perform any logic needed before navigation (e.g., form validation, API calls, etc.)
        
        // Navigate to a different page
        navigate('/select-items');
    };

    return (
        <Container>
            <CustomTitleBar
                leftIcon=""
                rightIcon="close"
                title="Create Cart"
            />
            <InputWrapper>
                <Input 
                    placeholder="John's cart"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </InputWrapper>
            <ButtonWrapper>
                {inputValue ? (
                    <Button onClick={handleCreateCart}>Create Cart</Button>
                ) : (
                    <ButtonDisabled>Create Cart</ButtonDisabled>
                )}
            </ButtonWrapper>
        </Container>
    );
}

export default CreateCart;
