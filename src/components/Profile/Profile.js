import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ onSelectCard, openAddClothesModal, clothingItems }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onSelectCard={onSelectCard}
        openAddClothesModal={openAddClothesModal}
        clothingItems={clothingItems}
      />
    </div>
  );
};

export default Profile;
