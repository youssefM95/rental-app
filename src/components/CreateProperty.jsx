import React, { useState } from 'react';
import axios from '../api/axios'; // You can use fetch if preferred
import { useNavigate } from 'react-router-dom';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    owner_id : '',
    title: '',
    description: '',
    price_per_day: '',
    location: '',
    category:'',
    images:[]
  });
  const images = [];
  const categories =['Maison','Appartement','Véhicule'];
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        formData['owner_id'] = JSON.parse(localStorage.getItem('user')).id;
        // Loop through the selected files and append them to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      images.push(selectedFiles[i]);
    }
    formData['images'] = images;
      const response = await axios.post('/property', formData,
      {headers: {
        'Content-Type': 'multipart/form-data',
      }});
      setSuccessMessage('Property created successfully!');
      setFormData({ title: '', description: '', price: '', location: '' }); // Reset form
      navigate('/properties');
    } catch (error) {
      setErrorMessage('An error occurred while creating the property.');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  return (
    <div className="container">
      <h2>Create a New Property</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label>Catégorie:</label>
          <select name="category" onChange={handleChange} className="form-control">
            {categories.map((categorie)=> (
                <option value={categorie}>{categorie}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Title:</label>
          <input 
          className="form-control"
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea 
          className="form-control"
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input 
          className="form-control"
            type="number" 
            name="price_per_day" 
            value={formData.price_per_day} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Location:</label>
          <input 
          className="form-control"
            type="text" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label>Images:</label>
          <input 
          className="form-control"
            type="file" 
            multiple 
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Create Property</button>
      </form>
    </div>
  );
};

export default CreateProperty;
