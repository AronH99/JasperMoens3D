import React, { useState, useEffect } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { nanoid } from "nanoid";
import "./TwoDArtDetails.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { useParams } from "react-router";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { CCarouselItem } from "@coreui/react";
import { CCarousel } from "@coreui/react";
import { CImage } from "@coreui/react";

const TwoDArtDetails = () => {
  const [data, setData] = useState([]);
  const imageListRef = ref(storage, "2D");
  const { name } = useParams();
  const [documentData, setDocumentData] = useState({});

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

  useEffect(() => {
    if (name) {
      const getDocsFromFireBase = async () => {
        const docRef = doc(db, "JaspiTexts", name);
        const docSnap = await getDoc(docRef);
        docSnap.exists()
          ? setDocumentData(docSnap.data())
          : console.log("No such document!");
      };
      getDocsFromFireBase();
    }
  }, []);

  return (
    <>
      <NavbarMain />
      <h2 className="mainNamedetails">{documentData?.name}</h2>
      <div className="flex2ddetails">
        {data.length > 1 && (
          <CCarousel
            indicators={true}
            controls={true}
            transition="crossfade"
            className="carouselDetail"
          >
            {data.length > 1 &&
              data.map(({ id, url }) => (
                <CCarouselItem key={id}>
                  <CImage className="carousel2ddetails" src={url} alt={name} />
                </CCarouselItem>
              ))}
          </CCarousel>
        )}
        {data.length === 1 &&
          data.map(({ id, url }) => (
            <div key={id} className="fleximages2DDetails">
              <img className="img2ddetails" src={url} alt={name} />
            </div>
          ))}
        <p className="commentaarData">{documentData?.comment}</p>
      </div>
    </>
  );
};

export default TwoDArtDetails;
