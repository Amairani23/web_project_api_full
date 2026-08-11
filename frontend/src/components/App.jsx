import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";
import api from "../utils/api";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoTooltip from './Main/components/InfoTooltip/InfoTooltip';
import * as auth from '../utils/auth';
import { setToken, getToken, removeToken } from "../utils/token";
import Popup from "./Main/Popup/Popup";

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleRegistration = (data) => {
  auth.register(data)
    .then((res) => {
      console.log("Registro exitoso", res);
      handleOpenPopup({
        title: "",
        children: <InfoTooltip isSuccess={true} />,
      });

      setTimeout(() => {
        navigate("/signin");
        handleClosePopup();
      }, 2000);

      
    })
    .catch((err) => {
      console.log("Error registro", err);
      handleOpenPopup({
        title: "",
        children: <InfoTooltip isSuccess={false} />,
      });
    });
};
  

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        // Verifica que se incluyó un jwt antes de iniciar la sesión del usuario.
        if (data.token) {
          setToken(data.token); 
          setUserEmail(email);  // guardar los datos de usuario en el estado
          setIsLoggedIn(true);     // inicia la sesión del usuario
          navigate("/");      // enviarlo a /
        }
      })
      .catch((err) => {
      console.log("Error", err);
      handleOpenPopup({
        title: "",
        children: <InfoTooltip isSuccess={false} />,
      });
    });
  };

  useEffect(() => {
  const jwt = getToken();
    
  if (!jwt) {
    return;
  }

   // Llama a la función, pasándole el JWT.
  auth
    .checkToken(jwt)
    .then(({ data }) => {
      // si la respuesta es exitosa, inicia la sesión del usuario, guarda sus
      // datos en el estado y lo dirige a /ducks.
      setIsLoggedIn(true);
      setUserEmail(data.email);
      navigate("/"); 
    })
    .catch((err) => {
      console.log(err);
      removeToken();
    });
}, [navigate]); //si usas algo externo dentro del efecto, debes declararlo como dependencia

const handleLogout = () => {
  removeToken();
  setIsLoggedIn(false);
  setUserEmail('');
  navigate("/signin");
};



  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const louding = isLoading ? "Guardando..." : "Guardar";


  useEffect(() => {
  if (!isLoggedIn) return;

  api.getUserInfo()
    .then((data) => {
        setCurrentUser(data);
      })
    .catch(console.error);

  api.getInitialCards()
    .then((data) => {
        setCards(data);
      })
    .catch(console.error);
}, [isLoggedIn]);

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    // Envía una solicitud a la API y obtén los datos actualizados de la tarjeta
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  const handleAddPlaceSubmit = (card) => {
    (async () => {
      await api
        .addCard(card)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };


  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateUserInfo(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .updateAvatar(data)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
    setIsLoading(false);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
          louding,
          setIsLoading,
        }}
      >
      <Header userEmail={userEmail}
  isLoggedIn={isLoggedIn}
  onLogout={handleLogout}/>
          <Routes>
          <Route path="/signin" element={<Login handleLogin={handleLogin}/>}/>

          <Route path="/signup" 
          element={<Register handleRegistration={handleRegistration} onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup}
            popup={popup}/>}/>

          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
             <Main
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            popup={popup}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          </ProtectedRoute>
          }/>

          <Route
            path="*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
          
          </Routes>
          <Footer />
          {popup && (
            <Popup onClose={handleClosePopup} title={popup.title}>
              {popup.children}
            </Popup>
          )}
          
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
