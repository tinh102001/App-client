import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost } from "../../redux/actions/postAction";

import { imageShow, videoShow } from "../../utils/imagesShow";
import SpinLoader from "../loading/SpinLoader";
// import Icons from "./Icons";

function Status() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const videoRef = useRef();
  const refCanvas = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Không có ảnh. Hãy thêm ảnh của bạn!" },
      });
    dispatch(createPost({ content, images, auth }));
  };

  const handleStopStream = () => {};

  const handleCapture = () => {};

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const handleStream = () => {};

  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  console.log(images);

  return (
    <div className="status_modal">
      {auth.token ? (
        <form onSubmit={handleSubmit}>
          <div className="status_header">Header Status</div>
          <div className="status_body">
            <textarea
              name="content"
              value={content}
              placeholder={`${auth.user.username}, Bạn đang nghĩ gì?`}
              onChange={(e) => setContent(e.target.value)}
            />
            {/* <div className="d-flex">
              <div className="flex-fill"></div>
              <Icons setContent={setContent} content={content} />
            </div> */}
            <div className="show_images">
              {images.map((img, index) => (
                <div key={index} id="file_img">
                  {img.camera ? (
                    imageShow(img.camera)
                  ) : img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShow(img.url)
                        : imageShow(img.url)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShow(URL.createObjectURL(img))
                        : imageShow(URL.createObjectURL(img))}
                    </>
                  )}
                  <span onClick={() => deleteImages(index)}>&times;</span>
                </div>
              ))}
            </div>
            {stream && (
              <div className="stream position-relative">
                <video
                  autoPlay
                  muted
                  ref={videoRef}
                  width="100%"
                  height="100%"
                />

                <span onClick={handleStopStream}>&times;</span>
                <canvas ref={refCanvas} style={{ display: "none" }} />
              </div>
            )}

            <div className="input_images">
              {stream ? (
                <i className="fas fa-camera" onClick={handleCapture} />
              ) : (
                <>
                  <i className="fas fa-camera" onClick={handleStream} />

                  <div className="file_upload">
                    <i className="fas fa-image" />
                    <input
                      type="file"
                      name="file"
                      id="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleChangeImages}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="status_footer">
            <button className="btn btn-secondary w-100" type="submit">
              Post
            </button>
          </div>
        </form>
      ) : (
        <SpinLoader />
      )}
    </div>
  );
}

export default Status;
