import "./addRooms.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axios-config";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const NewHotel = () => {
  const { id } = useParams();
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(false);

  const [info, setInfo] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: "",
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

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get(`/rooms/${id}`);
        if (response && response.data) {
          setRoomId(true);
          setInfo({
            title: response.data.title,
            price: response.data.price,
            maxPeople: response.data.maxPeople,
            desc: response.data.desc,
            roomNumbers: response.data.roomNumbers
              .map((room) => room.number)
              .join(" "),
          });
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    fetchRooms();
  }, [id]);

  const handleClick = async () => {
    try {
      const { roomNumbers, ...infoWithoutRoomNumbers } = info;
      const numberRegex = /[-+]?\d*\.?\d+/g;
      const numbersArray = roomNumbers.match(numberRegex);
      const numbers = numbersArray.map(Number);
      const niz = numbers.map((number) => ({ number: number }));
      await axiosInstance.post(`hotels/${id}/rooms`, {
        ...infoWithoutRoomNumbers,
        roomNumbers: niz,
      });
      navigate("/list");
    } catch (error) {}
  };

  const handleEditClick = async () => {
    try {
      const { roomNumbers, ...infoWithoutRoomNumbers } = info;
      const roomNumbersString = Array.isArray(roomNumbers)
        ? roomNumbers.join(" ")
        : roomNumbers;
      const numberRegex = /[-+]?\d*\.?\d+/g;
      const numbersArray = roomNumbersString.match(numberRegex);
      const numbers = numbersArray.map(Number);
      const niz = numbers.map((number) => ({ number: number }));
      await axiosInstance.put(`rooms/${id}`, {
        ...infoWithoutRoomNumbers,
        roomNumbers: niz,
      });
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
          <tbody>
            <tr>
              <td>
                <label>Title room:</label>
                <input
                  type="text"
                  id="title"
                  value={info.title}
                  onChange={handleChange}
                  className="addTitleRoom"
                />
              </td>
              <td>
                <label>Price room (€):</label>
                <input
                  type="number"
                  id="price"
                  value={info.price}
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
                  value={info.maxPeople}
                  onChange={handleChange}
                  className="addMaxPeople"
                />
                <label>Room numbers:</label>
                <input
                  type="text"
                  id="roomNumbers"
                  placeholder={"Enter room numbers (e.g. 101 102 103)"}
                  value={info.roomNumbers}
                  onChange={handleChange}
                  className="addRoomNumbers"
                />
              </td>
              <td>
                <label>Description:</label>
                <textarea
                  rows="6"
                  id="desc"
                  value={info.desc}
                  onChange={handleChange}
                  className="addRoomDescription"
                />
              </td>
            </tr>
            <tr>
              <td>
                <br />
                <button
                  className="addRoomsButton"
                  onClick={roomId ? handleEditClick : handleClick}
                  disabled={!isFormValid}
                >
                  {roomId ? "Update" : "Send"}
                </button>
              </td>
            </tr>
          </tbody>
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
