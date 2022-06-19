import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { nanoid } from "nanoid";
import "./TwoDArtDetails.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { useParams } from "react-router";

const TwoDArtDetails = () => {
  const [data, setData] = useState([]);
  const imageListRef = ref(storage, "2D");
  const { name } = useParams();

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items
        .filter((item) => item.name.includes(name))
        .map((item) => {
          getDownloadURL(item).then((url) => {
            setData((prev) => [
              ...prev,
              {
                id: item.name.substring(0, 2) + nanoid(3),
                name: item.name,
                url,
              },
            ]);
          });
        });
    });
  }, []);
  return (
    <>
      <NavbarMain />
      <h2 className="mainName">{name}</h2>
      <div className="flex2d">
        {data.length > 0 &&
          data.map(({ id, url }) => (
            <>
              <div className="fleximages2D" key={id}>
                <img className="img2d" src={url} alt={name} />
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default TwoDArtDetails;
