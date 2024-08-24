import React from 'react';
import { Container, Wrapper} from './styledComponents';
//import icon from './assets/loading.svg';

const Loading = () => {
    return (
        <Container>
            <Wrapper>
                <header className="Loading-header">
                    <iframe src="https://lottie.host/embed/c52c5c13-24f1-4cba-bbf6-ac06d5e2d2f9/sgYQV51Jmu.json"></iframe>
                    {/*<img src={icon} className="Loading-logo" alt="Loading. Please wait..." />*/}
                    <caption>Opening ...</caption>
                </header>
            </Wrapper>
        </Container>
    )
}

export default Loading;