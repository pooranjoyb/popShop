//components
import Head from "../components/Head";
import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img className="md:w-1/3 w-1/2" src="/logo.png" alt="" />
        <Head h1="404" h2="Not Found :(" />
        <span className="md:text-xl md:my-6 italic">Found some issues? Contribute to <Link target="_blank" className=" underline" to='https://github.com/pooranjoyb/popShop/'>Github</Link>.</span>
      </div>
    </>
  );
}

export default Error;
