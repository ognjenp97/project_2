import "./featuredBooking.css";
import useFetch from "../../hooks/useFetch";

const FeaturedBooking = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true");
  const random = Math.ceil(Math.random() * (data.length - 3));
  const slicedNumbers = data.slice(random - 1, random + 3);

  return (
    <div className="fb">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {slicedNumbers.map((item) => (
            <div className="fbItem" key={item._id}>
              <img src={item.photos[0]} alt="" className="fbImg" />
              <span className="fbName">{item.name}</span>
              <span className="fbCity">{item.city}</span>
              <span className="fbPrice">
                Starting from ${item.cheapestPrice}
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
