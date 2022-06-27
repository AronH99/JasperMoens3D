import React, { useState, useEffect } from "react";
import * as THREE from "three";
import "./ThreeDArtDetails.scss";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import benchVise from "../../objectTest/benchVise.obj";
import benchVisePNG from "../../objectTest/benchVise.png";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import { nanoid } from "nanoid";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeJs = () => {
  const { name } = useParams();
  const [arrayLength, setArrayLength] = useState();
  const [dataObjects, setDataObjects] = useState([]);
  const [dataTextures, setDataTextures] = useState([]);
  const [documentData, setDocumentData] = useState({});
  const [totalData, setTotalData] = useState([]);
  const objectListRef = ref(storage, "3D");
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (dataObjects.length > 0 && dataTextures.length > 0) {
      (async () => {
        let camera, scene, renderer;
        let mouseX = 0,
          mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        let object;

        function init() {
          camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            1,
            2000
          );
          camera.position.z = 100;

          // scene

          scene = new THREE.Scene();

          const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
          scene.add(ambientLight);

          const pointLight = new THREE.PointLight(0xffffff, 0.8);
          camera.add(pointLight);
          scene.add(camera);
          scene.background = new THREE.Color("#000000");

          // manager

          function loadModel() {
            object.traverse(function (child) {
              if (child.isMesh) child.material.map = texture;
            });
            scene.add(object);
          }

          const manager = new THREE.LoadingManager(loadModel);

          // texture

          const textureLoader = new THREE.TextureLoader(manager);

          const texture = textureLoader.load(
            `${dataTextures.map((x) => x.url)}`
          );

          // model

          function onProgress(xhr) {
            if (xhr.lengthComputable) {
              const percentComplete = (xhr.loaded / xhr.total) * 100;
              console.log(
                "model " + Math.round(percentComplete, 2) + "% downloaded"
              );
            }
          }

          function onError() {}

          const loader = new OBJLoader(manager);
          loader.load(
            `${dataObjects.map((x) => x.url)}`,
            function (obj) {
              object = obj;
            },
            onProgress,
            onError
          );

          renderer = new THREE.WebGLRenderer();
          renderer.setPixelRatio(window.devicePixelRatio);
          renderer.setSize(window.innerWidth, window.innerHeight);

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.target.set(0, 0.5, 0);
          controls.update();
          controls.enablePan = false;
          controls.enableDamping = true;

          document
            .getElementById("modelHolder")
            .appendChild(renderer.domElement);

          document.addEventListener("mousemove", onDocumentMouseMove);
          window.addEventListener("resize", onWindowResize);
        }

        function onWindowResize() {
          windowHalfX = window.innerWidth / 2;
          windowHalfY = window.innerHeight / 2;

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseMove(event) {
          mouseX = (event.clientX - windowHalfX) / 2;
          mouseY = (event.clientY - windowHalfY) / 2;
        }

        function animate() {
          requestAnimationFrame(animate);
          render();
        }

        function render() {
          camera.lookAt(scene.position);

          renderer.render(scene, camera);
        }
        init();
        animate();
      })();
    }
  }, [trigger]);

  useEffect(() => {
    listAll(objectListRef).then((response) => {
      setArrayLength(
        response.items.filter(
          (item) =>
            (item.name.includes(".obj") && item.name.includes(name)) ||
            (item.name.includes(".png") && item.name.includes(name)) ||
            (item.name.includes(".jpg") && item.name.includes(name)) ||
            (item.name.includes(".jpeg") && item.name.includes(name)) ||
            (item.name.includes(".svg") && item.name.includes(name))
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
      //setting textures
      response.items
        .filter(
          (item) =>
            (item.name.includes(".png") &&
              item.name.includes(name) &&
              !item.name.includes(`${name}2d`)) ||
            (item.name.includes(".jpeg") &&
              item.name.includes(name) &&
              !item.name.includes(`${name}2d`)) ||
            (item.name.includes(".jpg") &&
              item.name.includes(name) &&
              !item.name.includes(`${name}2d`))
        )
        .map((item) => {
          getDownloadURL(item).then((url) => {
            setDataTextures((prev) => [
              ...prev,
              { id: nanoid(4), name: item.name, url },
            ]);
          });
        });
    });
  }, [trigger]);

  useEffect(() => {
    if (dataObjects.length > 0 && dataTextures.length > 0) {
      setTrigger(true);
    }
  }, [dataObjects, dataTextures]);

  // comments ophalen
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
        <div className="flexCanvasAndText">
          <div id="modelHolder"></div>
          <p className="text3drender">{documentData?.comment}</p>
        </div>
      </div>
    </>
  );
};

export default ThreeJs;
