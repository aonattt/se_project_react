import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
  onEditProfileClick,
  handleSignOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          handleSignOut={handleSignOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
