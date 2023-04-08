import React, { useState, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import {
  faPlus,
  faCameraRetro,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { imageShow } from "../../utils/imagesShow";
import { editprofile } from "../../redux/actions/profileActions";
import { Input, Select } from "antd";
const {TextArea} = Input;

function EditProfile({ open, onClose, auth, socket }) {
  const [images, setImages] = useState([]);
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
    const [data, setData] = useState({avatar: auth.user.avatar, fullname: auth.user.fullname, mobile: auth.user.mobile, address: auth.user.address,story: auth.user.story, website: auth.user.website, gender: auth.user.gender})
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
    // if (images.length === 0)
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: "Không có ảnh. Hãy thêm ảnh của bạn!" },
    //   });
    //dispatch(createPost({ content, images, auth, socket }));
    // dispatch(editprofile({data: {
    //     fullname: auth.user.fullname,
    //     avatar: auth.user.avatar,
    // }, auth: auth}));
    dispatch(editprofile({data: data, auth: auth}));
    setImages([]);
    if (tracks) tracks.stop();
    onClose();
  };
  const [hideUpLoad, setHideUpLoad] = useState(false);

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image largest is 5mb.");
      }

      return newImages.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...newImages]);
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
    setTracks("");
    setImages([]);
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
          <div className="title-create-post">Chỉnh sửa trang cá nhân</div>
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
            </div>
          </div>
          <div className="upload-image-container">
            <div className="show_images">
              {images.map((img, index) => (
                <div key={index} className="file_img">
                {img.camera ? (
                  imageShow(img.camera)
                ) : img.url ? (
                  imageShow(img.url)
                ) : (
                  imageShow(URL.createObjectURL(img))
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
              <input
                className="upload-file-computer"
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleChangeImages}
              />
              <div className="btn-upload-img">
                <div className="icon-plus">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
                <span>Thay ảnh đại diện</span>
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
              <div className="Input_images">
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
          <div className="model-info">
                <div>
                    <lable>Tên đầy đủ<br/> 
                      <Input 
                        value={data.fullname}
                        onChange={(e) => setData({...data, fullname: e.target.value})} 
                      />
                    </lable>
                </div>
                <div>
                    <lable>Số điện thoại<br/>
                      <Input 
                        value={data.mobile}
                        onChange={(e) => setData({...data, mobile: e.target.value})} 
                      />
                    </lable>
                </div>
                <div>
                    <lable>Địa chỉ<br/>
                      <TextArea 
                        value={data.address}
                        onChange={(e) => setData({...data, address: e.target.value})} 
                      />
                    </lable>
                </div>
                <div>
                    <lable>Tiểu sử<br/>
                      <TextArea 
                        value={data.story}
                        onChange={(e) => setData({...data, story: e.target.value})} 
                      />
                    </lable>
                </div>
                <div>
                    <lable>Trang web<br/>
                      <Input 
                        value={data.website}
                        onChange={(e) => setData({...data, website: e.target.value})} 
                    /></lable>
                </div>
                <div>
                    <lable>Giới tính<br/>
                      <Input 
                        value={data.gender}
                        onChange={(e) => setData({...data, gender: e.target.value})} 
                      />
                    </lable>
                </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-submit" type="submit">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditProfile;
