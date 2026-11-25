import "./SubmitButton.scss";

// Extra props (type, form, disabled...) go straight to the <button>.
const SubmitButton = ({ text, type = "button", ...buttonProps }) => (
  <button type={type} className="SubmitButton" {...buttonProps}>
    {text}
  </button>
);

export default SubmitButton;
