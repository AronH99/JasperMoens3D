import Login from "./pages/login/Login";
import ListImages from "./pages/listImages/ListImages";
import ListObjects from "./pages/listObjects/ListObjects";
import NewImage from "./pages/newImage/NewImage";
import NewObject from "./pages/newObject/NewObject";
import { userInputs } from "./formSource";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import "./App.scss";
import Home from "./pages/home/Home";
import Artwork from "./pages/artwork/Artwork";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="artwork" element={<Artwork />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="admin">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListImages />
                  </RequireAuth>
                }
              />
              <Route
                path="images"
                element={
                  <RequireAuth>
                    <ListImages />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/images/newimage"
                element={
                  <RequireAuth>
                    <NewImage inputs={userInputs} title={"Add New Image"} />
                  </RequireAuth>
                }
              />
              <Route
                path="objects"
                element={
                  <RequireAuth>
                    <ListObjects />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/objects/newobject"
                element={
                  <RequireAuth>
                    <NewObject inputs={userInputs} title={"Add New Image"} />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
