import { useRef, useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar, louding, setIsLoading } =
    useContext(CurrentUserContext);

  const [avatarRefError, setAvatarRefError] = useState(" ");

  const avatarButtonClassName = `button popup__button edit-button ${
    avatarRefError ? "popup__submit_disabled" : ""
  }`;

  const handleAvatarChange = () => {
    try {
      new URL(avatarRef.current.value); // Si esto falla, salta al catch
      // URL válida → ¿qué harías aquí?
      setAvatarRefError("");
    } catch {
      // URL inválida → ¿qué debería pasar aquí?
      setAvatarRefError("Error con la url");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        type="url"
        className="popup__input popup__input_type_avatar-url"
        name="avatar"
        placeholder="Enlace a la imagen"
        required
        ref={avatarRef}
        onChange={handleAvatarChange}
      />
      <span className="avatar-input-error form__input-error ">
        {avatarRefError}
      </span>
      <button type="submit" className={avatarButtonClassName}>
        {louding}
      </button>
    </form>
  );
}
