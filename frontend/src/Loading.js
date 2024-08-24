import React from 'react';
import { Container, Wrapper} from './styledComponents';
import icon from './assets/loading.svg';

const Loading = () => {
    return (
        <Container>
            <Wrapper>
                <header className="Loading-header">
                    <img src={icon} className="Loading-logo" alt="Loading. Please wait..." />
                    <caption>Opening ...</caption>
                </header>
            </Wrapper>
        </Container>
    )
}

export default Loading;