import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./components/Register";
import Home from "./pages/Home";
import Login from "./components/Login";
import Properties from "./pages/Properties";
import PrivateRoute from "./PrivateRoute";
import NavBarWrapper from "./components/NavBarWrapper";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import CreateProperty from "./components/CreateProperty";

function App() {
  const isLoggedIn = localStorage.getItem("userToken") ? true : false;
  const wrapPrivateRoute = (element, user, redirect) => {
    return (
      <PrivateRoute user={user} redirect={redirect}>
        {element}
      </PrivateRoute>
    );
  };
  return (
    <Router>
      <NavBarWrapper />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties" element={wrapPrivateRoute(<Properties />, isLoggedIn, 'properties')}  />
          <Route path="/properties/addProperty" element={wrapPrivateRoute(<CreateProperty />, isLoggedIn, 'addProperty')}  />
        </Routes>
    </Router>
  );
}

export default App;
