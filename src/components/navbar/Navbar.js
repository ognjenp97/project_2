import { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [selectedElement, setselectedElement] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  function handleOpenMenu(event) {
    setOpen(true);
    setselectedElement(event.currentTarget);
  }

  function handleCloseMenu() {
    setOpen(false);
  }

  const addHotel = () => {
    handleCloseMenu();
    navigate("/add");
  };

  const listHotel = () => {
    handleCloseMenu();
    navigate("/list");
  };
  const { dispatch } = useContext(AuthContext);

  const logoutUser = () => {
    handleCloseMenu();
    try {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Real Estate Booking</span>
        </Link>
        {user ? (
          <div>
            <button onClick={handleOpenMenu} className="userBtn">
              {user.username}
            </button>
            <Menu
              id="basic-menu"
              anchorEl={selectedElement}
              open={open}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div className="menuItem">
                <MenuItem onClick={addHotel}>Add new real estate</MenuItem>
                <MenuItem onClick={listHotel}>Your real estate list</MenuItem>
                <MenuItem onClick={logoutUser}>Log out</MenuItem>
              </div>
            </Menu>
          </div>
        ) : (
          <div className="navItem">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
