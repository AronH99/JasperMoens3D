import React, { useRef } from "react";
import "./contact.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import emailjs from "@emailjs/browser";

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
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <NavbarMain />
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
      </div>
    </>
  );
};

export default Contact;
