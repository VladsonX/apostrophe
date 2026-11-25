import "./SubmitButton.scss";

const SubmitButton = ({ onClick, text }) => {
  return (
    <button aria-label='Submit' onClick={onClick} className="SubmitButton">
      {text}
    </button>
  );
};

export default SubmitButton;
