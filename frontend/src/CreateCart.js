import React from 'react';
import { Container, Button, Input, InputWrapper, ButtonWrapper } from './styledComponents';

const CreateCart = () => {
    return (
        <Container>
            <h1>Create Cart</h1>
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