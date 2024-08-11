import React, { useState } from 'react';
import axios from 'axios';

const CakeAdmin = () => {
  const [form, setForm] = useState({ name: '', category: '', unitPrice: '', image: null });
  const [image, setImage] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = () => {
      console.error("Error reading file");
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('category', form.category);
    formData.append('unitPrice', form.unitPrice);
    formData.append('image', form.image);

    try {
      const res = await axios.post(`${BASE_URL}/api/cakes`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input type="number" name="unitPrice" placeholder="Unit Price" value={form.unitPrice} onChange={handleChange} required />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Add Cake</button>

      {image && <div>
        <img width={100} height={100} src={image} alt="Preview" />
      </div>}
    </form>
  );
};

export default CakeAdmin;
