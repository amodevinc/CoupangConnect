import React from 'react';
import { Container, Button, Wrapper, ButtonWrapper } from './styledComponents';
import ChecklistWithDividers from './components/ProductSelectChecklist';
import CustomTitleBar from  './components/PageTitleBar.js';
import CartView from './components/CartView.js';
//import { useUnifiedCart } from '../hooks/useUnifiedCart';

const SelectItems = () => {
    return (
        <Container>
            <CustomTitleBar
                leftIcon="arrow"
                rightIcon="link"
                title="Select Items"
            />
            {/*
            <Wrapper>
                <ChecklistWithDividers />
            </Wrapper>
            <ButtonWrapper>
                <Button>Next</Button>
            </ButtonWrapper>
            */}
            <CartView ></CartView>
        </Container>
    );
}

export default SelectItems;