import "./ReadMoreButton.scss";

const ReadMoreButton = ({onClick}) => {
  return (
    <button onClick={onClick} className="channel-latest-articles__article-read-more">
      Read more
    </button>
  );
};

export default ReadMoreButton;
