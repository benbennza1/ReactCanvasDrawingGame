import React from "react";
import "./chat.css";
import { InputGroup } from "reactstrap";

const inputStyle = {
  // position: 'absolute',
  // // width: "100%",
  // // height: "100%",
};

const chatInput = ({ value, onChange, onKeyUp, onKeyDown, ...props }) => {
  return (
    <input
      type="text"
      style={{ ...inputStyle }}
      value={value}
      onChange={e => onChange(e)}
      onKeyDown={e => onKeyDown(e)}
      onKeyUp={e => onKeyUp(e)}
    />
  );
};

export default chatInput;
