import React from 'react';
import { ListGroupItem, ListGroup } from 'reactstrap';

const ulStyle = {
    listStyleType: 'none',
};

const msgStyle = {
    margin: '5px',
    backgroundColor: 'lightgrey',
};

const chatHistory = ({ msg, ...props }) => {
    return (
        <ListGroup>
            {msg.map(msg => (
                <ListGroupItem>{msg}</ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default chatHistory;
