import React from "react";
import { ListGroupItem, ListGroup } from "reactstrap";

const ulStyle = {
  listStyleType: "none"
};

const msgStyle = {
  margin: "5px",
  backgroundColor: "lightgrey"
};

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
