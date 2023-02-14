import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createPostTest } from "../../redux/actions/postAction";

function Status() {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPostTest({ content }));
    setContent("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="status_body">
          <textarea
            name="content"
            value={content}
            placeholder={`Bạn đang nghĩ gì thế?`}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="status_footer">
          <button className="btn btn-secondary w-100" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Status;
