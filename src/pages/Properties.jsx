import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import PropertyCard from '../components/PropertyCard';
import { useNavigate  } from "react-router-dom";


const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => { 
      try {
        const response = await axios.get('/properties');
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties", error);
      }
    };
    fetchProperties();
  }, []);
  const navigateTo = useNavigate();
  const goToCreateRoute = ()=>{
    let path = `addProperty`; 
    navigateTo(path);
  }
  return (
    <div>
      <h2>Available Properties</h2>
      <button style={{background :'linear-gradient(to bottom, #2F80ED, #56CCF2)', color:'white'}} onClick={goToCreateRoute}>Add new property</button>
      <div style={{ display: 'flex'}}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;