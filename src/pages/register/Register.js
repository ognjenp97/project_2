import "./register.css";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    confirmPassword: undefined,
    email: undefined,
  });

  const { password, confirmPassword } = credentials;

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const arePasswordsMatching = () => {
    return (
      credentials.password === credentials.confirmPassword &&
      credentials.username &&
      credentials.password &&
      credentials.email
    );
  };
  const passwordsMatching = () => {
    return credentials.password === credentials.confirmPassword;
  };

  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", credentials);
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="reg">
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">Real Estate Booking</span>
          </Link>
        </div>
      </div>
      <div className="register">
        <div className="regContainer">
          <span className="regTitle">Create your account</span>
          <b>
            Have an account?{" "}
            <span className="regName" onClick={() => navigate("/login")}>
              Log in now
            </span>
          </b>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="regInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="regInput"
          />
          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            onChange={handleChange}
            className={`regInput ${
              passwordsMatching() ? "password-match" : "password-not-match"
            }`}
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="regInput"
          />
          <button
            disabled={loading || !arePasswordsMatching()}
            onClick={handleRegister}
            className="regButton"
          >
            Sign up
          </button>
          {error && (
            <span style={{ color: "red" }}>
              <b>{error.message}</b>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
