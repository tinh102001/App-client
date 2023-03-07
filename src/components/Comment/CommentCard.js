import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

//import Avatar from '../../Avatar'
// import LikeButton from '../../LikeButton'
// import CommentMenu from './CommentMenu'
// import { updateComment, likeComment, unLikeComment } from '../../../redux/actions/commentAction'
import InputComment from "./InputComment";

const CommentCard = ({ children, comment, post }) => {
  const { auth } = useSelector((state) => state);

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setOnReply(false);
  }, [comment, auth.user._id]);

  return (
    <div>
      <h6>{comment.user.username}</h6>

      <div>
        <div>
          <div>
            {comment.tag && comment.tag._id !== comment.user._id && (
              <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                @{comment.tag.username}
              </Link>
            )}
            <span>
              {content.length < 100
                ? content
                : readMore
                ? content + " "
                : content.slice(0, 100) + "...."}
            </span>
            {content.length > 100 && (
              <span onClick={() => setReadMore(!readMore)}>
                {readMore ? "Hide content" : "Read more"}
              </span>
            )}
          </div>

          <div>
            <small>{moment(comment.createdAt).fromNow()}</small>

            <small>{comment.likes.length} likes</small>
          </div>
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
