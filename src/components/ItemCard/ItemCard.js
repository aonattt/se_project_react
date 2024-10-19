import React from "react";
import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  return (
    <li className="item-card">
      <img
        src={item?.imageUrl || item?.link}
        alt={item.name}
        className="item-card-image"
        onClick={() => handleCardClick(item)} // Add the onClick event
      />
      <h3 className="item-card-title">{item.name}</h3>
    </li>
  );
}

export default ItemCard;

