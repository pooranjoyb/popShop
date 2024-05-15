
import { useEffect, useState } from "react";

// components
import Head from "../../components/Head";
import Product from "../../components/Product";
const data = [
  
    {
      desc: "",
      image: "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      price: 20,
      name: "Diamond Blue Suit"
    },
    {
      desc: "",
      image: "https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b",
      price: 99,
      name: "Nomad Outfit"
    },
    {
      desc: "",
      image: "https://img.freepik.com/free-photo/full-shot-woman-posing-with-green-outfit_23-2150728960.jpg?w=360&t=st=1708162804~exp=1708163404~hmac=b8eed76bcc3e16b01902ab4b5993eacc511b701a7c8a21690277d73429c02907",
      price: 56,
      name: "Leaf Green Outfit"
    },
    {
      desc: "",
      image: "https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f",
      price: 99,
      name: "Red Casual Wear"
    },
    {
        desc: "",
        image: "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        price: 20,
        name: "Diamond Blue Suit"
      },
      {
        desc: "",
        image: "https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b",
        price: 99,
        name: "Nomad Outfit"
      },
      {
        desc: "",
        image: "https://img.freepik.com/free-photo/full-shot-woman-posing-with-green-outfit_23-2150728960.jpg?w=360&t=st=1708162804~exp=1708163404~hmac=b8eed76bcc3e16b01902ab4b5993eacc511b701a7c8a21690277d73429c02907",
        price: 56,
        name: "Leaf Green Outfit"
      },
      {
        desc: "",
        image: "https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f",
        price: 99,
        name: "Red Casual Wear"
      },
    {
      desc: "",
      image: "https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      price: 20,
      name: "Diamond Blue Suit"
    },
    {
      desc: "",
      image: "https://img.freepik.com/free-photo/model-suit-posing-studio_1303-12436.jpg?w=360&t=st=1708162653~exp=1708163253~hmac=04c46ae61b01bae7e68c3a3a52e084371b7529e79d0266419944786f5726b30b",
      price: 99,
      name: "Nomad Outfit"
    },
    {
      desc: "",
      image: "https://img.freepik.com/free-photo/full-shot-woman-posing-with-green-outfit_23-2150728960.jpg?w=360&t=st=1708162804~exp=1708163404~hmac=b8eed76bcc3e16b01902ab4b5993eacc511b701a7c8a21690277d73429c02907",
      price: 56,
      name: "Leaf Green Outfit"
    },
    {
      desc: "",
      image: "https://img.freepik.com/free-photo/full-shot-beautiful-lady_23-2148440576.jpg?w=360&t=st=1708162622~exp=1708163222~hmac=a0eb19d754c23e36840605ecb684ece75e8b20e74ba329c1d0958a10dec2824f",
      price: 99,
      name: "Red Casual Wear"
    }
  ];
  
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
      
  const handlesearch=(e:any)=>{
    const value=e.target.value;
    console.log(value,"hello")
  const filtereddata=  data.filter((elem)=>{if(elem.name.toLowerCase().includes(value.toLowerCase()))return true;else return});
  setproducts(filtereddata);
   }
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const addToCart = () => {
        // logic for adding in cart
        toast.success('Added to Cart', { autoClose: 2000 });
    };

    return (
        <>
            <div className=" flex-col sm:flex-row gap-8 p-2 py-8 mx-auto px-2 max-w-screen-xl sm:px-12 sm:py-12 lg:px-8 lg:py-12 flex justify-between items-center">
                <Head h1="Our" h2="Store" />
                <div>
                <label className="input input-bordered input-success flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" onChange={handlesearch}/>
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
                    {products.map((elem,idx)=>{
                        return(
                          <>
                        <Product  key={idx} desc={elem.desc} image={elem.image} price={elem.price} name={elem.name} />
                          <div className="flex flex-row justify-between px-2 mt-2 ml-[-10px] ">
                            <div className="flex flex-col ">
                                <Button text="Buy Now" color="mygreen" hover="myred" />
                            </div>
                            <div className="flex flex-row gap-4 mt-1">
                                <FontAwesomeIcon icon={faHeart} className="cursor-pointer h-9 w-8 transition-colors duration-300 hover:text-red-600" />
                                <FontAwesomeIcon icon={faShoppingCart} className="cursor-pointer h-9 w-8 transition-colors duration-300 hover:text-blue-600" onClick={addToCart} />
                            </div>
                        </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )

  return (
    <>
      <div className=" flex-col sm:flex-row gap-8 p-2 py-8 mx-auto px-2 max-w-screen-xl sm:px-12 sm:py-12 lg:px-8 lg:py-12 flex justify-between items-center">
        <Head h1="Our" h2="Store" />
        <div>
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
