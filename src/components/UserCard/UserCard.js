import React from "react";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

const UserCard = ({ user, border, handleClose, children }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <div>
        <Link
          to={`/profile/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
        >
          <Avatar src={user.avatar} size="big-avatar" />

          <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
            <span className="d-block">{user.username}</span>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
