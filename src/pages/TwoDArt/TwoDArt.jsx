import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { nanoid } from "nanoid";
import "./twodart.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { NavLink } from "react-router-dom";

const TwoDArt = () => {
  const [data, setData] = useState([]);
  const imageListRef = ref(storage, "2D");

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setData((prev) => [
            ...prev,
            { id: item.name.substring(0, 2) + nanoid(3), name: item.name, url },
          ]);
        });
      });
    });
  }, []);

  return (
    <>
      <NavbarMain />
      <div className="flex2d">
        {data.length > 0 &&
          data.map(({ id, url, name }) => (
            <div className="fleximages2D" key={id}>
              <NavLink
                to={`/2D/detail/${name
                  .slice(0, name.length - 4)
                  .replace(/[^a-zA-Z]+/g, "")}`}
              >
                <img className="img2d" src={url} alt={name} />
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default TwoDArt;
