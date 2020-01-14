import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../api';
import './chat.css';
import ChatHistory from './chat-history';
import { Table, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';

const Chat = () => {
    // initialize
    const [initialize, setInitialize] = useState({
        name: '',
        room: '',
    });

    // chat
    const [val, setVal] = useState('');
    const [msg, setMsg] = useState([]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ block: 'end' });
    };

    const onChange = e => {
        setVal(e.target.value);
    };

    const onKeyDown = e => {
        if (e.keyCode === 13) {
            socket.emit('newMsg', val);
            setVal('');
        }
    };
    const onKeyUp = e => {
        // if (e.keyCode === 13) {
        //   socket.emit("newMsg", val);
        //   setVal("");
        // }
    };

    const onClickEnter = e => {
        socket.emit('newMsg', val);
        setVal('');
    };

    socket.on('global-joinMsg', data => alert(data));
    socket.on('receiveMsg', data => {
        setMsg(data);
        scrollToBottom();
    });

    useEffect(() => {
        socket.on('getMsg', data => {
            setMsg(data);
            scrollToBottom();
        });

        socket.on('initialize', data => {
            setInitialize({
                ...data,
            });
            scrollToBottom();
        });
    }, []);

    return (
        <div className='chat'>
            <Table striped>
                <ChatHistory msg={msg} />
                <div ref={messagesEndRef} />
            </Table>

            <div
                className='chat-input'
                style={{ position: 'absolute', width: '80%', bottom: '0px' }}
            >
                <InputGroup>
                    <Input
                        value={val}
                        onKeyUp={onKeyUp}
                        onKeyDown={onKeyDown}
                        onChange={onChange}
                    />
                    <InputGroupAddon addonType='append'>
                        <Button color='success' onClick={onClickEnter}>
                            Send
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    );
};

export default Chat;
