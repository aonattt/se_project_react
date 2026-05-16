import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClick, clothingItems, handleCardClick }) {
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
          {clothingItems.map((item) => (
            <ItemCard
              key={item.id || item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
