import React from 'react';

const chatHistory = ({ msg, ...props }) => {
    return (
        <tbody>
            {msg.map(msg => (
                <tr>
                    <td>
                        {props.name} {msg}
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default chatHistory;
