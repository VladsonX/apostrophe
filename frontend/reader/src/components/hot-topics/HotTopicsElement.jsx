import HotTopicsCard from "./HotTopicsCard";
import "./HotTopicsElement.scss";
import HotTopicsSlider from "./HotTopicsSlider";
import HotTopicsTitle from "./HotTopicsTitle";

const HotTopicsElement = ({ title }) => {
  return (
    <div className="hot-topics">
      <HotTopicsTitle title={title} />
      <HotTopicsSlider>
        <HotTopicsCard />
        <HotTopicsCard />
        <HotTopicsCard />
      </HotTopicsSlider>
    </div>
  );
};

export default HotTopicsElement;
