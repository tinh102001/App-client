import React, { useState, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { createPost } from "../../redux/actions/postActions";
import {
  faFaceSmile,
  faPlus,
  faImage,
  faCameraRetro,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Picker from "emoji-picker-react";
import { imageShow, videoShow } from "../../utils/imagesShow";

function CreatePostModal({ open, onClose, auth }) {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  const handleStopStream = () => {
    tracks.stop();
    setStream(false);
  };

  const handleCapture = (e) => {
    e.preventDefault();

    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };
  const [tracks, setTracks] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Không có ảnh. Hãy thêm ảnh của bạn!" },
      });
    dispatch(createPost({ content, images, auth }));

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { success: "Đã đăng bài viết" },
    });
    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
    onClose();
  };

  const [showPicker, setShowPicker] = useState(false);
  const [hideUpLoad, setHideUpLoad] = useState(false);
  const onEmojiClick = (emojiObject, event) => {
    const textAreaElement = document.getElementById("status-input");
    setContent(
      content.slice(0, textAreaElement.selectionStart) +
        emojiObject.emoji +
        content.slice(textAreaElement.selectionStart)
    );
  };

  const handleKeyDown = (evt) => {
    evt.target.style.height = "inherit";
    evt.target.style.height = `${evt.target.scrollHeight}px`;
  };

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

  const handleStream = (e) => {
    e.preventDefault();
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();

          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCloseModal = () => {
    setHideUpLoad(false);
    setShowPicker(false);
    setTracks("");
    setImages([]);
    setContent("");
    setStream(false);
  };
  return (
    <Modal
      show={open}
      onHide={onClose}
      className="create-post-modal"
      backdrop="static"
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <div className="title-create-post">Tạo bài viết</div>
          <div
            className="btn btn-close"
            onClick={() => {
              onClose();
              handleCloseModal();
            }}
          ></div>
        </Modal.Header>
        <Modal.Body>
          <div className="user-container">
            <img className="avatar" src={auth.user.avatar} alt="avatar" />
            <div className="user-content">
              <span className="user-name">{auth.user.username}</span>
              {
                //feeling
              }
            </div>
          </div>
          <div className="status-content">
            <textarea
              className="status-input"
              id="status-input"
              placeholder={`${auth.user.username} ơi, bạn đang nghĩ gì thế?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <div
              className="icon-emoji"
              onClick={() => setShowPicker(!showPicker)}
            >
              <FontAwesomeIcon icon={faFaceSmile} />
              {showPicker && (
                <Picker className="emoji-picker" onEmojiClick={onEmojiClick} />
              )}
            </div>
          </div>
          <div className="upload-image-container">
            <div className="show_images">
              {images.map((img, index) => (
                <div key={index} className="file_img">
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
                  <div
                    className="btn btn-close"
                    onClick={() => deleteImages(index)}
                  ></div>
                </div>
              ))}
            </div>
            <label
              className="btn-upload file-upload"
              style={{
                display: hideUpLoad ? "none" : "block",
              }}
            >
              <div
                className="btn btn-close"
                onClick={(e) => {
                  setHideUpLoad(true);
                  e.preventDefault();
                }}
              ></div>
              <input
                className="upload-file-computer"
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*,video/*"
                onChange={handleChangeImages}
              />
              <div className="btn-upload-img">
                <div className="icon-plus">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <span>Thêm ảnh/video</span>
              </div>
            </label>
            {stream && (
              <div className="btn icon-camera" onClick={handleCapture}>
                <div className="icon-capture">
                  <FontAwesomeIcon icon={faCamera} />
                </div>

                <span>Chụp</span>
              </div>
            )}
            <div className="btn-upload btn-screenshot">
              <div className="input_images">
                {!stream && (
                  <div className="btn-take-photo" onClick={handleStream}>
                    <div className="icon-camera">
                      <FontAwesomeIcon icon={faCameraRetro} />
                    </div>
                    <span>Chụp ảnh</span>
                  </div>
                )}
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
                  <div
                    className="btn btn-close"
                    onClick={handleStopStream}
                  ></div>
                  <canvas ref={refCanvas} style={{ display: "none" }} />
                </div>
              )}
            </div>
          </div>
          <div className="tools-status">
            <span>Thêm vào bài viết của bạn</span>
            <div className="tools">
              <div
                className="icon icon-image"
                onClick={() => setHideUpLoad(false)}
              >
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div className="icon icon-face-smile">
                <FontAwesomeIcon icon={faFaceSmile} />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-submit" type="submit">
            Đăng
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CreatePostModal;
