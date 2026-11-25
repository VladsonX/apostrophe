import "./ReadMoreButton.scss";

const ReadMoreButton = ({onClick}) => {
  return (
    <button aria-label='Read more' onClick={onClick} className="channel-latest-articles__article-read-more">
      Read more
    </button>
  );
};

export default ReadMoreButton;
