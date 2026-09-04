import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();

  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="url"
          name="avatar"
          placeholder="Link da imagem"
          required
          ref={avatarRef}
        />
        <span className="popup__error"></span>
      </fieldset>

      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
