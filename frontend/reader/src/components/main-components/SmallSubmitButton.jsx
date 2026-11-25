import "./SmallSubmitButton.scss";

const SmalSubmitButton = ({
  align,
  onClick,
  text,
  position,
  color,
  followed,
}) => {
  return (
    <button
      className={
        color
          ? `small-submit-button small-submit-button_${color}`
          : `small-submit-button`
      }
      onClick={onClick}
      style={
        position
          ? { position: position }
          : align
          ? { alignSelf: align }
          : undefined
      }
    >
      {text}
    </button>
  );
};

export default SmalSubmitButton;
