import React from "react";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../Button/FollowButton";
import "./style.scss";

const UserSuggest = ({ users }) => {
  return (
    <div className="user-suggest">
      <div className="header-suggest">
        <span className="title">Gợi ý cho bạn</span>
        <span className="see-all">Xem thêm</span>
      </div>

      <div className="content-suggest">
        {users.map((user) => (
          <div
            key={user._id}
            className="d-flex align-items-center gap-1 suggest-user"
          >
            <Avatar src={user.avatar} size={"small-avatar"} />
            <div className="flex-grow-1">
              <div className="user-name">{user.username}</div>
            </div>
            <FollowButton user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSuggest;
