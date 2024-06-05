import Head from "../../components/Head";
import { useEffect } from "react";

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="px-4 mt-5 mb-20 md:mb-40 sm:py-6 mx-auto max-w-screen-md lg:py-4 md:px-6 flex flex-col gap-4">
        <div className="my-5 flex-col flex gap-5">
          <Head h1="Contact" h2="Us" />
          <h1 className="text-sm md:text-sm md:text-center font-medium text-mynavy mx-auto max-w-screen-xl px-4 ">
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
            className="textarea textarea-bordered h-24 w-full text-sm"
            placeholder="Message"
          ></textarea>
        </label>
        <button
          type="submit"
          className="btn md:w-1/3 bg-mygreen hover:bg-myyellow text-white"
        >
          Send Message
        </button>
      </div>
    </>
  );
}

export default Contact;
