import React, { useState } from 'react';
import { supabase } from '../utils/client';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    image_file: null, // Changed from image_link to image_file
    image_link: '',
    Name: '',
    Desc: '',
    id: '',
    created_at: '',
    Price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image_file' && files) {
      setProduct({
        ...product,
        image_file: files[0]
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  const uploadImage = async (file: File) => {
    const filePath = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from('images_bucket') // Updated to use your bucket name
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from('images_bucket')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Error getting public URL:', urlError);
      return null;
    }

    return publicURL;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (product.image_file) {
      const imageUrl = await uploadImage(product.image_file);
      if (imageUrl) {
        const { error } = await supabase
          .from('Product_table') // Ensure this matches your table name in Supabase
          .insert([
            {
              Image_link: imageUrl,
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
            image_file: null,
            image_link: '',
            Price: '',
            Name: '',
            Desc: '',
          });
        }
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product to Bucket</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="image_file" className="label">
            <span className="label-text">Image:</span>
          </label>
          <input
            type="file"
            id="image_file"
            name="image_file"
            accept="image/*"
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
