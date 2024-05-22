import { useEffect, useState } from "react";

// components
import Head from "../../components/Head";
import Product from "../../components/Product";
import { IoFilterCircleOutline } from "react-icons/io5";

const data = [
  {
    desc: "",
    image:
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    price: 20,
    name: "Diamond Blue Suit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b",
    price: 99,
    name: "Nomad Outfit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/full-shot-woman-posing-with-green-outfit_23-2150728960.jpg?w=360&t=st=1708162804~exp=1708163404~hmac=b8eed76bcc3e16b01902ab4b5993eacc511b701a7c8a21690277d73429c02907",
    price: 56,
    name: "Leaf Green Outfit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f",
    price: 99,
    name: "Red Casual Wear",
  },
  {
    desc: "",
    image:
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    price: 20,
    name: "Diamond Blue Suit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b",
    price: 99,
    name: "Nomad Outfit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/full-shot-woman-posing-with-green-outfit_23-2150728960.jpg?w=360&t=st=1708162804~exp=1708163404~hmac=b8eed76bcc3e16b01902ab4b5993eacc511b701a7c8a21690277d73429c02907",
    price: 56,
    name: "Leaf Green Outfit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f",
    price: 99,
    name: "Red Casual Wear",
  },
  {
    desc: "",
    image:
      "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    price: 20,
    name: "Diamond Blue Suit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b",
    price: 99,
    name: "Nomad Outfit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/full-shot-woman-posing-with-green-outfit_23-2150728960.jpg?w=360&t=st=1708162804~exp=1708163404~hmac=b8eed76bcc3e16b01902ab4b5993eacc511b701a7c8a21690277d73429c02907",
    price: 56,
    name: "Leaf Green Outfit",
  },
  {
    desc: "",
    image:
      "https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f",
    price: 99,
    name: "Red Casual Wear",
  },
];

function Shop() {

  const [products, setproducts] = useState(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlesearch = (e: any) => {
    const value = e.target.value;
    console.log(value, "hello");
    const filtereddata = data.filter((elem) => {
      if (elem.name.toLowerCase().includes(value.toLowerCase())) return true;
      else return;
    });
    setproducts(filtereddata);
  };

  const filter = [
    {
      filterOption: "Size",
      checkbox: ["XS", "S", "M", "L", "XL"],
    },
    {
      filterOption: "Price Range",
      checkbox: [
        "below-₹1000",
        "₹1000-₹2000",
        "₹2000-₹4000",
        "₹4000-₹8000",
        "₹8000-and above",
      ],
    },
  ];

  return (
    <>
      <div className=" mx-auto max-w-screen-xl px-4 py-12 flex justify-between items-center">
        <Head h1="Our" h2="Store" />
        <div className="flex gap-6">
          {/* The button to open modal */}
          <label
            htmlFor="my_modal_6"
            className="btn bg-mygreen hover:bg-myyellow"
          >
            <IoFilterCircleOutline className="text-3xl"/>
          </label>
          {/* Modal Body*/}
          <input
            type="checkbox"
            id="my_modal_6"
            className="modal-toggle w-5xl"
          />
          <div className="modal" role="dialog">
            <div className="modal-box w-[30rem]">
              <h3 className="font-bold text-center text-lg">
                Apply your filters
              </h3>
              <div className="flex font-semiold justify-around mt-5">
                {filter.map((fil, idx) => (
                  <div key={idx}>
                    <h2 className="mb-3">{fil.filterOption}</h2>
                    {fil.checkbox.map((size, index) => {
                      return (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            id={`default-checkbox${idx}${index}`}
                            type="checkbox"
                            value=""
                            className="w-4 h-4 checkbox"
                          />
                          <label
                            htmlFor={`default-checkbox${idx}${index}`}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {size}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="modal-action justify-center pe-5">
                <label
                  htmlFor="my_modal_6"
                  className="btn hover:bg-mygreen bg-myyellow"
                >
                  Apply
                </label>
              </div>
            </div>
          </div>

          <label className="input input-bordered input-success flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={handlesearch}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-8 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((elem, idx) => {
            return (
              <Product
                key={idx}
                desc={elem.desc}
                image={elem.image}
                price={elem.price}
                name={elem.name}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Shop;
