import React, { ChangeEvent, useEffect, useState } from "react";

// components
import Head from "../../components/Head";
import Product from "../../components/Product";
import { IoFilterCircleOutline } from "react-icons/io5";
import { supabase } from "../../utils/client";

type PriceRange = {
  min: number;
  max: number;
};

type PriceRanges = {
  [key: string]: PriceRange;
};

function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [tempSelectedPriceRanges, setTempSelectedPriceRanges] = useState<string[]>([]); // Temporary state for filter selections

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  const getProducts = async () => {
    const { data } = await supabase.from("Product_table").select();
    console.log(data);
    if (data) {
      setproducts(data);
    }
  };

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (products) {
      timer = setTimeout(() => {
        setSkeleton(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [products]);

  const handlesearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const { data } = await supabase.from("Product_table").select();
    const value = e.target.value;
    console.log(value, "hello");
    if (data) {
      const filtereddata = data.filter((elem) => {
        if (elem.name.toLowerCase().includes(value.toLowerCase())) return true;
        else return;
      });
      setproducts(filtereddata);
    }

    return selectedPriceRanges.some((range) => {
      const priceRange = priceRanges[range];
      if (priceRange) {
        return (
          product.Price >= priceRange.min && product.Price <= priceRange.max
        );
      }
      return false;
    });
  };

  const applyFilters = () => {
    setSelectedPriceRanges(tempSelectedPriceRanges);
  };

  const priceRanges: PriceRanges = {
    "below-₹1000": { min: 0, max: 999 },
    "₹1000-₹2000": { min: 1000, max: 2000 },
    "₹2000-₹4000": { min: 2000, max: 4000 },
    "₹4000-₹8000": { min: 4000, max: 8000 },
    "₹8000-and above": { min: 8000, max: Infinity },
  };

  const filter = [
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

  const filteredProducts = products
    .filter((product) => product.Name.toLowerCase().includes(searchTerm))
    .filter(filterByPrice);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 pt-12 pb-8 flex justify-center md:justify-between items-center flex-wrap">
        <Head h1="Our" h2="Store" />
        <div className="flex gap-6 mt-8 justify-center md:justify-end w-full">
          <label
            htmlFor="my_modal_6"
            className="btn bg-mygreen hover:bg-myyellow"
          >
            <IoFilterCircleOutline className="text-3xl" />
          </label>
          <input
            type="checkbox"
            id="my_modal_6"
            className="modal-toggle w-5xl"
          />
          <div className="modal" role="dialog">
            <div className="modal-box w-[18rem] md:w-[30rem]">
              <h3 className="font-bold text-center text-lg">
                Apply your filters
              </h3>
              <div className="flex font-semiold justify-around mt-5">
                {filter.map((fil, idx) => (
                  <div key={idx}>
                    <h2 className="mb-3">{fil.filterOption}</h2>
                    {fil.checkbox.map((range, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          id={`default-checkbox${idx}${index}`}
                          type="checkbox"
                          value={range}
                          className="w-4 h-4 checkbox"
                          onChange={handlePriceRangeChange}
                          checked={tempSelectedPriceRanges.includes(range)} // Maintain checked state in modal
                        />
                        <label
                          htmlFor={`default-checkbox${idx}${index}`}
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="modal-action pe-5">
                <label
                  htmlFor="my_modal_6"
                  className="btn hover:bg-mygreen bg-myyellow"
                  onClick={applyFilters} // Apply button click handler
                >
                  Apply
                </label>

                <label
                  htmlFor="my_modal_6"
                  className="btn hover:bg-myred bg-myred"
                >
                  Cancel
                </label>
              </div>
            </div>
          </div>

          <label className="input input-bordered input-success flex items-center gap-2">
            <input
              type="text"
              className="grow w-36"
              placeholder="Search"
              onChange={handleSearch}
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
          {skeleton
            ? Array(4)
                .fill(0)
                .map((_, idx) => (
                  <div key={idx} className="flex flex-col gap-5">
                    <div className="skeleton w-full h-[50vh] overflow-hidden rounded-lg bg-gray-200 aspect-h-8 aspect-w-7"></div>
                    <div className="skeleton h-4 w-36 m-auto"></div>
                    <div className="skeleton h-4 w-20 m-auto"></div>
                  </div>
                ))
            : products.map((elem, idx) => {
                return (
                  <Product
                    key={idx}
                    desc={elem.Desc}
                    image={elem.Image_link}
                    price={elem.Price}
                    name={elem.Name}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
}

export default Shop;
