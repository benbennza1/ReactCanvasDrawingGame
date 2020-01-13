import React, { useState, useEffect } from 'react';
import { socket } from '../api';
import UserList from './user-list';

const Room = () => {
    // initialize
    const [initialize, setInitialize] = useState({
        name: '',
        room: '',
    });

    // chat
    const [users, setUsers] = useState([]);

    socket.on('users list', data => {
        setUsers(data);
    });

    useEffect(() => {
        socket.on('initialize', data => {
            setInitialize({
                ...data,
            });
        });

        socket.on('users list', data => {
            setUsers(data);
        });
    }, []);

    return (
        <div className='box'>
            <div>Room: {initialize.room}</div>
            <div className='users'>
                <UserList initialize={initialize} users={users} />
            </div>
        </div>
    );
};

export default Room;
