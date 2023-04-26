import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  ProfileOutlined,
  // SettingOutlined,
  HeartOutlined,
  // KeyOutlined,
  LogoutOutlined,
  CompassOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";

import { logout } from "../../redux/actions/authActions";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { getAPI } from "../../utils/fetchAPI";

import SpinLoader from "../Loading/SpinLoader";
import UserCard from "../UserCard/UserCard";
import Notification from "../Notification/Notification";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Trang cá nhân", "sub1", <ProfileOutlined />),
  // getItem("Đổi mật khẩu", "sub2", <KeyOutlined />),
  // getItem("Cài đặt", "sub3", <SettingOutlined />),
  getItem("Đăng xuất", "sub4", <LogoutOutlined />),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];
const Header = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [checkLogout, setCheckLogout] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!search) return;

      try {
        setLoad(true);
        const res = await getAPI(`search?username=${search}`, auth.token);
        setUsers(res.data.searchResult);
        setLoad(false);
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, auth.token, dispatch]);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleClick = (e) => {
    if (e.key === "sub1") {
      navigate(`/profile/${auth.user._id}`);
      setIsShowProfile(false);
    }
    // if (e.key === "sub2") navigate("/password");
    // if (e.key === "sub3") navigate("/setting");
    if (e.key === "sub4")
      dispatch({ type: GLOBALTYPES.CONFIRM, payload: { action: "Đăng xuất" } });
  };

  const handleFocus = () => {
    setIsShowNotification(false);
    setIsShowProfile(false);
  };

  const handleLogo = () => {
    window.scrollTo({ top: 0 });
    navigate("/");
  };

  const handleNotification = () => {
    setIsShowProfile(false);
    setIsShowNotification(!isShowNotification);
  };

  const handleProfile = () => {
    setIsShowNotification(false);
    setIsShowProfile(!isShowProfile);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
            height="50x"
            width="50px"
            onClick={handleLogo}
          />
        </Link>
      </div>
      <form className="search-form">
        <div className="search_input">
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
            }
            onFocus={handleFocus}
          />
          <div className="search_loader">
            {load && <FontAwesomeIcon icon={faSpinner} spin />}
          </div>
        </div>

        <div className="users_search_result">
          {search &&
            users.map((user) => (
              <UserCard key={user._id} user={user} handleClose={handleClose} />
            ))}
        </div>
      </form>
      <div className="menu">
        <button className="btn-discover" onClick={() => navigate("/explore")}>
          <CompassOutlined
            className="discover-icon"
            style={{ fontSize: "24px", margin: "auto" }}
          />
        </button>
        <button className="btn-message" onClick={() => navigate("/message")}>
          <MessageOutlined
            className="message-icon"
            style={{ fontSize: "24px", margin: "auto" }}
          />
        </button>
        <button className="btn-notification" onClick={handleNotification}>
          <HeartOutlined
            className="notification-icon"
            style={{ fontSize: "24px", margin: "auto" }}
          />
          {notify.data.length > 0 && (
            <FontAwesomeIcon icon={faCircle} size="2xs" style={{ color: "#ff0000", position:"absolute" , right: "0", top: "0"}} />
          )}
        </button>
        {isShowNotification && (
          <Notification style={{ position: "absolute", top: "85%" }} />
        )}

        {auth.token ? (
          <div className="container-menu">
            <img
              className="profile"
              src={auth.user.avatar}
              alt="avatar"
              onClick={handleProfile}
            ></img>
            {isShowProfile && (
              <Menu
                className="menu-profile"
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={(e) => handleClick(e)}
                style={{
                  width: 256,
                }}
                items={items}
              />
            )}
          </div>
        ) : (
          <SpinLoader />
        )}
        {checkLogout && (
          <div className="back-form">
            <div className="modal-form"></div>
            <div className="container-logout">
              <p>Bạn muốn đăng xuất ?</p>
              <div className="form-footer">
                <Button
                  type="primary"
                  block
                  className="confirm-logout"
                  onClick={() => dispatch(logout())}
                >
                  Đồng ý
                </Button>
                <Button
                  type="primary"
                  danger
                  className="exit-logout"
                  onClick={() => setCheckLogout(false)}
                >
                  Hủy bỏ
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
