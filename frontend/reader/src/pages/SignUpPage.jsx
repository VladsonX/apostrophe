import { useState } from "react";
import { useNavigate } from "react-router";
import SubmitButton from "../components/main-components/SubmitButton";
import "./SignUpPage.scss";
import { serverURL } from "../script/server";

const SignUpPage = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: userEmail,
      password: userPassword,
      name: userFirstName,
      surname: userLastName,
    };

    try {
      const response = await fetch(`${serverURL}/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/checkMailBox", { state: { email: userEmail } });
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        alert(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error occurred while sending data:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="signUp">
      <h1 className="logo signUp__logo">Sign up!</h1>
      <div className="signUp__card">
        <form id="signUpForm" onSubmit={handleSubmit} className="signUp__form">
          <label htmlFor="emailInput" className="signUp__label">
            Your email:
          </label>
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            required
            type="email"
            id="emailInput"
            className="signUp__input"
            placeholder="example@mail.com"
          />
          <label htmlFor="passwordInput" className="signUp__label">
            Your password:
          </label>
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            required
            type="password"
            id="passwordInput"
            className="signUp__input"
            placeholder="********"
          />

          <label htmlFor="firstNameInput" className="signUp__label">
            Your first name:
          </label>
          <input
            onChange={(e) => setUserFirstName(e.target.value)}
            required
            type="text"
            id="firstNameInput"
            className="signUp__input"
            placeholder="John"
          />
          <label htmlFor="lastNameInput" className="signUp__label">
            Your last name:
          </label>
          <input
            onChange={(e) => setUserLastName(e.target.value)}
            type="text"
            id="lastNameInput"
            className="signUp__input"
            placeholder="Johnson"
          />
          <SubmitButton type="submit" form="signUpForm" text="Sign up" />
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
