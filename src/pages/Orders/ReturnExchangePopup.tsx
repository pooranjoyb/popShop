import React, { useState } from "react";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface Product {
  desc: string | null;
  image: string;
  name: string;
  price: number;
  quantity: number;
  ratings: number;
  size: string;
}

export interface ORDER {
  username: string;
  orderId: string;
  product: Product[];
  date: string;
  phone: number;
  status: string;
  price: string;
}

interface ReturnExchangePopupProps {
  order: ORDER;
  onClose: () => void;
  onSubmit: (type: "return" | "exchange", details: string) => void;
}

const ReturnExchangePopup: React.FC<ReturnExchangePopupProps> = ({ onClose, onSubmit }) => {
  const [type, setType] = useState<"return" | "exchange">("return");
  const [details, setDetails] = useState("");

  const handleSubmit = () => {
    if (!details.trim()) {
      toast.error("Please provide details.");
      return;
    }

    onSubmit(type, details);
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    toast.success(`${capitalizedType} request submitted successfully!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-mywhite bg-opacity-50"></div>
      {/* Popup */}
      <div className="relative p-8 rounded-lg shadow-lg w-1/2 bg-mywhite text-black">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-xl"
        >
          &times;
        </button>
        <h2 className="font-bold mb-4 text-2xl flex items-center justify-center text-myred">
          {type === "return" ? "Return Item" : "Exchange Item"}
        </h2>
        <div className="form-group mb-4">
          <label className="block mb-2">
            <input
              type="radio"
              value="return"
              checked={type === "return"}
              onChange={() => setType("return")}
              className="mr-2"
            />
            Return
          </label>
          <label className="block mb-2">
            <input
              type="radio"
              value="exchange"
              checked={type === "exchange"}
              onChange={() => setType("exchange")}
              className="mr-2"
            />
            Exchange
          </label>
        </div>
        {type === "return" ? (
          <div className="form-group mb-4">
            <label className="block mb-2">Was the item defective?</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Please describe the issue"
              className="w-full p-2 border rounded"
            />
          </div>
        ) : (
          <div className="form-group mb-4">
            <label className="block mb-2">What do you want to exchange?</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe style or size"
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        <div className="flex justify-center">
          <Button
            text="Submit"
            color="mygreen"
            hover="myyellow"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ReturnExchangePopup;
