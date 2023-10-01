import "./featured.css";
import city1 from "../image/banjalukaimg.jpg";
import city2 from "../image/beogradimg.webp";
import city3 from "../image/becimg.jpg";

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src={city1} className="featuredImg" />
        <div className="featuredTitles">
          <h1>Banja Luka</h1>
        </div>
      </div>
      <div className="featuredItem">
        <img src={city2} className="featuredImg" />
        <div className="featuredTitles">
          <h1>Belgrade</h1>
        </div>
      </div>
      <div className="featuredItem">
        <img src={city3} className="featuredImg" />
        <div className="featuredTitles">
          <h1>Vienna</h1>
        </div>
      </div>
    </div>
  );
};

export default Featured;
