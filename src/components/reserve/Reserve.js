import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const [hotelUnavailableDates, setHotelUnavailableDates] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`/hotels/find/${hotelId}`);
        setHotelUnavailableDates(response.data.unavailableDates || []);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const addUnavailableDates = async () => {
    try {
      await axios.put(`/hotels/availability/${hotelId}`, {
        dates: alldates,
      });
      setOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error adding dates:", error);
    }
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        {alldates.length === 1 ? (
          <div style={{ textAlign: "center" }}>
            <h1>Error</h1>
            <div>Please enter a date to proceed with the reservation</div>
            <button onClick={() => setOpen(false)} className="rButton">
              OK
            </button>
          </div>
        ) : data && data.length > 0 ? (
          <>
            <span>Select your rooms:</span>
            {data.map((item) => (
              <div className="rItem" key={item._id}>
                <div className="rItemInfo">
                  <div className="rTitle">{item.title}</div>
                  <div className="rDesc">{item.desc}</div>
                  <div className="rMax">
                    Max people: <b>{item.maxPeople}</b>
                  </div>
                  <div className="rPrice">{item.price}€</div>
                </div>
                <div className="rSelectRooms">
                  {item.roomNumbers.map((roomNumber) => (
                    <div className="room">
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleClick} className="rButton">
              Reserve Now!
            </button>
          </>
        ) : (
          <>
            <div>
              <span>Selected dates:</span>
              {alldates.map((date) => (
                <div key={date}>
                  {hotelUnavailableDates.some(
                    (unavailableDate) =>
                      new Date(date).toLocaleDateString() ===
                      new Date(unavailableDate).toLocaleDateString()
                  ) ? (
                    <span>
                      {new Date(date).toLocaleDateString()} (Unavailable)
                    </span>
                  ) : (
                    <span>{new Date(date).toLocaleDateString()}</span>
                  )}
                </div>
              ))}
              {hotelUnavailableDates.some((unavailableDate) =>
                alldates.some(
                  (date) =>
                    new Date(date).toLocaleDateString() ===
                    new Date(unavailableDate).toLocaleDateString()
                )
              ) ? (
                <div style={{ color: "#148471" }}>
                  Reservation is not possible,
                  <br />
                  as some of the selected dates are unavailable.
                  <br />
                  Please choose available dates.
                  <button onClick={() => setOpen(false)} className="rButton">
                    OK
                  </button>
                </div>
              ) : (
                <div>
                  <span>are available. You can make a reservation.</span>
                  <button className="rButton" onClick={addUnavailableDates}>
                    Reserve Now!
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reserve;
