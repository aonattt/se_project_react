import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id || item.id, isLiked: isLiked });
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {currentUser && (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLike}
          ></button>
        )}
      </div>

      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
