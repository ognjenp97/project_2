import "./addRooms.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const NewHotel = () => {
  const { id } = useParams();
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    title: undefined,
    price: undefined,
    maxPeople: undefined,
    desc: undefined,
    roomNumbers: undefined,
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function extractNumbers(e) {
    const inputString = e.target.value;
    const numberRegex = /[-+]?\d*\.?\d+/g;
    const numbersArray = inputString.match(numberRegex);
    const numbers = numbersArray.map(Number);
    const niz = numbers.map((number) => ({ number: number }));
    setInfo((prevInfo) => ({
      ...prevInfo,
      roomNumbers: niz,
    }));
  }

  const checkFormValidity = () => {
    const isRoomInfoValid =
      info.title &&
      info.price &&
      info.maxPeople &&
      info.desc &&
      info.roomNumbers;
    setIsFormValid(isRoomInfoValid);
  };

  useEffect(() => {
    checkFormValidity();
  }, [info]);

  const handleClick = async () => {
    try {
      await axios.post(`hotels/${id}/rooms`, info);
      navigate("/list");
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <div className="addRoomTable">
        <label className="labelRoomTitle">Add a new room</label>
        <br />
        <br />
        <br />
        <table>
          <tr>
            <td>
              <label>Title room:</label>
              <input
                type="text"
                id="title"
                onChange={handleChange}
                className="addTitleRoom"
              />
            </td>
            <td>
              <label>Price room (€):</label>
              <input
                type="number"
                id="price"
                onChange={handleChange}
                className="addPriceRoom"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Max people for room:</label>
              <input
                type="number"
                id="maxPeople"
                onChange={handleChange}
                className="addMaxPeople"
              />
              <label>Room numbers:</label>
              <input
                type="text"
                placeholder={"Enter room numbers (e.g. 101 102 103)"}
                onChange={extractNumbers}
                className="addRoomNumbers"
              />
            </td>
            <td>
              <label>Description:</label>
              <textarea
                rows="6"
                id="desc"
                onChange={handleChange}
                className="addRoomDescription"
              />
            </td>
          </tr>
          <br />
          <tr>
            <td>
              <button
                className="addRoomsButton"
                onClick={handleClick}
                disabled={!isFormValid}
              >
                Send
              </button>
            </td>
          </tr>
        </table>
        <br />
        <br />
        <br />
      </div>
      <div className="line"></div>
      <Footer />
    </div>
  );
};

export default NewHotel;
