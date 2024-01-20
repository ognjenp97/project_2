import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [inputValue, setInputValue] = useState("");
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 9999}`
  );

  const { data: otherData, loading: otherLoading } = useFetch(
    `/hotels?type=${destination}&min=${min || 0}&max=${max || 9999}`
  );

  const { data: Data, loading: Loading } = useFetch("/hotels");
  const uniqueCities = [];

  const handleClick = (clickedDestination) => {
    const newValue = inputValue === "" ? destination : inputValue;
    const finalDestination =
      clickedDestination === "" ? newValue : clickedDestination;
    setDestination(finalDestination);
    if (newValue === destination) {
      reFetch();
    }
    dispatch({
      type: "NEW_SEARCH",
      payload: { destination, dates, options },
    });
    navigate("/hotels", {
      state: { destination, dates, options },
    });
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={
                  destination === "1a8r9z5w*5ew" ||
                  destination === "rDvUbwF755LL" ||
                  destination === "aRQ8jYC5OxXL" ||
                  destination === "zEhidZlvtJfv" ||
                  destination === "5Lr7J6HJMoEX" ||
                  destination === "fIqtHe7JaV4i" ||
                  destination === "UX693bPDQGRa"
                    ? ""
                    : destination
                }
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOption">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.adult}
                    min={1}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.children}
                    min={0}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    placeholder={options.room}
                    min={1}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => handleClick("")}>Search</button>
          </div>
          <div className="listResult">
            {loading || otherLoading || Loading ? (
              "Loading please wait"
            ) : (
              <>
                {destination === "hotel" ||
                destination === "villa" ||
                destination === "apartment" ||
                destination === "cottage" ||
                destination === "house" ||
                destination === "motel" ||
                destination === "business space" ||
                destination === "garage" ? (
                  otherData.map((item) => (
                    <SearchItem item={item} key={item._id} />
                  ))
                ) : destination === "cities" ? (
                  <>
                    {Data.map((item) => {
                      if (!uniqueCities.includes(item.city)) {
                        uniqueCities.push(item.city);
                        return (
                          <div
                            className="city"
                            key={item._id}
                            onClick={() => handleClick(item.city)}
                          >
                            {item.city}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </>
                ) : destination === "1a8r9z5w*5ew" ? (
                  <span>The page is under construction.</span>
                ) : destination === "rDvUbwF755LL" ? (
                  <div>
                    <h1>About the application</h1>
                    <div>
                      This application was founded in 2024. The mission of this
                      app is to make it easier for everyone to explore the
                      world.
                    </div>
                    <br />
                    <div>
                      By investing in cutting-edge technologies and innovations,
                      we strive to make travel as seamless and enjoyable as
                      possible, this app successfully connects millions of
                      travelers with unforgettable experiences, a wide variety
                      of transportation options and amazing places to stay -
                      from private accommodations to hotels and more. As one of
                      travel platforms for well-known brands as well as
                      entrepreneurs of all sizes, the app enables properties
                      around the world to attract a global audience and grow
                      their business.
                    </div>
                    <br />
                    <div>
                      The application is available to everyone and offers an
                      extensive range of registered accommodation units,
                      including charming private residences, stylish apartments,
                      and unique stay options, including private accommodation,
                      apartments and other unique places to stay. No matter
                      where you want to go or what you want to do, this app
                      makes it easy and ensures a seamless experience by
                      offering dedicated and responsive customer support
                      available 24/7.
                    </div>
                  </div>
                ) : destination === "aRQ8jYC5OxXL" ? (
                  <div>
                    <h1>Welcome to the Help Centre</h1>
                    <h2>Send us a message</h2>
                    <div>
                      <span className="contact">E-mail:</span>{" "}
                      ognjenpljevaljcic@hotmail.rs
                    </div>
                    <div>
                      Contact our agents about your booking, and we'll reply as
                      soon as possible.
                    </div>
                    <h2>Call us</h2>
                    <div>
                      <span className="contact">+387 65 123 321</span>
                    </div>
                    <div>
                      For anything urgent, you can call us 24/7 on a local or
                      international phone number.
                    </div>
                  </div>
                ) : destination === "zEhidZlvtJfv" ? (
                  <div>
                    <h1>Trust and safety resource centre</h1>
                    <h2>Safety tips, guidelines and our values</h2>
                    <br />
                    <h2>Travellers</h2>
                    <div className="contact">Stay safely:</div>
                    <div>
                      Our application strives to help everyone experience the
                      world safely. We have many processes in place to protect
                      our guests, and to empower you to take control of your
                      safety while you travel. Visit our traveller resource page
                      to learn more about making your future stays go smoothly.
                    </div>
                    <br />
                    <h2>Partners</h2>
                    <div className="contact">Host safely:</div>
                    <div>
                      Bringing peace of mind to our Partners is a top priority.
                      We help hosts feel confident about welcoming guests, and
                      have processes in place to protect both you and your
                      property. You can learn more about how to stay safe while
                      hosting on our Partner resource page.
                    </div>
                    <br />
                    <h2>If something goes wrong</h2>
                    <div className="contact">
                      What you can do if things go wrong:
                    </div>
                    <div>
                      In the unlikely event that something goes wrong, we are
                      here for you. In this section, you can find guidelines to
                      follow should an issue arise, as well as the steps we will
                      take to look after you. <br />
                      <br />
                      <br />
                    </div>
                  </div>
                ) : destination === "5Lr7J6HJMoEX" ? (
                  <div>
                    <h1>Customer terms of service</h1>
                    <h2>Summary of these Terms</h2>
                    <div>
                      By agreeing to our Terms, you’re agreeing to everything of
                      our documents. If you don’t accept any of these Terms,
                      please do not use our Platform.
                      <br />
                      <br />
                    </div>
                    <div>
                      All this information is important because it (along with
                      your booking confirmation email, and any pre-contractual
                      information provided before you book), sets out the legal
                      terms on which Service Providers offer their Travel
                      Experiences through our Platform.
                      <br />
                      <br />
                    </div>
                    <div>
                      If something goes wrong with your travel experience, here
                      is explained what you can do about it. This includes
                      making a complaint to us, going to court, and (in some
                      cases) using an online dispute resolution service.
                      <br />
                      <br />
                    </div>
                    <div>
                      If you want to appeal a moderation decision, or report any
                      content on our Platform, our{" "}
                      <span
                        className="cs"
                        onClick={() => handleClick("fIqtHe7JaV4i")}
                      >
                        Content Standards and Guidelines
                      </span>{" "}
                      explain how to do so, and how we manage these requests.
                      <br />
                      <br />
                    </div>
                    <div>
                      This summary isn’t part of our Terms, or a legal document.
                      It’s just a simple explanation of our Terms. We encourage
                      you to read each document in full.
                    </div>
                  </div>
                ) : destination === "fIqtHe7JaV4i" ? (
                  <div>
                    <h1>Content standards and guidelines</h1>
                    <h3>
                      The application's priority is to foster safe and welcoming
                      travel experiences for all.
                    </h3>
                    <div>
                      We expect our employees, customers and partners to treat
                      each other with respect. That’s why we developed this set
                      of guidelines that applies to the reviews, images and
                      listings uploaded by our guests and partners. We want to
                      make sure that the content you engage with on our site is
                      safe and helpful. When you post a review, image or listing
                      on application, it needs to comply with these guidelines.
                      They form part of our broader set of policies, including
                      our terms and conditions and privacy notices. If your
                      content doesn’t comply, we’ll remove it or get in touch
                      with you to try and edit the comment to meet our
                      guidelines
                    </div>
                  </div>
                ) : destination === "UX693bPDQGRa" ? (
                  <div>
                    <h1>Contact</h1>
                    <span>
                      <span className="contact">E-mail:</span>
                      {"  "}
                      ognjenpljevaljcic@hotmail.rs
                    </span>
                    <div>
                      <span className="contact">Call center:</span>
                      {"  "}
                      +387 65 123 321
                    </div>
                  </div>
                ) : (
                  data.map((item) => <SearchItem item={item} key={item._id} />)
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
