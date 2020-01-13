import React, { useState, useEffect } from 'react';
import { socket } from '../api';
import './chat.css';
import ChatInput from './chat-input';
import ChatHistory from './chat-history';
import { ListGroup, Container, Row, Col } from 'reactstrap';

const Chat = () => {
    // initialize
    const [initialize, setInitialize] = useState({
        name: '',
        room: '',
    });

    // chat
    const [val, setVal] = useState('');
    const [msg, setMsg] = useState([]);

    const onChange = e => {
        setVal(e.target.value);
    };

    const onKeyUp = e => {
        if (e.keyCode === 13) {
            socket.emit('newMsg', val);
            setVal('');
        }
    };

    socket.on('global-joinMsg', data => alert(data));
    socket.on('receiveMsg', data => setMsg(data));

    useEffect(() => {
        socket.on('getMsg', data => setMsg(data));

        socket.on('initialize', data => {
            setInitialize({
                ...data,
            });
        });
    }, []);

    return (
        <div className='chat'>
            <Container xs='1' fluid={true}>
                <Row>
                    <Col>
                        <div className='chat-history'>
                            <ChatHistory msg={msg} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='chat-input'>
                            <ChatInput
                                value={val}
                                onChange={onChange}
                                onKeyUp={onKeyUp}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Chat;
