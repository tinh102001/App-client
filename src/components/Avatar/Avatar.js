import React from "react";
import "./style/Avatar.scss"

const Avatar = ({ src, size }) => {
    return (
        <img src={src} alt="avatar" className={size} />
    )
};

export default Avatar;