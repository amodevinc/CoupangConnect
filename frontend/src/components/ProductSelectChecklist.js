import React from 'react';
import { Form, ListGroup, ListGroupItem, Dropdown } from 'react-bootstrap';
import { ICONS } from './Icons'; // Import the icon mapping
import styled from 'styled-components';
import VotingButtons from './VotingButtons';

// Container for each checklist item
const ListGroupItemContainer = styled(ListGroupItem)`
  padding: 10px;
  display: flex;
  flex-direction: column;
  width: 60vh;
`;

// Container for the checkbox and icon
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

// Container for the image
const ImageContainer = styled.div`
  margin-top: 10px; // Space between checkbox and image
  img {
    height: 72px;
    width: 72px;
    border-radius: 8px; // Adjust rounding as needed
    object-fit: cover; // Ensures the image covers the area without distortion
  }
`;

// Styled icon container
const IconContainer = styled.div`
  cursor: pointer;
  svg {
    height: 24px; // Adjust size as needed
    width: 24px;
  }
`;

const ChecklistWithDividers = () => {
    const CloseIcon = ICONS.close; // Get the close icon component

    return (
        <ListGroup variant="flush">
            <ListGroupItemContainer>
                <CheckboxContainer>
                    <Form.Check type="checkbox" label="Item 1" />
                    <IconContainer>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </IconContainer>
                </CheckboxContainer>
                <ImageContainer>
                    <img src="https://via.placeholder.com/72" alt="Item 1" />
                </ImageContainer>
            </ListGroupItemContainer>
            <Dropdown.Divider />

            <ListGroupItemContainer>
                <CheckboxContainer>
                    <Form.Check type="checkbox" label="Item 2" />
                    <IconContainer>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </IconContainer>
                </CheckboxContainer>
                <ImageContainer>
                    <img src="https://via.placeholder.com/72" alt="Item 2" />
                </ImageContainer>
                <VotingButtons></VotingButtons>
            </ListGroupItemContainer>
            <Dropdown.Divider />

            <ListGroupItemContainer>
                <CheckboxContainer>
                    <Form.Check type="checkbox" label="Item 3" />
                    <IconContainer>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </IconContainer>
                </CheckboxContainer>
                <ImageContainer>
                    <img src="https://via.placeholder.com/72" alt="Item 3" />
                </ImageContainer>
            </ListGroupItemContainer>
            <Dropdown.Divider />

            <ListGroupItemContainer>
                <CheckboxContainer>
                    <Form.Check type="checkbox" label="Item 4" />
                    <IconContainer>
                        <CloseIcon style={{ cursor: 'pointer' }} />
                    </IconContainer>
                </CheckboxContainer>
                <ImageContainer>
                    <img src="https://via.placeholder.com/72" alt="Item 4" />
                </ImageContainer>
            </ListGroupItemContainer>
            
        </ListGroup>
    );
};

export default ChecklistWithDividers;
