import "./add.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NewHotel = () => {
  const [files, setFiles] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [propertyType, setPropertyType] = useState(true);
  const { user } = useContext(AuthContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [credentials, setCredentials] = useState({
    name: undefined,
    type: undefined,
    city: undefined,
    address: undefined,
    distance: undefined,
    cheapestPrice: undefined,
    title: undefined,
    desc: undefined,
    photos: undefined,
    userId: user._id,
  });

  const [info, setInfo] = useState({
    title: undefined,
    price: undefined,
    maxPeople: undefined,
    desc: undefined,
    roomNumbers: undefined,
  });
  const navigate = useNavigate();

  const handleChangeHotel = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    setPropertyType(
      selectedValue === "hotel" || selectedValue === "motel" ? false : true
    );
  };

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
    const isHotelInfoValid =
      credentials.name &&
      credentials.type &&
      credentials.city &&
      credentials.address &&
      credentials.distance &&
      credentials.cheapestPrice &&
      credentials.title &&
      credentials.desc;

    const isRoomInfoValid =
      info.title &&
      info.price &&
      info.maxPeople &&
      info.desc &&
      info.roomNumbers;

    setIsFormValid(isHotelInfoValid && (propertyType || isRoomInfoValid));
  };

  useEffect(() => {
    checkFormValidity();
  }, [credentials, info, propertyType]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const uploadImagesToImgBB = async (images, apiKey) => {
    try {
      const imageUrls = [];

      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post(
          "https://api.imgbb.com/1/upload?key=" + apiKey,
          formData
        );

        const responseData = response.data.data;
        if (responseData && responseData.url) {
          imageUrls.push(responseData.url);
        } else {
          console.error("Invalid response format:", response.data);
          throw new Error("Invalid response format");
        }
      }

      return imageUrls;
    } catch (error) {
      console.error("Error uploading images to ImgBB:", error);
      throw error;
    }
  };

  const handleClick = async () => {
    document.documentElement.classList.add("uploading");
    setIsUploading(true);
    const apiKey = "26dd588bc6ba7a499a8cf0e5d680e196";
    try {
      const imageUrls = await uploadImagesToImgBB(files, apiKey);
      const hotelResponse = await axios.post("/hotels", {
        ...credentials,
        photos: imageUrls,
      });
      if (
        hotelResponse.data.type === "hotel" ||
        hotelResponse.data.type === "motel"
      ) {
        const hotelId = hotelResponse.data._id;
        await axios.post(`/rooms/${hotelId}`, info);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("uploading", isUploading);
    return () => {
      document.documentElement.classList.remove("uploading");
    };
  }, [isUploading]);

  return (
    <div>
      <Navbar />
      <div className="addTable">
        <label className="labelTitle">Add a new real estate</label>
        <br />
        <br />
        <table>
          <tr>
            <td>
              <label>Name:</label>
              <input
                type="text"
                id="name"
                onChange={handleChangeHotel}
                className="addName"
              />
            </td>
            <td>
              <label>Type:</label>
              <select
                id="type"
                value={selectedOption}
                onChange={(e) => {
                  handleSelectChange(e);
                  handleChangeHotel(e);
                }}
                className="addType"
              >
                <option value=""></option>
                <option value="hotel">hotel</option>
                <option value="villa">villa</option>
                <option value="apartment">apartment</option>
                <option value="cottage">cottage</option>
                <option value="house">house</option>
                <option value="motel">motel</option>
                <option value="business space">business space</option>
                <option value="garage">garage</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Title:</label>
              <input
                type="text"
                id="title"
                onChange={handleChangeHotel}
                className="addTitle"
              />
            </td>
            <td>
              <label>City:</label>
              <input
                type="text"
                id="city"
                onChange={handleChangeHotel}
                className="addCity"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Address:</label>
              <input
                type="text"
                id="address"
                onChange={handleChangeHotel}
                className="addAddress"
              />
            </td>
            <td>
              <label>Distance from center (meter):</label>
              <input
                type="text"
                id="distance"
                onChange={handleChangeHotel}
                className="addDistance"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Description:</label>
              <textarea
                rows="6"
                id="desc"
                onChange={handleChangeHotel}
                className="addDescription"
              />
            </td>
            <div className="aT">
              <td>
                <label>Price (€):</label>
                <input
                  type="number"
                  id="cheapestPrice"
                  onChange={handleChangeHotel}
                  className="addPrice"
                />
              </td>
            </div>
          </tr>
          <tr>
            <td>
              <br />
              <label className="lRooms">Rooms:</label>
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <label>Title room:</label>
              <input
                type="text"
                id="title"
                onChange={handleChange}
                disabled={propertyType}
                className="addTitleRoom"
              />
            </td>
            <td>
              <label>Price room:</label>
              <input
                type="number"
                id="price"
                onChange={handleChange}
                disabled={propertyType}
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
                disabled={propertyType}
                className="addMaxPeople"
              />
              <label>Room numbers:</label>
              <input
                type="text"
                placeholder={
                  propertyType ? "" : "Enter room numbers (e.g. 101 102 103)"
                }
                onChange={extractNumbers}
                disabled={propertyType}
                className="addRoomNumbers"
              />
            </td>
            <td>
              <label>Description:</label>
              <textarea
                rows="6"
                id="desc"
                onChange={handleChange}
                disabled={propertyType}
                className="addDescriptionRoom"
              />
            </td>
          </tr>
          <br />
          <tr>
            <td>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </td>
            <td>
              <button
                className="addButton"
                onClick={handleClick}
                disabled={!isFormValid}
              >
                {isUploading ? "Loading images..." : "Send"}
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
