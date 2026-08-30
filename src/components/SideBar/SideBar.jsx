import React, { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onEditProfileClick, handleSignOut }) => {
  const currentUser = useContext(CurrentUserContext);

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt="User Avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">{userInitial}</div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <div className="sidebar__buttons">
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
