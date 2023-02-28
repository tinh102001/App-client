import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ props }) => {
  return (
    <div className="user-card">
      <Link to="">
        <img className="avatar" src={props.avatar} alt="User Avatar" />
        <div className="info-user">
          <h1>{props.fullname}</h1>
          <h2>{props.username}</h2>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
