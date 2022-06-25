import React, { useState, useEffect } from "react";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import "./videoEditing.scss";
import ReactPlayer from "react-player";
import { getDocs, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";

const VideoEditing = () => {
  const [allOptionsForURLS, setAllOptionsForURLS] = useState([]);
  const [lengthofVideos, setLengthofVideos] = useState();
  const [triggerRerender, setTriggerRerender] = useState(false);
  useEffect(() => {
    const getAllDocsFromFireBase = async () => {
      const querySnapshot = await getDocs(collection(db, "JaspiURLS"));
      setLengthofVideos(querySnapshot.size);
      querySnapshot.forEach((doc) => {
        setAllOptionsForURLS((prev) => [
          ...prev,
          {
            id: doc.id,
            URL: doc._document.data.value.mapValue.fields.URL.stringValue,
            name: doc._document.data.value.mapValue.fields.name.stringValue,
          },
        ]);
      });
    };
    getAllDocsFromFireBase();
  }, []);

  return (
    <>
      <NavbarMain />
      <div className="videoContainer">
        <h1 className="TitleVideoEditting">VideoEditting</h1>
        <div className="flexVideos">
          {allOptionsForURLS.length === lengthofVideos &&
            allOptionsForURLS.map(({ URL, id, name }) => (
              <div className="flexvideoAndTitle" key={id}>
                <h4 className="videotitle">{name}</h4>
                <ReactPlayer
                  url={URL}
                  controls={true}
                  className="setWidthVideo"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default VideoEditing;
