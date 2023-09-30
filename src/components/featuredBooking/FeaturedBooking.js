import "./featuredBooking.css";
import hotelbg from "../image/falkensteiner-hotel-belgrade.jpg";

const FeaturedBooking = () => {
  return (
    <div className="fb">
      <div className="fbItem">
        <img src={hotelbg} className="fbImg" />
        <span className="fbName">Falkensteiner Hotel</span>
        <span className="fbCity">Belgrade</span>
        <span className="fbPrice">Starting from $120</span>
        <div className="fbRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fbItem">
        <img src={hotelbg} className="fbImg" />
        <span className="fbName">Falkensteiner Hotel</span>
        <span className="fbCity">Belgrade</span>
        <span className="fbPrice">Starting from $120</span>
        <div className="fbRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fbItem">
        <img src={hotelbg} className="fbImg" />
        <span className="fbName">Falkensteiner Hotel</span>
        <span className="fbCity">Belgrade</span>
        <span className="fbPrice">Starting from $120</span>
        <div className="fbRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fbItem">
        <img src={hotelbg} className="fbImg" />
        <span className="fbName">Falkensteiner Hotel</span>
        <span className="fbCity">Belgrade</span>
        <span className="fbPrice">Starting from $120</span>
        <div className="fbRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBooking;
