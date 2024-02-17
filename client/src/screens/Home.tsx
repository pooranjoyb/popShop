import Navbar from "../components/Navbar"
import Product from "../components/Product"

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero  */}

      <div className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center"
      >
        <div className="max-w-xl ">

          <div className="text-mynavy">
            <div className="text-6xl font-extrabold">
              Make Your Look more <span style={{
                textShadow: "-1px -1px 0 #000, 5px -1px 0 #073B4C, -1px 1px 0 #073B4C, 10px 1px 0 #073B4C",
                color: '#fff'
              }}> Perfect </span>
            </div>

            <p className="mt-4 max-w-lg">
              Look your best on your best day :)
            </p>

            <div className="mt-8 w-full flex flex-wrap gap-4 text-center">
              <button className="btn w-1/2 bg-myred hover:bg-myyellow text-white">
                Get Started
              </button>
              <button className="btn w-1/3 bg-mygreen hover:bg-myyellow text-white">
                Explore
              </button>
            </div>
          </div>
        </div>
        <img className="w-1/3" src="./images/hero.png" alt="" />
      </div>

      {/* Section  */}

      <div className="mx-auto max-w-screen-xl my-20 flex justify-between items-center pb-12">
        <div className="container">
          <div className="-mx-4 flex  flex-row-reverse flex-wrap">
            <div className="w-full flex-col px-4 lg:w-5/12 justify-between">
              <div className="flex-col pb-8 text-mynavy">
                <h1 className="text-mynavy mb-5 text-6xl font-extrabold text-dark ">
                  Eat, Sleep, Fashion, <span style={{
                    textShadow: "-1px -1px 0 #000, 5px -1px 0 #073B4C, -1px 1px 0 #073B4C, 10px 1px 0 #073B4C",
                    color: '#fff'
                  }}> Repeat </span>
                </h1>
                <h1 className="text-mynavy mb-4 text-2xl font-extrabold text-dark mt-6">
                  Grab the limited time offer!
                </h1>

                <p className="mb">
                  Get our premium and exclusive collections at <b> &#x20B9;2500/-</b> only
                </p>

              </div>
              <div>
                <img className="w-full mt-8" src="./images/fashion.jpg" alt="" />
              </div>

            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="">
                <div className="relative z-10 inline-block px-4 pt-11 lg:pt-0">
                  <img
                    src="./images/dress.png"
                    alt="hero"
                    className="w-full"
                  />
                  <span className="absolute -bottom-8 -right-10 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#EF476F" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#EF476F" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#EF476F" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#EF476F" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#EF476F" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#EF476F" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#EF476F" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#EF476F" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#EF476F" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#EF476F" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#EF476F" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#EF476F" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#EF476F" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#EF476F" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#EF476F" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#EF476F" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#EF476F" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#EF476F" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#EF476F" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#EF476F" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#EF476F" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#EF476F" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#EF476F" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#EF476F" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#EF476F" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products  */}
      <div className=" mx-auto max-w-screen-xl px-4 py-16 flex flex-col justify-between items-center">
        <div className="text-mynavy">
          <div className="text-6xl font-extrabold">
            Our <span style={{
              textShadow: "-1px -1px 0 #000, 5px -1px 0 #073B4C, -1px 1px 0 #073B4C, 10px 1px 0 #073B4C",
              color: '#fff'
            }}> Products </span>
          </div>
        </div>
        <div className="mt-12">
          <Product />
          <Product />
          <div className="flex items-center justify-center">
            <button className="btn bg-mygreen hover:bg-myred">
              View More
            </button>
          </div>
        </div>

      </div>

    </>
  )
}

export default Home