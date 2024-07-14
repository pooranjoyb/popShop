import React, { useState } from 'react';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    img: '',
    name: '',
    desc: '',
    id: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Product Details:', product);
    // Add your form submission logic here
  };

  return (
    <div className=" p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product to Bucket</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="img" className="label">
            <span className="label-text">Image URL:</span>
          </label>
          <input
            type="text"
            id="img"
            name="img"
            value={product.img}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Product Name:</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control md:col-span-2">
          <label htmlFor="desc" className="label">
            <span className="label-text">Description:</span>
          </label>
          <textarea
            id="desc"
            name="desc"
            value={product.desc}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="id" className="label">
            <span className="label-text">Product ID:</span>
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={product.id}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="date" className="label">
            <span className="label-text">Date:</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={product.date}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control md:col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
