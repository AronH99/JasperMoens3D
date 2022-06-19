import Login from "./pages/login/Login";
import List2D from "./pages/list2D/List2D";
import List3D from "./pages/list3D/List3D";
import New2D from "./pages/new2D/New2D";
import New3D from "./pages/new3D/New3D";
import { userInputs } from "./formSource";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import "./App.scss";
import Home from "./pages/home/Home";
import ThreeDArt from "./pages/ThreeDArt/ThreeDArt";
import TwoDArt from "./pages/TwoDArt/TwoDArt";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import VideoEditing from "./pages/videoEditing/VideoEditing";
import Detail3D from "./pages/Detail3D/Detail3D";
import Detail2D from "./pages/Detail2D/Detail2D";
import Description from "./pages/Description/Description";

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
            <Route path="2D" element={<TwoDArt />} />
            <Route path="3D" element={<ThreeDArt />} />
            <Route path="videoEditing" element={<VideoEditing />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/3D/detail/:name" element={<Detail3D />} />
            <Route path="/2D/detail/:name" element={<Detail2D />} />
            <Route path="login" element={<Login />} />
            <Route path="admin">
              <Route
                index
                element={
                  <RequireAuth>
                    <List2D />
                  </RequireAuth>
                }
              />
              <Route
                path="2D"
                element={
                  <RequireAuth>
                    <List2D />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/2D/new2D"
                element={
                  <RequireAuth>
                    <New2D inputs={userInputs} />
                  </RequireAuth>
                }
              />
              <Route
                path="3D"
                element={
                  <RequireAuth>
                    <List3D />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/3D/new3D"
                element={
                  <RequireAuth>
                    <New3D inputs={userInputs} title={"Add 3D Art"} />
                  </RequireAuth>
                }
              />
              <Route
                path="description"
                element={
                  <RequireAuth>
                    <Description />
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
