import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody
} from "reactstrap";
import { Gallery } from "react-grid-gallery";
import  { useState } from 'react';
import axios from "../../api/axios"; // You can use fetch if preferred
import {  useParams } from 'react-router-dom';
import { useEffect } from "react";
const PropertyDetails = () => {
  const { id } = useParams();
  const[property, setProperty] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const isImagesExist = galleryImages.length > 0;
 
  
  const getProperty = async () =>{
   const response =  (await axios.get('/property/' + id)).data;
    setProperty(response);
      const newImages = response.images.map(image => {
        return  {id:image.id,src:image.base64,width: 320,
          height: 174}
      })
      setGalleryImages(newImages);
  } 
  useEffect(() => {
    getProperty();
    
  }, []);
  


  return (
    
    <Row>
      <Col>
       
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            
            {property.title}
          </CardTitle>
          <CardBody>
            <Row>
              <Col>
                <strong>Description: </strong>
                {property?.description}
              </Col>
              <Col>
                <strong>Catégorie: </strong>
                {property?.category}
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Prix: </strong>
                {property.price_per_day}
              </Col>
              <Col>
                <strong>Hote: </strong>
                {property?.owner?.first_name} {property?.owner?.last_name}
              </Col>
            </Row>
              <div>
                  {
                    isImagesExist && (
                      <Gallery images={galleryImages}  />
                    )
                  }
                  
              </div>
          </CardBody>
          
        </Card>
      </Col>
    </Row>
    
  );
};

export default PropertyDetails;
