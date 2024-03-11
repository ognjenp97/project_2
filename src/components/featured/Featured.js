import "./featured.css";
import useFetch from "../../hooks/useFetch";
import city1 from "../image/banjalukaimg.jpg";
import city2 from "../image/beogradimg.webp";
import city3 from "../image/becimg.jpg";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const { data, loading } = useFetch(
    "/hotels/countByCity?cities=Banja Luka,Belgrade,Vienna"
  );

  const [setDestination] = useState("");

  const [dates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [options] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = (clickedDestination) => {
    setDestination(clickedDestination);
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: clickedDestination, dates, options },
    });
    navigate("/hotels", {
      state: { destination: clickedDestination, dates, options },
    });
  };
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div
            className="featuredItem"
            destination="Banja Luka"
            onClick={() => handleSearch("Banja Luka")}
          >
            <img src={city1} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Banja Luka</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div
            className="featuredItem"
            destination="Belgrade"
            onClick={() => handleSearch("Belgrade")}
          >
            <img src={city2} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Belgrade</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div
            className="featuredItem"
            destination="Vienna"
            onClick={() => handleSearch("Vienna")}
          >
            <img src={city3} alt="" className="featuredImg" />
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
