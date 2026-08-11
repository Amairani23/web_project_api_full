import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login ({ handleLogin }) {

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
    handleLogin({
    email: data.email,
    password: data.password,
  });
  };


  return (
    <div className="content">
      <div className="login">
          <h1 className="login__title">Iniciar sesión</h1>
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
              onChange={handleChange}
              />

              <button 
              type="submit" 
              className='login__buttom'>
                  Inicia sesión
              </button>
          </form>
          <div className="login__register">
              <p>¿Ya eres miembro?</p>
              <Link to="/register" className="register__login-link" >
              Registrate aquí
              </Link>
        </div>
      </div>
    </div>
  )
}
