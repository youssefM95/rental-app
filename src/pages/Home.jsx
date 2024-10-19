import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => { 
      try {
        let userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await axios.get('/properties/'+userId);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, []);
  return (
    <div>
      <h2>Available Properties</h2>
      <div style={{ display: 'flex'}}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;