import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ handleRegistration }) {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };


  return (
    <div className="content">
      <div className="login page__section">
          <h1 className="login__title">Registrate</h1>
          <form action="" className="login__form" onSubmit={handleSubmit}>
              <input 
              className="login__input" 
              type="email" 
              name="email"
              placeholder="Correo electrónico"
              value={data.email}
              onChange={handleChange}/>
              <input 
              className="login__input" 
              type="password" 
              name="password"
              placeholder="Contraseña"
              value={data.password}
              onChange={handleChange}/>

              <button type="submit" className='login__buttom'>
                  Regístrate
              </button>
          </form>

          <div className="login__register">
              <p>¿Ya eres miembro?</p>
              <Link to="/login" className="register__login-link">
              Inicia sesión aquí
              </Link>
        </div>
      </div>
    </div>
  )
}
