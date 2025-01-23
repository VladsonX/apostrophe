import { useNavigate } from "react-router";
import { putCurrentJwtToken } from "../script/LocalStorageUtils";
import { useState, useEffect } from "react";
import { getCurrentJwtToken } from "../script/LocalStorageUtils";

import { serverURL } from "../server";

import "./WelcomePage.scss";
import AOS from "aos";
import "aos/dist/aos.css";


const WelcomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);
  const [emailInput, setEmalInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    const token = getCurrentJwtToken();
    setIsAuthenticated(!!token);
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (isAuthenticated) {
    navigate("/");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email: emailInput,
      password: passwordInput,
      targetSystem: "STUDIO",
    };

    try {
      const response = await fetch(`${serverURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        if (data.jwt) {
          putCurrentJwtToken(data.jwt);
          navigate("/");
        }
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section  className="welcome">
      <div className="welcome__wrapper">
        <h1  className="logo">Apostrophe</h1>
        <div data-aos='zoom-fade-in' className="welcome__card">
          <form onSubmit={handleLogin} id="logInForm" className="welcome__form">
            <label className="welcome__form-label" htmlFor="emailInput">
              Your email:
            </label>
            <input
              required
              onChange={(e) => setEmalInput(e.target.value)}
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
        </div>
        <div data-aos='zoom-fade-in' className="welcome__buttons-wrapper">
          <button
            type="submit"
            form="logInForm"
            value="Submit"
            className="welcome__logIn"
          >
            Log In
          </button>
          <button
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
