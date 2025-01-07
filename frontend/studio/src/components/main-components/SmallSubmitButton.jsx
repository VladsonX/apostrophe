import "./SmallSubmitButton.scss";

const SmalSubmitButton = ({ onClick, text, position, color }) => {
  return (
    <button className={color==='red' ? "small-submit-button small-submit-button_red" : "small-submit-button"} onClick={onClick}
    style={position ? {position: position} : undefined}>
      {text}
    </button>
  );
};

export default SmalSubmitButton;
