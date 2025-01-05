import './SubmitButton.scss';

const SubmitButton = ( {onClick, text} ) => {
  return (
    <button onClick={onClick} className="SubmitButton">{text}</button>
  )
}

export default SubmitButton