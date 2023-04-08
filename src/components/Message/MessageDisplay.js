import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { imageShow, videoShow } from "../../utils/imagesShow";
import { deleteMessages } from "../../redux/actions/messageActions";

import Times from "./Times";
import Avatar from "../Avatar/Avatar";

const MessageDisplay = ({ user, msg, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="content_chat_container">
        <div className="chat_title">
          <Avatar src={user.avatar} size="small-avatar" />
        </div>

        <div className="you_content">
          {user._id === auth.user._id && (
            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteMessages} />
          )}

          <div>
            {msg.text && <div className="chat_text">{msg.text}</div>}
            {msg.media.map((item, index) => (
              <div key={index}>
                {item.url.match(/video/i)
                  ? videoShow(item.url)
                  : imageShow(item.url)}
              </div>
            ))}
          </div>

          {msg.call && (
            <button
              className="btn d-flex align-items-center py-3"
              style={{ background: "#eee", borderRadius: "10px" }}
            >
              <span
                className="material-icons font-weight-bold mr-1"
                style={{
                  fontSize: "2.5rem",
                  color: msg.call.times === 0 ? "crimson" : "green",
                }}
              >
                {msg.call.times === 0
                  ? msg.call.video
                    ? "videocam_off"
                    : "phone_disabled"
                  : msg.call.video
                  ? "video_camera_front"
                  : "call"}
              </span>

              <div className="text-left">
                <h6>{msg.call.video ? "Video Call" : "Audio Call"}</h6>
                <small>
                  {msg.call.times > 0 ? (
                    <Times total={msg.call.times} />
                  ) : (
                    new Date(msg.createdAt).toLocaleTimeString()
                  )}
                </small>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="chat_time">
        {moment(msg.createdAt).format("DD/MM/YYYY HH:MM")}
      </div>
    </>
  );
};

export default MessageDisplay;
