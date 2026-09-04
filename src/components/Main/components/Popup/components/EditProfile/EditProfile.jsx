import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <input
          className="popup__input"
          type="text"
          name="name"
          placeholder="Nome"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error"></span>

        <input
          className="popup__input"
          type="text"
          name="about"
          placeholder="Sobre mim"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error"></span>
      </fieldset>

      <button className="popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
