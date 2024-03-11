import React from "react";
import "./users.css";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios-config";

const UserHotels = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [columns, setColumn] = useState();
  const [rows, setRows] = useState();

  const handleDeleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      window.location.reload();
    } catch (err) {}
  };

  useEffect(() => {
    setIsEmpty(
      !columns || !rows || (columns.length === 0 && rows.length === 0)
    );
  }, [columns, rows]);

  const deleteUser = [
    {
      field: "action",
      headerName: "",
      width: 100,
      align: "center",
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDeleteUser(params.row._id)}
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
      const response = await axiosInstance.get("/users/");
      setColumn(response.data.column);
      setRows(response.data.row);
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <div className="usertable">
        <div className="usertableTitle">Users list</div>
        <br />
        {columns && rows ? (
          <DataGrid
            className="usergrid"
            rows={rows}
            columns={columns.concat(deleteUser)}
          />
        ) : (
          <b style={{ fontSize: "24px" }}>
            You don't have access authorization!!!
          </b>
        )}
      </div>
      <br />
      <br />
      <br />
      <div className={isEmpty ? "usersBottom" : ""}>
        <div className="line"></div>
        <Footer />
      </div>
    </div>
  );
};

export default UserHotels;
