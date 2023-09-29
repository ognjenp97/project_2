import "./propertyList.css";
import hotels from "../image/hotelsimg.webp";
import garage from "../image/garageimg.jpg";
import house from "../image/housesimg.jpg";
import apartments from "../image/apartmentsimg.webp";
import villas from "../image/villasimg.jpg";
import motels from "../image/motelsimg.jpg";
import officespace from "../image/officespaceimg.webp";
import cottages from "../image/cottagesimg.jpeg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 1920, min: 860 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 860, min: 0 },
    items: 3,
  },
};

const PropertyList = () => {
  return (
    <div className="pList">
      <Carousel responsive={responsive}>
        <div className="pListItem">
          <img src={hotels} className="pListImg" />
          <div className="pListTitles">
            <h1>Hotels</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={villas} className="pListImg" />
          <div className="pListTitles">
            <h1>Villas</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={apartments} className="pListImg" />
          <div className="pListTitles">
            <h1>Apartments</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={cottages} className="pListImg" />
          <div className="pListTitles">
            <h1>Cottages</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={house} className="pListImg" />
          <div className="pListTitles">
            <h1>Houses</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={motels} className="pListImg" />
          <div className="pListTitles">
            <h1>Motels</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={officespace} className="pListImg" />
          <div className="pListTitles">
            <h1>Business Spaces</h1>
          </div>
        </div>
        <div className="pListItem">
          <img src={garage} className="pListImg" />
          <div className="pListTitles">
            <h1>Garages</h1>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default PropertyList;
