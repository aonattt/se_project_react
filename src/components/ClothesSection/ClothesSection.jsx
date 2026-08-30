import React, { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__add-btn" onClick={handleAddClick}>
          + Add new
        </button>
      </div>
      <div>
        <ul className="clothes-section__items">
          {userClothingItems.map((item) => (
            <ItemCard
              key={item.id || item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
