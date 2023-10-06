import "./hotel.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const Hotel = () => {
  const photos = [
    {
      src: "https://image-tc.galaxy.tf/wijpeg-4s33alr5zccihirylc1pfy74e/falkensteiner-hotel-belgrade-exterior-4.jpg",
    },
    {
      src: "https://feelserbia.com/wp-content/uploads/2019/03/5-7.jpg",
    },
    {
      src: "https://feelserbia.com/wp-content/uploads/2019/03/4-7.jpg",
    },
    {
      src: "https://image-tc.galaxy.tf/wijpeg-4s33alr5zccihirylc1pfy74e/falkensteiner-hotel-belgrade-exterior-4.jpg",
    },
    {
      src: "https://feelserbia.com/wp-content/uploads/2019/03/5-7.jpg",
    },
    {
      src: "https://feelserbia.com/wp-content/uploads/2019/03/4-7.jpg",
    },
  ];
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now</button>
          <h1 className="hotelTitle">Falkensteiner Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Bulevar Mihaila Pupina 10K Novi Beograd</span>
          </div>
          <span className="hotelDistance">
            Excellent location - 5km from center
          </span>
          <div className="hotelImages">
            {photos.map((photo) => (
              <div className="hotelImgWrapper">
                <img src={photo.src} className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p>
                Falkensteiner Hotel Belgrade features free WiFi and an elegant
                restaurant in the city's vibrant district, near the business
                centre of Belgrade. Danube Promenade with numerous night clubs
                is within 800 metres, Belgrade Arena is 1.5 km away. The
                stylishly decorated rooms all have an LCD TV on the wall and a
                seating area. The bathroom features a contemporary design.
                Panoramic views of the historic part of Belgrade are provided
                from the Executive Lounge. The spa centre offers relaxation
                opportunities in its modern spa centre with a fitness area.
                Belgrade city centre is approximately 5 km away. It can be
                reached with frequent and direct bus lines departing from a
                nearby bus stop. Popular sights like the Kalemegdan Fortress,
                Knez Mihailova Street and the bohemian Skadarlija District, can
                be visited in the centre. Nikola Tesla International Airport is
                at a distance of 15 km. It is located on the hotel's side of the
                city, which allows for easier access to the airport. Front desk
                offers shuttle service at an extra charge and upon request.
                Parking in the hotel's garage is available at a surcharge.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a stay!</h1>
              <span>
                Located in the real heart od Belgrade, this property has an
                excellent location score of 9.2!
              </span>
              <h2>
                <b>€215</b>
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
