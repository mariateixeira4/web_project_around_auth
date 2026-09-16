import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import avatar from "../../images/Avatar.png";
import editIcon from "../../images/EditButton.png";

import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";

function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Novo Local",
    children: <NewCard />,
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Alterar foto do perfil",
    children: <EditAvatar />,
  };

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <img
                src={currentUser.avatar || avatar}
                alt="Foto de perfil"
                className="profile__image"
              />

              <button
                className="profile__avatar-edit-button"
                type="button"
                onClick={() => onOpenPopup(editAvatarPopup)}
              ></button>
            </div>

            <div className="profile__info">
              <div className="profile__name-container">
                <h1 className="profile__name">{currentUser.name}</h1>

                <button
                  className="profile__button profile__edit-button"
                  type="button"
                  onClick={() => onOpenPopup(editProfilePopup)}
                >
                  <img
                    src={editIcon}
                    alt="Editar perfil"
                    className="profile__button-icon"
                  />
                </button>
              </div>

              <p className="profile__text">{currentUser.about}</p>
            </div>

            <button
              className="profile__button profile__add-button"
              type="button"
              onClick={() => onOpenPopup(newCardPopup)}
            >
              +
            </button>
          </div>
        </section>

        <section className="elements">
          <ul className="elements__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                handleOpenPopup={onOpenPopup}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>

        {popup && (
          <Popup onClose={onClosePopup} title={popup.title} type={popup.type}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}

export default Main;
