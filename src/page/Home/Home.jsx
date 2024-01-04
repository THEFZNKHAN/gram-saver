import { Link } from "react-router-dom";
import reelsIcon from "../../assets/reels.png";
import storiesIcon from "../../assets/stories.png";
import "./home.css";

const Home = () => {
  return (
    <div className="home-div">
      <Link to="/reels" className="icon-link">
        <div className="reels-icon">
          <img src={reelsIcon} alt="reels-icon" />
          <h1>Download Reels</h1>
        </div>
      </Link>
      <Link to="/stories" className="icon-link">
        <div className="stories-icon">
          <img src={storiesIcon} alt="stories-icon" />
          <h1>Download Stories</h1>
        </div>
      </Link>
    </div>
  );
};

export default Home;
