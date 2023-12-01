import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
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
  const { data, loading, error } = useFetch("/hotels/countByType");
  return (
    <div className="pList">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <Carousel responsive={responsive}>
            <div className="pListItem">
              <img src={hotels} className="pListImg" />
              <div className="pListTitles">
                <h1>Hotels</h1>
                <h2>
                  {data[0]?.count} {data[0]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={villas} className="pListImg" />
              <div className="pListTitles">
                <h1>Villas</h1>
                <h2>
                  {data[1]?.count} {data[1]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={apartments} className="pListImg" />
              <div className="pListTitles">
                <h1>Apartments</h1>
                <h2>
                  {data[2]?.count} {data[2]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={cottages} className="pListImg" />
              <div className="pListTitles">
                <h1>Cottages</h1>
                <h2>
                  {data[3]?.count} {data[3]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={house} className="pListImg" />
              <div className="pListTitles">
                <h1>Houses</h1>
                <h2>
                  {data[4]?.count} {data[4]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={motels} className="pListImg" />
              <div className="pListTitles">
                <h1>Motels</h1>
                <h2>
                  {data[5]?.count} {data[5]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={officespace} className="pListImg" />
              <div className="pListTitles">
                <h1>Business Spaces</h1>
                <h2>
                  {data[6]?.count} {data[6]?.type}
                </h2>
              </div>
            </div>
            <div className="pListItem">
              <img src={garage} className="pListImg" />
              <div className="pListTitles">
                <h1>Garages</h1>
                <h2>
                  {data[7]?.count} {data[7]?.type}
                </h2>
              </div>
            </div>
          </Carousel>
        </>
      )}
    </div>
  );
};

export default PropertyList;
