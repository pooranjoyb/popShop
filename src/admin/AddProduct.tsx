import React, { useState } from 'react';
import { supabase } from '../utils/client';

interface Product {
  image_file: File | null;
  Name: string;
  Desc: string;
  id: string;
  created_at: string;
  Price: string;
}

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    image_file: null,
    Name: '',
    Desc: '',
    id: '',
    created_at: '',
    Price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
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
    const { error: uploadError } = await supabase.storage
      .from('images_bucket')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return null;
    }

    const { data } = await supabase.storage
      .from('images_bucket')
      .getPublicUrl(filePath);

    return { publicURL: data.publicUrl, originalFileName: file.name };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (product.image_file) {
      try {
        const uploadResult = await uploadImage(product.image_file);
        if (uploadResult) {
          const { publicURL } = uploadResult;
          const { data, error } = await supabase
            .from('Product_table')
            .insert([
              {
                Image_link: publicURL,
                Name: product.Name,
                Desc: product.Desc,
                id: product.id,
                created_at: product.created_at,
                Price: product.Price
              }
            ]);
  
          if (error) {
            console.error('Error adding product:', error.message);
          } else {
            console.log('Product added successfully:', data);
            setProduct({
              id: '',
              created_at: '',
              image_file: null,
              Name: '',
              Desc: '',
              Price: ''
            });
          }
        }
      } catch (uploadError) {
        console.error('Error uploading image:');
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
  className="file-input file-input-bordered file-input-primary w-full max-w-xs"  id="image_file"
  name="image_file"
  accept="image/*"
  onChange={handleChange}
  required/>
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
