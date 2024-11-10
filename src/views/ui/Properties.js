import {
  Row,
  Col,
} from "reactstrap";
import PropertyCard from "../../components/dashboard/PropertyCard";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

  

const Properties = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => { 
    try {
      const response = await axios.get('/properties');
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };
  useEffect(() => {
    
    fetchProperties();
  }, []);
  const navigateTo = useNavigate();
  const goToEditRoute = (id)=>{
    let path = `property/`+id ; 
    navigateTo(path);
  }
  return (
    <div>
      <h5 className="mb-3">Proprietes</h5>
      <Row>
        {properties.map((property, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <PropertyCard
              property={property}
              showEditAndDelete={ false}
              reload={fetchProperties}
              edit={goToEditRoute}

            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Properties;
