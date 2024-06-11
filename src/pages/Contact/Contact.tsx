import React from "react";
import Head from "../../components/Head";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import FQA from "./FQA";

function Contact() {
  const [formDetails, setFormDetails] = useState({ name: '', email: '', message: '', 'g-recaptcha-response': '' })
  const [sendStatus, setSendStatus] = useState(false)

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value })
  }

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDetails({ ...formDetails, [(e.target as HTMLTextAreaElement).name]: (e.target as HTMLTextAreaElement).value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSendStatus(true)
    e.preventDefault()
    await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID!, import.meta.env.VITE_EMAILJS_TEMPLATE_ID!, formDetails, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then(function (response) {
        if (response) {
          alert("Successfully sent the message.")
        }
      }, function (error) {
        if (error) {
          alert("Failed to send the message. Err: " + error)
        }
      });
    setFormDetails({ name: '', email: '', message: '', 'g-recaptcha-response': '' })
    setSendStatus(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <FQA/>
      <h1 className="text-sm md:text-sm md:text-center font-medium text-mynavy mx-auto max-w-screen-xl px-4 py-4">
        Still not answered, kindly contact us through the contact form below.
      </h1>
      <form onSubmit={onSubmit}>
        <div className="px-4 mt-5 mb-20 md:mb-40 sm:py-6 mx-auto max-w-screen-md lg:py-4 md:px-6 flex flex-col gap-4">
          <div className="my-5 flex-col flex gap-5">
            <Head h1="Contact" h2="Us" />
            <h1 className="text-md md:text-sm md:text-center font-medium text-mynavy mx-auto max-w-screen-xl px-4 ">
              Need to get in touch with us? Just fill out the form with your
              inquiry!
            </h1>
          </div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-sm md:text-md font-medium text-mynavy">
                What is your Name?
              </span>
            </div>
            <input
              type="text"
              name="name"
              onChange={onChangeInput}
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-sm md:text-md font-medium text-[#073b4c]">
                What is your Email?
              </span>
            </div>
            <input
              type="email"
              name="email"
              onChange={onChangeInput}
              placeholder="Email Address"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full1">
            <div className="label">
              <span className="label-text text-sm md:text-md font-medium text-[#073b4c]">
                Your Message
              </span>
            </div>
            <textarea
              name="message"
              onChange={onChangeTextArea}
              className="textarea textarea-bordered h-24 w-full text-sm"
              placeholder="Message"
            ></textarea>
          </label>
          <button
            type="submit"
            className="btn md:w-1/3 bg-mygreen hover:bg-myyellow text-white"
            disabled={sendStatus}
          >
            {sendStatus ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Contact;
