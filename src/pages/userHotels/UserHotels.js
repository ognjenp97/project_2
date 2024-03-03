import React from "react";
import "./userHotels.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState, useRef } from "react";
import { SearchContext } from "../../context/SearchContext";
import axiosInstance from "../../config/axios-config";

const UserHotels = () => {
  const [isViewRoomsClicked, setIsViewRoomsClicked] = useState(false);
  const [selectedHotelID, setSelectedHotelID] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const [displayedColumn, setDisplayedColumn] = useState();
  const [displayedRows, setDisplayedRows] = useState();
  const selectedHotelIDRef = useRef(selectedHotelID);

  const [columns, setColumn] = useState();
  const [rows, setRows] = useState();
  const [photo, setPhoto] = useState([]);

  const [dates, setDate] = useState([
    {
      today: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  dates[0].endDate.setDate(dates[0].today.getDate() + 1);
  const [options] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({
      type: "NEW_SEARCH",
      payload: { dates, options },
    });
  };

  useEffect(() => {
    setIsEmpty(
      !columns || !rows || (columns.length === 0 && rows.length === 0)
    );
  }, [columns, rows]);

  const handleDelete = async (id) => {
    try {
      const hotelResponse = await axiosInstance.get(`/hotels/${id}`);
      const hotel = hotelResponse.data;
      if (hotel.rooms.length > 0) {
        for (const roomId of hotel.rooms) {
          await axiosInstance.delete(`/hotels/id/rooms/${roomId}`);
        }
      }
      await axiosInstance.delete(`/hotels/${id}`);
      window.location.reload();
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  useEffect(() => {
    selectedHotelIDRef.current = selectedHotelID;
  }, [selectedHotelID]);

  const handleViewRoom = async (id) => {
    try {
      const response = await axiosInstance.get(`/hotels/${id}/roomData`);
      setDisplayedColumn(response.data.columns.concat(editDeleteRoom));
      setDisplayedRows(response.data.rows);

      setIsViewRoomsClicked(true);
      setSelectedHotelID(response.data.id);
    } catch (err) {}
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axiosInstance.delete(
        `/hotels/${selectedHotelIDRef.current}/rooms/${id}`
      );
      await handleViewRoom(selectedHotelIDRef.current);
    } catch (err) {}
  };

  const editDeleteRoom = [
    {
      field: "action",
      headerName: "",
      width: 180,
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/addRooms/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit rooms</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDeleteRoom(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "room",
      headerName: "Rooms",
      width: 110,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => {
        const item = params.row;
        if (["hotel", "motel"].includes(item.type)) {
          return (
            <div>
              <button
                className="viewRoomButton"
                onClick={() => handleViewRoom(params.row._id)}
              >
                View rooms
              </button>
            </div>
          );
        } else {
          return null;
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 280,
      headerAlign: "center",
      renderCell: (params) => {
        const item = params.row;
        return (
          <div className="cellAction">
            {["hotel", "motel"].includes(item.type) && (
              <Link
                to={`/addRooms/${params.row._id}`}
                style={{ textDecoration: "none" }}
              >
                <div className="addRoomButton" style={{ marginLeft: "auto" }}>
                  Add Room
                </div>
              </Link>
            )}
            <Link
              to={`/hotels/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="viewButton"
                onClick={handleSearch}
                style={{ marginLeft: "auto" }}
              >
                View
              </div>
            </Link>
            <Link
              to={`/edit/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton" style={{ marginLeft: "auto" }}>
                Edit
              </div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
              style={{ marginLeft: "auto" }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/hotels/hotelData");
      setColumn(response.data.column);
      setRows(response.data.row);
      setPhoto(response.data.photo);
    } catch (err) {}
  };

  const columnsID = [
    {
      field: "id",
      headerName: "",
      width: 30,
      align: "center",
    },
    {
      field: "photo",
      headerName: "",
      width: 80,
      renderCell: (params) => (
        <img className="cellImg" src={params.value} alt="Property" />
      ),
    },
  ];

  const rowsID = photo.map((item, index) => ({
    id: index + 1,
    photo: item.photo,
    ...rows[index],
  }));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <div className="datatable">
        <div className="datatableTitle">
          {isViewRoomsClicked ? (
            <>
              <Link
                to={`/list`}
                className="link"
                onClick={() => setIsViewRoomsClicked(false)}
              >
                Back
              </Link>
              Rooms
            </>
          ) : (
            "Your real estate list"
          )}
          {isViewRoomsClicked ? (
            <>
              <Link to={`/addRooms/${selectedHotelID}`} className="link">
                Add New Room
              </Link>
            </>
          ) : (
            <Link to={`/add`} className="link">
              Add New
            </Link>
          )}
        </div>
        <br />

        {columns && rows ? (
          <DataGrid
            className="datagrid"
            rows={isViewRoomsClicked ? displayedRows : rowsID}
            columns={
              isViewRoomsClicked
                ? displayedColumn
                : columnsID.concat(columns.concat(actionColumn))
            }
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <br />
      <br />
      <br />
      <div className={isEmpty ? "usersHotelsBottom" : ""}>
        <div className="line"></div>
        <Footer />
      </div>
    </div>
  );
};

export default UserHotels;
