import { useRef, useContext, useState } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit, louding, setIsLoading } =
    useContext(CurrentUserContext);
  const titleRef = useRef();
  const urlRef = useRef();

  const [titleRefError, settitleRefError] = useState(" ");
  const [urlRefError, seturlRefError] = useState(" ");

  const newButtonClassName = `button popup__button edit-button ${
    titleRefError || urlRefError ? "popup__submit_disabled" : ""
  }`;

  const handleTitleChange = (event) => {
  if (!event.target.value) {
    settitleRefError(" ");
  } else if (event.target.value.length < 3) {
    settitleRefError("Error: debe tener más de 2 caracteres y menos de 40");
  } else {
    settitleRefError("");
  }
};

  const handleImageChange = () => {
     if (!urlRef.current.value) {
    seturlRefError(" ");
    return;
  }
  
    try {
      new URL(urlRef.current.value); // Si esto falla, salta al catch
      // URL válida → ¿qué harías aquí?
      seturlRefError("");
    } catch {
      // URL inválida → ¿qué debería pasar aquí?
      seturlRefError("Error con la url");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    handleAddPlaceSubmit({
      name: titleRef.current.value,
      link: urlRef.current.value,
    });
  }

  return (
    <form className="popup__form" id="new-card-form" onSubmit={handleSubmit}>
      <input
        id="title"
        className="popup__input popup__input_type_card-name"
        name="name"
        placeholder="Título"
        type="text"
        required
        ref={titleRef}
        onChange={handleTitleChange}
      />
      <span className="title-input-error form__input-error">
        {titleRefError}
      </span>
      <input
        id="url"
        className="popup__input popup__input_type_url"
        name="link"
        placeholder="Enlace a la imagen"
        type="url"
        required
        ref={urlRef}
        onChange={handleImageChange}
      />
      <span className="url-input-error form__input-error">{urlRefError}</span>
      <button className={newButtonClassName} type="submit" >
        {louding}
      </button>
    </form>
  );
}
