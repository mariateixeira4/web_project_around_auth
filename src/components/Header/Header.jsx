import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header.png";

function Header({ isLoggedIn, userEmail }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  function handleMenuToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header
      className={`header page__section ${isMenuOpen ? "header_menu-open" : ""}`}
    >
      {isLoggedIn ? (
        <>
          <div className="header__mobile-account">
            <span className="header__email">{userEmail}</span>

            <button
              className="header__logout"
              type="button"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>

          <div className="header__main">
            <img
              src={logo}
              alt="Around the U.S logo"
              className="logo header__logo"
            />

            <button
              className={`header__menu-button ${
                isMenuOpen ? "header__menu-button_close" : ""
              }`}
              type="button"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={handleMenuToggle}
            />
          </div>
        </>
      ) : (
        <>
          <img
            src={logo}
            alt="Around the U.S logo"
            className="logo header__logo"
          />

          <div className="header__auth">
            <Link className="header__link" to="/signup">
              Inscreva-se
            </Link>

            <Link className="header__link" to="/signin">
              Entrar
            </Link>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
