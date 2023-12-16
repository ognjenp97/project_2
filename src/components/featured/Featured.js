import "./featured.css";
import useFetch from "../../hooks/useFetch";
import city1 from "../image/banjalukaimg.jpg";
import city2 from "../image/beogradimg.webp";
import city3 from "../image/becimg.jpg";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Banja Luka,Belgrade,Vienna"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src={city1} className="featuredImg" />
            <div className="featuredTitles">
              <h1>Banja Luka</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={city2} className="featuredImg" />
            <div className="featuredTitles">
              <h1>Belgrade</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={city3} className="featuredImg" />
            <div className="featuredTitles">
              <h1>Vienna</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
