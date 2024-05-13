import React from "react";
import { useState } from "react";
import "./login.scss";

const Login = () => {
  const [error, setError] = useState(false);

  const handeLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <form onSubmit={handeLogin}>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Login</button>
        {error && <span>Incorrect email or password</span>}
      </form>
    </div>
  );
};

export default Login;
