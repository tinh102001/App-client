import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import FollowButton from "./FollowButton";
import { useSelector } from "react-redux";

const UserFollow = ({ user, event }) => {
  const navigate = useNavigate();
  const {auth} = useSelector((state) => state);
  const handleClick = () => {
    navigate(`/profile/${user._id}`)
    event.onClick();
  }
  return (
    <div
      key={user._id}
      className="follow"
      style={{display: "flex", alignItems: "center", justifyContent: "center" , marginRight: 20, marginTop: 10}}
      >
      <Avatar 
        src={user.avatar} 
        size={"small-avatar"}
        onClick = {handleClick}
        style = {{cursor: "pointer"}}
        />
      <div className="flex-grow-1"
        style={{display: "block", marginLeft: 20, cursor: "pointer"}}
        onClick = {handleClick}>
        <div>{user.username}</div>
        <div>{user.fullname}</div>
      </div>
      {user._id !== auth.user._id && <FollowButton user={user}/>}
    </div>
  );
};

export default UserFollow;