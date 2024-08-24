import React from 'react';
import { Container, Button, Wrapper, ButtonWrapper } from './styledComponents';
import icon from './assets/success.svg';

const PaymentSuccess = () => {
    return (
        <Container>
            <Wrapper>
                <header className="Success-header">
                    <img src={icon} className="Success-logo" alt="Payment Success!" />
                    <h2>Payment Successful</h2>
                </header>
            </Wrapper>
            <ButtonWrapper>
                <Button>Done</Button>
            </ButtonWrapper>
        </Container>
    )
}

export default PaymentSuccess;