import React from "react";
import "./SideBar.css";
import avatar from "../../assets/Ellipse 18.svg";

const SideBar = () => {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">Aykut Onat</p>
    </div>
  );
};

export default SideBar;
