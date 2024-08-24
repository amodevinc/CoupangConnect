import React from 'react';
import { Container, Button, Input, InputWrapper, ButtonWrapper } from './styledComponents';
import CustomTitleBar from  './components/PageTitleBar.js';

const CreateCart = () => {
    return (
        <Container>
            <CustomTitleBar
                leftIcon=""
                rightIcon="close"
                title="Create Cart"
            />
            <InputWrapper>
                <Input placeholder="John's cart" />
            </InputWrapper>
            <ButtonWrapper>
                <Button>Create Cart</Button>
            </ButtonWrapper>
        </Container>
    );
}

export default CreateCart;