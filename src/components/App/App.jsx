import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "../../index.css";
import "./App.css";

import { useState, useEffect } from "react";

import api from "../../utils/api";
import { authorize, register, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    email: "",
  });

  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);

        return Promise.all([api.getUserInfo(), api.getInitialCards()]);
      })
      .then(([userData, cardsData]) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          ...userData,
        }));

        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .updateUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((err) => console.error(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );

        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  }

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);

        return Promise.all([api.getUserInfo(), api.getInitialCards()]);
      })
      .then(([userData, cardsData]) => {
        setCurrentUser((currentUser) => ({
          ...currentUser,
          ...userData,
        }));

        setCards(cardsData);
        navigate("/");
      })
      .catch((err) => {
        console.error("ERRO NO LOGIN:", err);
      });
  }

  function handleRegister({ email, password }) {
    register(email, password)
      .then(() => {
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);

    if (isRegistrationSuccess) {
      navigate("/signin");
    }
  }

  return (
    <>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={isRegistrationSuccess}
      />

      <Routes>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CurrentUserContext.Provider
                value={{
                  currentUser,
                  handleUpdateUser,
                  handleUpdateAvatar,
                  handleAddPlaceSubmit,
                }}
              >
                <div className="page">
                  <Header
                    isLoggedIn={isLoggedIn}
                    userEmail={currentUser.email}
                  />

                  <Main
                    cards={cards}
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />

                  <Footer />
                </div>
              </CurrentUserContext.Provider>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </>
  );
}

export default App;
