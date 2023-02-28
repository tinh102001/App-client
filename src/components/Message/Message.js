import React from "react";
import { Link } from "react-router-dom";

const Message = ({ props }) => {
  return (
    <div className="message">
      <Link to="">
        <img className="avatar" src={props.avatar} alt="User Avatar" />
        <p>{props.message}</p>
      </Link>
    </div>
  );
};

export default Message;
