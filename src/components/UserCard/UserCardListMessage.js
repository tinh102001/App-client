import React from "react";
import Avatar from "../Avatar/Avatar";

const UserCardListMessage = ({ user, children }) => {
  return (
    <div className="user_card_mess_list_container">
      <div className="user_list_info">
        <Avatar src={user.avatar} size="big-avatar" />
        <div
          className="user_list_fullname"
          style={{ color: "black", fontWeight: "bold" }}
        >
          {user.fullname}
        </div>

        {children}
      </div>
    </div>
  );
};

export default UserCardListMessage;
