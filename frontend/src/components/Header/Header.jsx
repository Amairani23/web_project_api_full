
import logo from "../../../images/logo.svg";
import { Link, useLocation } from 'react-router';
import UserMenu from "./UserMenu";

export default function Header({ userEmail, isLoggedIn, onLogout }) {
  
  const location = useLocation();

  return (
    <header className="header page__section">
      <img
        alt="Logotipo Around The U.S."
        className="logo header__logo"
        src={logo}
      />


      {!isLoggedIn && location.pathname === "/signin" && (
        <Link to="/signup" className="register__login-link">
          Regístrate
        </Link>
      )}

      {!isLoggedIn && location.pathname === "/signup" && (
        <Link to="/signin" className="register__login-link">
          Iniciar sesión
        </Link>
      )}

      {isLoggedIn && (
        <UserMenu
          userEmail={userEmail}
          onLogout={onLogout}
        />
      )}
      
    </header>
  );
}