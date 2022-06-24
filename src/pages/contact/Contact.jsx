import React, { useRef } from "react";
import "./contact.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import {
  FaArtstation,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Contact = () => {
  const form = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_avqfvwa",
        "template_xt585yc",
        form.current,
        "38UFzU71ZJWlLbCki"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Your email has been send");
        },
        (error) => {
          console.log(error.text);
          toast.error(
            "Something went wrong with sending your email, try again or try another medium"
          );
        }
      );
  };

  return (
    <>
      <NavbarMain />
      <ToastContainer />
      <div className="contactContainer">
        <h1 className="kopTitelContact">Contact</h1>
        <p className="shortExplanation">
          Do you want to know more or do you have a proposition? Don't hesitate
          to contact me down below and I'll get back to you as soon as possible!
        </p>
        <form ref={form} onSubmit={onSubmit} className="formContact">
          <label className="flexLabel">
            <p className="pLabel">Name Or Company</p>
            <input type="text" className="inputcontact" name="name" />
          </label>
          <label className="flexLabel">
            <p className="pLabel">Email</p>
            <input type="email" className="inputcontact" name="email" />
          </label>
          <label className="flexLabel">
            <p className="pLabel">Message</p>
            <textarea className="inputTextArea" name="message" />
          </label>
          <input type="submit" className="submitContact" value="Send" />
        </form>
        <div className="flexmedialogosContact">
          <FaArtstation
            className="medialogos"
            onClick={(e) => {
              window.open("https://www.artstation.com/jasper_moens", "_blank");
            }}
          />
          <FaInstagram
            className="medialogos"
            onClick={(e) => {
              window.open("https://www.instagram.com/jaspermoens/", "_blank");
            }}
          />
          <FaYoutube
            className="medialogos"
            onClick={(e) => {
              window.open(
                "https://www.youtube.com/channel/UCxmr6fCjOKCjenO3oNMQvbA/videos",
                "_blank"
              );
            }}
          />
          <FaLinkedin
            className="medialogos"
            onClick={(e) => {
              window.open("https://www.linkedin.com/in/jaspermoens/", "_blank");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
