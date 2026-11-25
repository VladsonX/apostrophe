import "./ErrorMessage.scss";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <p role="alert" className="error-message">
      {error.message ?? String(error)}
    </p>
  );
};

export default ErrorMessage;
