import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import RemoveCard from "../Popup/components/RemoveCard/RemoveCard";

export default function Card(props) {
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link, isLiked } = card;

  const imagePopup = {
    children: <ImagePopup card={card} />,
  };

  const removeCardPopup = {
    title: "Tem certeza?",
    type: "confirm",
    children: <RemoveCard onConfirm={() => onCardDelete(card)} />,
  };

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    handleOpenPopup(removeCardPopup);
  }

  return (
    <li className="element">
      <button
        className="element__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>

      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(imagePopup)}
      />

      <div className="element__info">
        <div className="element__title-wrapper">
          <h2 className="element__title">{name}</h2>

          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
        </div>
      </div>
    </li>
  );
}
