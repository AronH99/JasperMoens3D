import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import "./ThreeDArt.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { Tick, MTLModel } from "react-3d-viewer";
import benchViseMTL from "../../objectTest/benchVise.mtl";
import { NavLink } from "react-router-dom";

const ThreeDArt = () => {
  const objectListRef = ref(storage, "3D");
  const [data3D, setData3D] = useState([]);

  useEffect(() => {
    listAll(objectListRef).then((response) => {
      //setting 3D IMAGES
      response.items
        .filter(
          (item) =>
            item.name.includes(".png") ||
            item.name.includes(".jpg") ||
            item.name.includes(".svg") ||
            item.name.includes(".jpeg")
        )
        .map((item) => {
          getDownloadURL(item).then((url) => {
            setData3D((prev) => [
              ...prev,
              { id: nanoid(4), name: item.name, url },
            ]);
          });
        });
    });
  }, []);

  return (
    <>
      <NavbarMain />
      <div className="flex3d">
        {data3D.length > 0 &&
          data3D?.map(({ url, id, name }) => (
            <div className="fleximages3D" key={id}>
              <NavLink
                to={`/3D/detail/${name
                  .slice(0, name.length - 4)
                  .replace(/[^a-zA-Z]+/g, "")}`}
              >
                <img className="img3d" src={url} alt="avatar" />
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default ThreeDArt;
