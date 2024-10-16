import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import './ClothesSection.css';

const ClothesSection = ({
  onSelectCard,
  openAddClothesModal,
  clothingItems,
}) => {
  return (
    <div className="clothes__section">
      <div className="clothes__section-title-wrapper">
        <p className="clothes__section-title">Your items</p>
        <button
          type="submit"
          className="clothes__section-button"
          onClick={openAddClothesModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothing__section-cards">
        {clothingItems.map((data) => {
          return (
            <ItemCard key={data.id} data={data} onSelectCard={onSelectCard} />
          );
        })}
      </div>
    </div>
  );
};

export default ClothesSection;
