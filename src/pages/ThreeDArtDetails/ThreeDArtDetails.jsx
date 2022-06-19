import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import "./ThreeDArtDetails.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { Tick, MTLModel } from "react-3d-viewer";
import benchViseMTL from "../../objectTest/benchVise.mtl";
import { useParams } from "react-router";
import { Audio } from "react-loader-spinner";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const ThreeDArt = () => {
  const objectListRef = ref(storage, "3D");
  const [dataObjects, setDataObjects] = useState([]);
  const [dataMtls, setDataMtls] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [arrayLength, setArrayLength] = useState();
  const [counter, setCounter] = useState(0);
  const { name } = useParams();
  const [documentData, setDocumentData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter + 0.5);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    listAll(objectListRef).then((response) => {
      setArrayLength(
        response.items.filter(
          (item) =>
            (item.name.includes(".obj") && item.name.includes(name)) ||
            (item.name.includes(".mtl") && item.name.includes(name))
        ).length
      );
      //setting Objects
      response.items
        .filter(
          (item) => item.name.includes(".obj") && item.name.includes(name)
        )
        .map((item) => {
          getDownloadURL(item).then((url) => {
            setDataObjects((prev) => [
              ...prev,
              { id: nanoid(4), name: item.name, url },
            ]);
          });
        });
      //setting Mtls
      response.items
        .filter(
          (item) => item.name.includes(".mtl") && item.name.includes(name)
        )
        .map((item) => {
          getDownloadURL(item).then((url) => {
            setDataMtls((prev) => [
              ...prev,
              { id: nanoid(4), name: item.name, url },
            ]);
          });
        });
    });
  }, []);

  useEffect(() => {
    if (dataObjects.length + dataMtls.length === arrayLength) {
      dataObjects?.map((obj) =>
        dataMtls?.map((mtl) =>
          obj.name.slice(0, obj.name.length - 4) ===
          mtl.name.slice(0, mtl.name.length - 4)
            ? setTotalData((prev) => [...prev, { mtl, obj }])
            : null
        )
      );
    }
  }, [dataMtls, dataObjects]);

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
      <h2 className="mainName3D">{documentData?.name}</h2>
      <div className="bodyArtwork2">
        {totalData &&
          totalData?.map(({ mtl, obj }) => (
            <div key={obj.id} className="flexCanvasAndText">
              <MTLModel
                width="750"
                height="750"
                src={obj.url}
                mtl={mtl.url}
                texPath=""
                position={{ x: 0, y: 0, z: 0 }}
                rotation={{ x: 0, y: counter, z: 0 }}
              />
              <p className="text3drender">{documentData?.comment}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default ThreeDArt;
