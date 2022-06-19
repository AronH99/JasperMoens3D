import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatch2 = useContext(AuthContext);

  const navitage = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    signOut(auth)
      .then(() => {
        console.log("Uitgelogd");
        dispatch2.dispatch({ type: "LOGOUT", payload: "" });
        navitage("/login");
      })
      .catch((error) => {
        console.log("Er liep iets mis bij het uitloggen");
      });
  };

  return (
    <div className="navbar2">
      <div className="wrapper">
        <div className="items">
          <button className="logout" onClick={handleLogout}>
            Sign Out
          </button>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
