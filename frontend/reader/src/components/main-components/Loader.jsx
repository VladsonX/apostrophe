import "./Loader.scss";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="#8584d2"
        strokeColor="#8584d2"
        strokeWidth="3"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
