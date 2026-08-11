import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser, louding, setIsLoading } =
    useContext(CurrentUserContext); // Obtiene el objeto currentUser

  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const profileButtonClassName = `button popup__button edit-button ${
    nameError || descriptionError ? "popup__submit_disabled" : ""
  }`;

  const handleNameChange = (event) => {
    if (event.target.value.length < 3) {
      setNameError("Error: debe tener más de 2 caracteres y menos de 40");
    } else {
      setNameError("");
    }

    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < 3) {
      setDescriptionError(
        "Error: debe tener más de 2 caracteres y menos de 40",
      );
    } else {
      setDescriptionError("");
    }

    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    setIsLoading(true);

    handleUpdateUser({ name, about: description }); // Actualiza la información del usuario
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="40"
          minLength="2"
          name="userName"
          placeholder="Name"
          required
          type="text"
          value={name} // Bind name to input
          onChange={handleNameChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="owner-name-error">
          {nameError}
        </span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="200"
          minLength="2"
          name="userDescription"
          placeholder="About me"
          required
          type="text"
          value={description} // Vincula description con la entrada
          onChange={handleDescriptionChange} // Agrega el controlador onChange
        />
        <span className="popup__error" id="owner-description-error">
          {descriptionError}
        </span>
      </label>
      <button className={profileButtonClassName} type="submit">
        {louding}
      </button>
    </form>
  );
}
