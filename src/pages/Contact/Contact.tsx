import { useSelector } from "react-redux";
import { RootState } from "../../utils/features/store";
import { useNavigate } from "react-router-dom";
import Head from "../../components/Head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Contact() {
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/home");
    }

    return (
        <>
            <Navbar />
            {/* main */}
            <div className="px-4 mt-5 mb-20 md:mb-40 sm:py-6 mx-auto max-w-screen-md lg:py-4 md:px-6 flex flex-col gap-4">
                <div className="my-5 flex-col flex gap-5">
                    <Head h1="Contact" h2="Us" />
                    <h1 className="text-base md:text-lg font-medium text-mynavy mx-auto max-w-screen-xl px-4 ">
                        Need to get in touch with us? Either fill out the form
                        with your inquiry or find the department email you'd
                        like to contact below.
                    </h1>
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-base md:text-lg font-medium text-mynavy">
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
                        <span className="label-text text-base md:text-lg font-medium text-[#073b4c]">
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
                        <span className="label-text text-base md:text-lg font-medium text-[#073b4c]">
                            Your Message
                        </span>
                    </div>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full text-base"
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

            <Footer />
        </>
    );
}

export default Contact;
