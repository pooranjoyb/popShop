import Navbar from "../components/Navbar"

function Home() {
  return (
    <>
      <Navbar />
      <div
        className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center"
      >
        <div className="max-w-xl ">

          <div className="text-mynavy">
            <div className="text-8xl font-extrabold">
              Fashion
            </div>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Look your best on your best day.
            </p>

            <div className="mt-8 w-full flex flex-wrap gap-4 text-center">
              <button
                className="btn w-1/2 bg-myred hover:bg-myred text-white"
              >
                Get Started
              </button>
              <button
                className="btn w-1/3 bg-mygreen hover:bg-mygreen text-white"
              >
                Explore
              </button>
            </div>
          </div>
        </div>
        <img className="w-1/3" src="./images/hero.png" alt="" />
      </div>
    </>
  )
}

export default Home