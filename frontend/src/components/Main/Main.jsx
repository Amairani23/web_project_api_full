import { useContext } from "react";
import NewCard from "./Popup/form/NewCard/NewCard";
import EditProfile from "./Popup/form/EditProfile/EditProfile";
import EditAvatar from "./Popup/form/EditAvatar/EditAvatar";
import Card from "./components/Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main(props) {
  const { onOpenPopup, cards, onCardLike, onCardDelete } =
    props;

  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = { title: "Editar Avatar", children: <EditAvatar /> };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="Foto de perfil"
            className="profile__image"
          />
          <div className="profile__image-edit-button">
            <img
              src="./images/edit-icon.svg"
              alt="Editar"
              className="profile__image-edit-icon"
              onClick={() => onOpenPopup(editAvatarPopup)}
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Agregar tarjeta"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
