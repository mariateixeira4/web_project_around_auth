import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

import logo from "../../images/header.png";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onRegister({
      email,
      password,
    });
  }

  return (
    <div className="register">
      <header className="register__header">
        <img src={logo} alt="Around the U.S" className="register__logo" />

        <Link to="/signin" className="register__login">
          Faça o login
        </Link>
      </header>

      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__title">Inscrever-se</h1>

        <input
          className="register__input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="register__input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="register__button" type="submit">
          Inscrever-se
        </button>

        <p className="register__signin">
          Já é um membro? <Link to="/signin">Faça o login aqui!</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
