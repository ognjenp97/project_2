import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Add from "./pages/add/Add";
import UserHotels from "./pages/userHotels/UserHotels";
import AddRooms from "./pages/addRooms/AddRooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<Add />} />
        <Route path="/list" element={<UserHotels />} />
        <Route path="/addRooms/:id" element={<AddRooms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
