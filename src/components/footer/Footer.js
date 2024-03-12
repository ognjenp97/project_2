import "./footer.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const Footer = () => {
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
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination: clickedDestination, dates, options },
    });
    navigate("/hotels", {
      state: { destination: clickedDestination, dates, options },
    });
  };
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Countries
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Regions
          </li>
          <li className="fListItem" onClick={() => handleSearch("cities")}>
            Cities
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Airports
          </li>
          <li className="fListItem" onClick={() => handleSearch("hotel")}>
            Hotels
          </li>
          <li className="fListItem" onClick={() => handleSearch("cities")}>
            Places of interest
          </li>
        </ul>
        <ul className="fList">
          <li className="fListItem" onClick={() => handleSearch("hotel")}>
            Hotels
          </li>
          <li className="fListItem" onClick={() => handleSearch("villa")}>
            Villas
          </li>
          <li className="fListItem" onClick={() => handleSearch("apartment")}>
            Apartments
          </li>
          <li className="fListItem" onClick={() => handleSearch("cottage")}>
            Cottages
          </li>
          <li className="fListItem" onClick={() => handleSearch("house")}>
            Houses
          </li>
          <li className="fListItem" onClick={() => handleSearch("motel")}>
            Motels
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("business space")}
          >
            Business Spaces
          </li>
          <li className="fListItem" onClick={() => handleSearch("garage")}>
            Garages
          </li>
        </ul>
        <ul className="fList">
          <li className="fListItem" onClick={() => handleSearch("hotel")}>
            Unique places to stay
          </li>
          <li className="fListItem" onClick={() => handleSearch("cities")}>
            All destinations
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            All flight destinations
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Discover
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Reviews
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Seasonal and holiday deals
          </li>
        </ul>
        <ul className="fList">
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Car hire
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Flight finder
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("1a8r9z5w*5ew")}
          >
            Restaurant reservations
          </li>
        </ul>
        <ul className="fList">
          <li
            className="fListItem"
            onClick={() => handleSearch("rDvUbwF755LL")}
          >
            About the application
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("aRQ8jYC5OxXL")}
          >
            Customer Service help
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("zEhidZlvtJfv")}
          >
            Safety resource centre
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("5Lr7J6HJMoEX")}
          >
            Terms & Conditions
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("fIqtHe7JaV4i")}
          >
            Content guidelines and reporting
          </li>
          <li
            className="fListItem"
            onClick={() => handleSearch("UX693bPDQGRa")}
          >
            Corporate contact
          </li>
        </ul>
      </div>
      <div className="fText">Copyright © 2024 Ognjen Pljevaljčić</div>
    </div>
  );
};

export default Footer;
