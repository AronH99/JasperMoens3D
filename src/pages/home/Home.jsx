import React, { useEffect, useState } from "react";
import "./home.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import { CCarouselItem } from "@coreui/react";
import { CCarousel } from "@coreui/react";
import { CImage } from "@coreui/react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const imageListRef = ref(storage, "2D");
  const [images, setImages] = useState([]);

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      //setting Objects
      response.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setImages((prev) => [
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
      {images.length > 0 && (
        <CCarousel indicators={true} controls={true} transition="crossfade">
          {images.length > 0 &&
            images.slice(0, 3).map(({ id, url, name }) => (
              <CCarouselItem key={id}>
                <NavLink
                  to={`/2D/detail/${name
                    .slice(0, name.length - 4)
                    .slice(0, name.length - 4)
                    .replace(/[^a-zA-Z]+/g, "")}`}
                >
                  <CImage className="imageCarousel" src={url} alt={name} />
                </NavLink>
              </CCarouselItem>
            ))}
        </CCarousel>
      )}
    </>
  );
};

export default Home;
