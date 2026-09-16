import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

import logo from "../../images/header.png";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onLogin({
      email,
      password,
    });
  }

  return (
    <div className="login">
      <header className="login__header">
        <img src={logo} alt="Around the U.S" className="login__logo" />

        <Link to="/signup" className="login__signup-link">
          Entrar
        </Link>
      </header>

      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Entrar</h1>

        <input
          className="login__input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="login__input"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login__button" type="submit">
          Entrar
        </button>

        <p className="login__signup">
          Ainda não é membro? <Link to="/signup">Inscreva-se aqui!</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
