import React, { useState } from 'react';
import { supabase } from '../utils/client';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    image_link: '',
    Name: '',
    Desc: '',
    id: '',
    created_at: '',
    Price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {  error } = await supabase
      .from('Product_table') // Ensure this matches your table name in Supabase
      .insert([
        {
          Image_link: product.image_link,
          Name: product.Name,
          Desc: product.Desc,
          id: product.id,
          created_at: product.created_at,
          Price: product.Price
        }
      ]);

    if (error) {
      console.error('Error adding product:', error);
    } else {
      setProduct({
        id: '',
        created_at: '',
        image_link: '',
        Price: '',
        Name: '',
        Desc: '',
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product to Bucket</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="image_link" className="label">
            <span className="label-text">Image URL:</span>
          </label>
          <input
            type="text"
            id="image_link"
            name="image_link"
            value={product.image_link}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="Name" className="label">
            <span className="label-text">Product Name:</span>
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={product.Name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control md:col-span-2">
          <label htmlFor="Desc" className="label">
            <span className="label-text">Description:</span>
          </label>
          <textarea
            id="Desc"
            name="Desc"
            value={product.Desc}
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
          <label htmlFor="created_at" className="label">
            <span className="label-text">Date:</span>
          </label>
          <input
            type="date"
            id="created_at"
            name="created_at"
            value={product.created_at}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="Price" className="label">
            <span className="label-text">Price:</span>
          </label>
          <input
            type="text"
            id="Price"
            name="Price"
            value={product.Price}
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
