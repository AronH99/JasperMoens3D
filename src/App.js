import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/dashboard">
              <Route index element={<List />} />
              <Route path="/dashboard/images">
                <Route index element={<List />} />
                <Route path="/dashboard/images/newimage" element={<New />} />
              </Route>
              <Route path="/dashboard/objects">
                <Route index element={<List />} />
                <Route path="/dashboard/objects/newimage" element={<New />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
