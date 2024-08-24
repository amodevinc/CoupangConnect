import React, { useEffect, useState } from 'react';
import { Container, Button, Input, InputWrapper, ButtonsVerticalWrapper, ButtonsHorizontalWrapper } from './styledComponents';
import CustomTitleBar from  './components/PageTitleBar.js';

const ShareCart = () => {
    const [data, setData] = useState([
        {
            cart: "Summer Camping",
            username: "John",
            unique_code: ""
        }
    ])
    const [link, setLink] = useState("https://[cart].[username].[unique_code]");

    useEffect(() => {
        // Create unique code
        // Temporary Function - Generates random code every reload.
        const generateUniqueCode = () => {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const numbers = '0123456789';
            let result = '';
    
            for (let i = 0; i < 12; i++) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
    
            for (let i = 0; i < 5; i++) {
                result += numbers.charAt(Math.floor(Math.random() * numbers.length));
            }
    
            return result;
        };

        const generateLink = () => {
            const newUniqueCode = generateUniqueCode();
            const updatedData = { ...data[0], unique_code: newUniqueCode };
            setData([updatedData]); // Update data to new unique code

            const template = link;
            const generatedLink = template
                .replace("[cart]", updatedData.cart.replace(/\s+/g, ''))
                .replace("[username]", updatedData.username)
                .replace("[unique_code]", updatedData.unique_code);

            setLink(generatedLink);
        };

        generateLink();
    }, [data]);

    return (
        <Container>
            <CustomTitleBar
                leftIcon="arrow"
                rightIcon=""
                title={data[0].cart}
            />
            <InputWrapper>
                <Input value={link} readOnly/>
            </InputWrapper>
            <ButtonsVerticalWrapper>
                <Button>Share</Button>
                <Button>Next</Button>
            </ButtonsVerticalWrapper>
        </Container>
    );
}

export default ShareCart;