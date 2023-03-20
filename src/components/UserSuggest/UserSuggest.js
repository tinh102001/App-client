import React from "react";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../Button/FollowButton";

const UserSuggest = ({ users }) => {
  return (
    <div className="user-suggest">
      {users.map((user) => (
        <div
          key={user._id}
          className="d-flex align-items-center w-50 border gap-1">
          <Avatar src={user.avatar} size={"small-avatar"}/>
          <div className="flex-grow-1">
            <div>{user.username}</div>
            <div>{user.fullname}</div>
          </div>
          <FollowButton user={user}/>
        </div>
      ))}
      
    </div>
  );
};

export default UserSuggest;
