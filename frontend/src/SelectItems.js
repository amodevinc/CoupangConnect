import React from 'react';
import { Container, Button, Wrapper, ButtonWrapper } from './styledComponents';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

const SelectItems = () => {
    return (
        <Container>
            <h1>Select Items</h1>
            <Wrapper>
                <Dropdown.Menu show>
                    <Dropdown.Item eventKey="1"><Form><Form.Check label="Select All" className="custom-checkbox" /></Form></Dropdown.Item>
                    <Dropdown.Divider style={{ marginLeft:"10px", marginRight:"10px" }}/>
                    <Dropdown.Item eventKey="2"><Form><Form.Check label="Product Name" className="custom-checkbox" /></Form></Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item eventKey="3"><Form><Form.Check label="Product Name" className="custom-checkbox" /></Form></Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item eventKey="4"><Form><Form.Check label="Product Name" className="custom-checkbox" /></Form></Dropdown.Item>
                    <Dropdown.Divider />
                </Dropdown.Menu>
            </Wrapper>
            <ButtonWrapper>
                <Button>Next</Button>
            </ButtonWrapper>
        </Container>
    );
}

export default SelectItems;