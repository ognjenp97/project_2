import React from "react";
import "./userHotels.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";

const UserHotels = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/hotels?userId=${user._id}`);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/hotels/${id}`);
      window.location.reload();
    } catch (err) {}
  };

  const actionColumn = [
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
              <div className="addRoomButton" style={{ marginLeft: "auto" }}>
                Add Room
              </div>
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
            <div className="editButton" style={{ marginLeft: "auto" }}>
              Edit
            </div>
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

  const rows = data.map((item, index) => ({
    id: index + 1,
    photo: item.photos[0],
    name: item.name,
    type: item.type,
    city: item.city,
    title: item.title,
    room: item.rooms,
    _id: item._id,
  }));

  const CustomCell = ({ value, type }) => {
    if (["hotel", "motel"].includes(type)) {
      return (
        <div>
          <button className="viewRoomButton">View rooms</button>
        </div>
      );
    } else {
      return null;
    }
  };

  const columns = [
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
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    {
      field: "city",
      headerName: "City",
      width: 200,
    },
    {
      field: "type",
      headerName: "Type",
      width: 140,
    },
    {
      field: "room",
      headerName: "Rooms",
      width: 110,
      align: "right",
      headerAlign: "right",
      renderCell: (params) => (
        <CustomCell value={params.value} type={params.row.type} />
      ),
    },
  ];

  return (
    <div>
      <Navbar />
      <br />
      <div className="datatable">
        <div className="datatableTitle">
          Your real estate list
          <Link to={`/add`} className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={rows}
          columns={columns.concat(actionColumn)}
        />
      </div>
      <br />
      <br />
      <br />
      <div className="line"></div>
      <Footer />
    </div>
  );
};

export default UserHotels;
