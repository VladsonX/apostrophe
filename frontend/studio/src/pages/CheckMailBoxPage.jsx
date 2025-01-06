import { useNavigate, useLocation, Link } from "react-router";
import "./CheckMailBoxPage.scss";
import SubmitButton from "../components/SubmitButton";

const CheckMailBoxPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  return (
    <section className="checkMailBox">
      <div className="checkMailBox__wrapper">
        <h1 className="logo checkMailBox__header">Verify your email</h1>
        {email ? (
          <p className="checkMailBox__descr">
            Confirmation link was sent to your email:{" "}
            <a href={`mailto: ${email}`} className="checkMailBox__link">{email}</a>
          </p>
        ) : (
          <p className="checkMailBox__descr">Error: Email wasn't provided</p>
        )}
        <SubmitButton
          onClick={() => navigate('/welcome')}
          className="checkMailBox__button"
          text="Log in"
        />
      </div>
    </section>
  );
};

export default CheckMailBoxPage;
