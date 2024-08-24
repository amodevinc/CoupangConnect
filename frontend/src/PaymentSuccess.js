import React from 'react';
import { Container, Button, Wrapper, ButtonWrapper } from './styledComponents';
//import icon from './assets/success.svg';

const PaymentSuccess = () => {
    return (
        <Container>
            <Wrapper>
                <header className="Success-header">
                    <iframe title="Success Icon" src="https://lottie.host/embed/c19a8294-5e97-4204-a194-eac78344e75d/aR6uHy0CYh.json"></iframe>
                    {/*<img src={icon} className="Success-logo" alt="Payment Success!" />*/}
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