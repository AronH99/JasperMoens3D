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
            <Route path="login" element={<Login />} />
            <Route path="/admin">
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
                    <NewObject inputs={userInputs} title={"Add New Image"} />
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
                path="/admin/images/newobject"
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
