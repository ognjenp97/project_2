import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = (ClickId) => {
    navigate(`/hotels/${ClickId}`);
  };
  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        className="siImg"
        onClick={() => handleClick(item._id)}
      />
      <div className="siDesc">
        <h1 className="siTitle" onClick={() => handleClick(item._id)}>
          {item.name}
        </h1>
        <span className="siDistance">
          <span className="siCity">{item.city}</span> - {item.distance}m from
          center
        </span>
        <span className="siSubtitle">{item.title}</span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <button
            className="siCheckButton"
            onClick={() => handleClick(item._id)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
