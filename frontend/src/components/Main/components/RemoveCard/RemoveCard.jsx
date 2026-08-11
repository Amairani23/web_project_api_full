export default function RemoveCard({ onDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDelete();
  }

  return (
    <div className="popup__content">
      <form className="popup__form" name="delete-form">
        <h3 className="popup__title">¿Estás seguro/a?</h3>
        <button className="popup__button" type="submit" onClick={handleSubmit}>
          Sí
        </button>
      </form>
    </div>
  );
}
