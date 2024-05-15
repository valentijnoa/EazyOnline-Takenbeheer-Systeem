import React, { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  // Function to handle the login
  const handeLogin = (e) => {
    e.preventDefault();

    // Sign in with email and password using Firebase authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Dispatch a login action to the AuthContext
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handeLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <span>Incorrect email or password</span>}
      </form>
    </div>
  );
};

export default Login;
