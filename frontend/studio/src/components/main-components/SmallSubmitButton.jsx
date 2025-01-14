import "./SmallSubmitButton.scss";

const SmalSubmitButton = ({ align, onClick, text, position, color }) => {
  return (
    <button
      className={
        color === "red"
          ? "small-submit-button small-submit-button_red"
          : "small-submit-button"
      }
      onClick={onClick}
      style={position ? { position: position } : align ? {alignSelf: align} : undefined}
    >
      {text}
    </button>
  );
};

export default SmalSubmitButton;
