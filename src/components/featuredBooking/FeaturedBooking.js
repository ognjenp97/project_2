import "./featuredBooking.css";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const FeaturedBooking = () => {
  const { data, loading } = useFetch("/hotels?featured=true");
  const random = Math.ceil(Math.random() * (data.length - 3));
  const slicedNumbers = data.slice(random - 1, random + 3);

  const navigate = useNavigate();
  const [options] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [setDestination] = useState();
  const enddate = new Date();
  enddate.setDate(enddate.getDate() + 1);

  const [dates] = useState([
    {
      startDate: new Date(),
      endDate: enddate,
      key: "selection",
    },
  ]);
  const { dispatch } = useContext(SearchContext);

  const handleClick = (ClickId, clickedDestination) => {
    setDestination(clickedDestination);
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: clickedDestination, dates, options },
    });
    navigate(`/hotels/${ClickId}`);
  };

  return (
    <div className="fb">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {slicedNumbers.map((item) => (
            <div className="fbItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fbImg"
                onClick={() => handleClick(item._id, item.destination)}
              />
              <span
                className="fbName"
                onClick={() => handleClick(item._id, item.destination)}
              >
                {item.name}
              </span>
              <span className="fbCity">{item.city}</span>
              <span className="fbPrice">
                Starting from €{item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fbRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedBooking;
