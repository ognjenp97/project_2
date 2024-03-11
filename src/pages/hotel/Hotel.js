import "./hotel.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import axiosInstance from "../../config/axios-config";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const [openModal, setOpenModal] = useState(false);
  const [otherButton, setOtherButton] = useState(false);
  const { data, loading, error } = useFetch(`/hotels/${id}`);
  const { user } = useContext(AuthContext);
  const [showUnavailableDates, setShowUnavailableDates] = useState(false);
  const navigate = useNavigate();
  const [userID, setUserID] = useState([]);
  const [date, setDate] = useState([]);
  const [roomNumber, setRoomNumber] = useState([]);
  const [roomTitle, setRoomTitle] = useState([]);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  useEffect(() => {
    if (user && data && data.userId && data.userId.length > 0) {
      setOtherButton(user._id === data.userId);
    }
  }, [user, data]);

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? data.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === data.photos.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const handleShowUnavailableDates = async () => {
    fetchData();
    setShowUnavailableDates(true);
  };

  const fetchData = async () => {
    if (data && (data.type === "hotel" || data.type === "motel")) {
      if (data && data.rooms.length > 0) {
        setUserID([]);
        setDate([]);
        setRoomNumber([]);
        setRoomTitle([]);
        for (const room of data.rooms) {
          const response = await axiosInstance.get(`/rooms/${room}`);
          for (const unavailableRoom of response.data.roomNumbers) {
            if (unavailableRoom.unavailableDates.length > 0) {
              for (const unavailableDate of unavailableRoom.unavailableDates) {
                const getUser = await axiosInstance.get(
                  `/users/${unavailableDate.userId}`
                );
                const user = getUser.data.username;
                setUserID((prevUserID) => [...prevUserID, user]);
                setDate((prevDate) => [
                  ...prevDate,
                  new Date(unavailableDate.date),
                ]);
                setRoomNumber((prevNumber) => [
                  ...prevNumber,
                  unavailableRoom.number,
                ]);
                setRoomTitle((prevTitle) => [
                  ...prevTitle,
                  response.data.title,
                ]);
              }
            }
          }
        }
      }
    } else {
      if (data && data.unavailableDates.length > 0) {
        setUserID([]);
        setDate([]);
        for (const unavailableDate of data.unavailableDates) {
          const response = await axiosInstance.get(
            `/users/${unavailableDate.userId}`
          );
          const user = response.data.username;
          setUserID((prevUserID) => [...prevUserID, user]);
          setDate((prevDate) => [...prevDate, new Date(unavailableDate.date)]);
        }
      }
    }
  };

  return (
    <div>
      {open && (
        <div className="slider">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpen(false)}
          />
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className="arrow"
            onClick={() => handleMove("l")}
          />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} className="sliderImg" />
          </div>
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className="arrow"
            onClick={() => handleMove("r")}
          />
        </div>
      )}
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button
              className="bookNow"
              onClick={
                user && otherButton ? handleShowUnavailableDates : handleClick
              }
            >
              {user && otherButton
                ? "Overview Reservation"
                : "Reserve or Book Now"}
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                {data.address} {data.city}
              </span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over €{data.cheapestPrice} at this property
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="homeTitle">{data.title}</h1>
                <p>{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of {data.city}, this property has an
                  excellent location score of 9.2!
                </span>
                <h2>
                  <b>€{days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button
                  onClick={
                    user && otherButton
                      ? handleShowUnavailableDates
                      : handleClick
                  }
                >
                  {user && otherButton
                    ? "Overview Reservation"
                    : "Reserve or Book Now"}
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      {showUnavailableDates && (
        <div
          className="unavailableDatesForm"
          onClick={() => setShowUnavailableDates(false)}
        >
          <div className="unavailableDatesContent">
            <FontAwesomeIcon icon={faCircleXmark} className="rCloseee" />
            <div className="unavailableDates">
              <b style={{ color: "#148471", fontSize: 20 }}>
                Reservation overview
              </b>
              <br />
              <div>
                {data.type === "hotel" || data.type === "motel" ? (
                  data.rooms.length > 0 ? (
                    userID.length > 0 ? (
                      <div>
                        {userID.map((user, index) => (
                          <div key={index}>
                            {roomTitle[index] ===
                            roomTitle[index - 1] ? null : (
                              <>
                                <br />
                                <br />
                                <span style={{ color: "#148471" }}>
                                  Room: <b>{roomTitle[index]}</b>
                                </span>
                                <br />
                              </>
                            )}
                            {roomNumber[index] ===
                            roomNumber[index - 1] ? null : (
                              <>
                                <span style={{ color: "#148471" }}>
                                  Number room: <b>{roomNumber[index]}</b>
                                </span>
                                <br />
                              </>
                            )}
                            <b>{date[index].toLocaleDateString()}</b> - reserved
                            <b> {user}</b>
                          </div>
                        ))}
                      </div>
                    ) : (
                      "Your real estate has not been reserved yet."
                    )
                  ) : (
                    "Your real estate has not been reserved yet."
                  )
                ) : data.unavailableDates.length > 0 ? (
                  <div>
                    {userID.map((user, index) => (
                      <div key={index}>
                        <b>{date[index].toLocaleDateString()}</b> - reserved
                        <b> {user}</b>
                      </div>
                    ))}
                  </div>
                ) : (
                  "Your real estate has not been reserved yet."
                )}
                <button
                  className="rHotelButton"
                  onClick={() => setShowUnavailableDates(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
