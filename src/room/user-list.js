import React from 'react';
import { Badge, Table } from 'reactstrap';

const UserList = ({ initialize, users, ...props }) => {
    const usersList = users.map(user => {
        if (user.name !== initialize.name) {
            return (
                <tr>
                    <td>{user.name}</td>
                    <td>
                        <Badge pill>0</Badge>
                    </td>
                </tr>
            );
        }
    });

    return (
        <Table>
            <tbody>
                <tr>
                    <td>{initialize.name} (You)</td>
                    <td>
                        <Badge pill>0</Badge>
                    </td>
                </tr>
                {usersList}
            </tbody>
        </Table>
    );
};

export default UserList;
