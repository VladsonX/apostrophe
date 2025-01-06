import "./SmallSubmitButton.scss";

const SmalSubmitButton = ({ onClick, text, position }) => {
  return (
    <button className="small-submit-button" onClick={onClick}
    style={position ? {position: position} : undefined}>
      {text}
    </button>
  );
};

export default SmalSubmitButton;
