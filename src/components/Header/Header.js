import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileOutlined,
  SettingOutlined,
  HeartOutlined,
  KeyOutlined,
  LogoutOutlined,
  CompassFilled,
  MessageOutlined
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

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
  getItem("Đổi mật khẩu", "sub2", <KeyOutlined />),
  getItem("Cài đặt", "sub3", <SettingOutlined />),
  getItem("Đăng xuất", "sub4", <LogoutOutlined />),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4"];
const Header = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
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
    if (e.key === "sub2") navigate("/password");
    if (e.key === "sub3") navigate("/setting");
    if (e.key === "sub4") setCheckLogout(true);
  };

  const handleFocus = () => {
    if (search) setIsSearch(true);
    setIsShowNotification(false);
    setIsShowProfile(false);
  };

  const handleLogo = () => {
    window.scrollTo({ top: 0 });
    navigate("/");
  };

  const handleNotification = () => {
    setIsSearch(false);
    setIsShowProfile(false);
    setIsShowNotification(!isShowNotification);
  };

  const handleProfile = () => {
    setIsShowNotification(false);
    setIsSearch(false);
    setIsShowProfile(!isShowProfile);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/icons/logo.svg"}
            alt="logo"
            height="50x"
            width="50px"
            onClick={handleLogo}
          />
        </Link>
      </div>
      <form className="search-form">
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
          onBlur={() => {
            setIsSearch(false);
          }}
        />
        {load && <SpinLoader />}
        <div className="users">
          {search &&
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                border="border"
                handleClose={handleClose}
              />
            ))}
        </div>
      </form>
      <div className="menu">
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
        </button>
        <button className="btn-discover" onClick={() => navigate("/explore")}>
          <CompassFilled
            className="discover-icon"
            style={{ fontSize: "24px", margin: "auto" }}
          />
        </button>
        {auth.token ? (
          <img
            className="profile"
            src={auth.user.avatar}
            alt="avatar"
            onClick={handleProfile}
          ></img>
        ) : (
          <SpinLoader />
        )}
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
        ;
        {isShowNotification && (
          // <div className="notification">
          //   <h1>Thông báo</h1>
          // </div>
          <Notification />
        )}
        ;{isSearch && <div className="search-user"></div>}
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
