//components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "../components/Head";

function Error() {
  return (
    <>
      <Navbar />

      {/* Hero  */}
      <div className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center">
        <div className="max-w-xl ">
          <div className="text-mynavy">
            <Head h1="404 Not Found" h2="Error! :(" />
          </div>
        </div>
        <img className="w-1/3" src="./images/hero.png" alt="" />
      </div>

      {/* Footer  */}
      <Footer />
    </>
  );
}

export default Error;
