import successImage from "../../../../../images/success.png";
import errorImage from "../../../../../images/error.png";


export default function InfoTooltip({ isSuccess }) {
  return (
    <div className="popup__content content__infoTool">
       <img
        src={isSuccess ? successImage : errorImage}
        alt={isSuccess ? "Registro exitoso" : "Error en el registro"}
      />
      <h2>
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </h2>
    </div>
  );
}
