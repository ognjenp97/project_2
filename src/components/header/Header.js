import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faTowerObservation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTowerObservation} />
            <span>Attractions</span>
          </div>
        </div>
        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
          Save at least 10% on stays worldwide, from relaxing retreats to
          off-grid adventures
        </p>
        <button className="headerBtn">Sign in / Register</button>
      </div>
    </div>
  );
};

export default Header;
