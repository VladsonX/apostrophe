import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import ErrorMessage from "../components/main-components/ErrorMessage";
import "./WelcomePage.scss";

const WelcomePage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(emailInput, passwordInput);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <section className="welcome">
      <div className="welcome__wrapper">
        <h1 className="logo">Apostrophe</h1>
        <div className="welcome__card">
          <form onSubmit={handleLogin} id="logInForm" className="welcome__form">
            <label className="welcome__form-label" htmlFor="emailInput">
              Your email:
            </label>
            <input
              required
              onChange={(e) => setEmailInput(e.target.value)}
              className="welcome__form-input"
              type="email"
              id="emailInput"
              placeholder="example@mail.com"
              value={emailInput}
            />
            <label className="welcome__form-label" htmlFor="passwordInput">
              Your password:
            </label>
            <input
              required
              onChange={(e) => setPasswordInput(e.target.value)}
              className="welcome__form-input"
              type="password"
              id="passwordInput"
              placeholder="********"
              value={passwordInput}
            />
          </form>
          <ErrorMessage error={error} />
        </div>
        <div className="welcome__buttons-wrapper">
          <button
            aria-label="Log In"
            type="submit"
            form="logInForm"
            value="Submit"
            className="welcome__logIn"
          >
            Log In
          </button>
          <button
            aria-label="Sign up"
            onClick={() => navigate("/signup")}
            className="welcome__signUp"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
