import React from 'react';
import { Form, ListGroup, ListGroupItem, Dropdown } from 'react-bootstrap';

const ChecklistWithDividers = () => {
    return (
        <ListGroup variant="flush">
            <ListGroupItem>
                <Form.Check style={{ width:"530px" }} type="checkbox" label="Item 1" />
            </ListGroupItem>
            <Dropdown.Divider />

            <ListGroupItem>
                <Form.Check type="checkbox" label="Item 2" />
            </ListGroupItem>
            <Dropdown.Divider />

            <ListGroupItem>
                <Form.Check type="checkbox" label="Item 3" />
            </ListGroupItem>
            <Dropdown.Divider />

            <ListGroupItem>
                <Form.Check type="checkbox" label="Item 4" />
            </ListGroupItem>
        </ListGroup>
    );
};

export default ChecklistWithDividers;
