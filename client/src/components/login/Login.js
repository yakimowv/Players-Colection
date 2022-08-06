import "./Login.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/userServices";
import {
  types,
  useNotificationContext,
} from "../../contexts/NotificationContext";

function Login() {
  const { login } = useAuthContext();
  const { addNotification } = useNotificationContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginHandler = (e) => {
    e.preventDefault();
    setUser((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const email = user.email;
    const password = user.password;

    if (email === "" || password === "") {
      addNotification(`Wrong Email/Passwwor !`, types.error);
    }

    authService
      .login(email, password)
      .then((userData) => {
        login(userData);
        navigate("/");
      })
      .catch((err) => {
        addNotification(`${err} !`, types.error);
      });
  };

  return (
    <section id="login-page">
      <div className="login-section">
        <div className="login-info"></div>
        <form method="POST" onSubmit={onSubmit} className="loginForm">
          <h2>Login</h2>
          <ul className="login-li">
            <li>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="login-fields"
                value={user.email}
                onChange={loginHandler}
                id="email"
                name="email"
                placeholder="inter@abv.bg"
              />
            </li>
            <li>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="login-fields"
                value={user.password}
                onChange={loginHandler}
                id="password"
                name="password"
                placeholder="*******"
              />
            </li>
            <li>
              <button id="login-btn">Login</button>
            </li>
          </ul>
        </form>
      </div>
    </section>
  );
}

export default Login;
