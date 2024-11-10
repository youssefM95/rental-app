import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import { Gallery } from "react-grid-gallery";
import  { useState } from 'react';
import axios from "../../api/axios"; // You can use fetch if preferred
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
const Property = () => {
  const { id } = useParams();
  const[property, setProperty] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const hasSelected = galleryImages.some((image) => image.isSelected);
  const isImagesExist = galleryImages.length > 0;
  
  const [formData, setFormData] = useState({
    id: 0,
    owner_id :'',
    title: '',
    description: '',
    price_per_day: '',
    location: '',
    category:'',
    images:[],
    deletedImages:[]
  });
  const categories =['Maison','Appartement','Véhicule'];
  
  const getProperty = async () =>{
   const response =  (await axios.get('/property/' + id)).data;
    setProperty(response);
    setFormData(
      {
        id: response.id,
        owner_id : response.owner_id,
        title: response.title,
        description: response.description,
        price_per_day: response.price_per_day,
        location: response.location,
        category:response.category,
        images:response.images
      }
      )
      const newImages = response.images.map(image => {
        return  {id:image.id,src:image.base64,width: 320,
          height: 174}
      })
      setGalleryImages(newImages);
  } 
  useEffect(() => {
    getProperty();
    
  }, []);
  
  const images = [];
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSelect = (index) => {
    const nextImages = galleryImages.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setGalleryImages(nextImages);
  };
  const handleSelectAllClick = () => {
    const nextImages = galleryImages.map((image) => ({
      ...image,
      isSelected: !hasSelected,
    }));
    setGalleryImages(nextImages);
  };
  const handleDeleteClick = ()=>{
    const filterDeletedImage = galleryImages.filter(image => !image.isSelected);
    const deletedImage = galleryImages.filter(image => image.isSelected);
    setGalleryImages(filterDeletedImage);
    setDeletedImages([...deletedImage.map(image => image.id)]);
  }
  const onDismissError = () => {
    setVisibleError(false);
  };
  const onDismissSuccess = () => {
    setVisibleSuccess(false);
  };
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };
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
        // Loop through the selected files and append them to the FormData object
    for (let i = 0; i < selectedFiles.length; i++) {
      images.push(selectedFiles[i]);
    }
    formData['images'] = images;
    formData['deletedImages'] = deletedImages;
      const response = await axios.post('/property/'+ property.id, formData,
      {headers: {
        'Content-Type': 'multipart/form-data',
      }});
      setVisibleError(false);
      setSuccessMessage('Property created successfully!');
      setVisibleSuccess(true);
      setFormData({ title: '', description: '', price: '', location: '' }); // Reset form
      setTimeout(() => {navigate('/myproperties');},2000)
      
    } catch (error) {
      setErrorMessage('An error occurred while creating the property.');
      setVisibleError(true);
    }
  };

  return (
    
    <Row>
      <Col>
       
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            
            Edit proprieté
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="Catégorie">Catégorie</Label>
                <Input id="Catégorie" name="category" type="select" onChange={handleChange} value={formData.category}>
                {categories.map((categorie)=> (
                <option value={categorie}>{categorie}</option>
            ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="title">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  onChange={handleChange} 
                  required
                  type="text"
                  value={formData.title}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  onChange={handleChange} 
                  required
                  type="textarea"
                  value={formData.description}
                />
              </FormGroup>
              <FormGroup>
                <Label for="price_per_day">Prix</Label>
                <Input
                  id="price_per_day"
                  name="price_per_day"
                  onChange={handleChange} 
                  required
                  type="number"
                  value={formData.price_per_day}
                />
              </FormGroup>
              <FormGroup>
                <Label for="location">Localisation</Label>
                <Input
                  id="location"
                  name="location"
                  onChange={handleChange} 
                  required
                  type="text"
                  value={formData.location}
                />
              </FormGroup>
              <FormGroup>
                <Label for="images">Images</Label>
                <Input id="images" name="file" type="file" multiple 
                onChange={handleFileChange} />
              </FormGroup>
              <div>
                <div className="p-t-1 p-b-1">
                  {
                    isImagesExist && (
                    <Button onClick={handleSelectAllClick}>
                      {hasSelected ? "Clear selection" : "Select all"}
                    </Button>
                    )
                  }
                  
                  {
                    hasSelected && (
                    <Button onClick={handleDeleteClick} color="danger">
                    Supprimer
                    </Button>
                    )
                  }
                  
                </div>
                <Gallery images={galleryImages} onSelect={handleSelect} />
              </div>
              <Button>Editer</Button>
            </Form>
          </CardBody>
          
        </Card>
      </Col>
      
      <div>
            <Alert color="success" isOpen={visibleSuccess} toggle={onDismissSuccess.bind(null)}>
              {successMessage}
            </Alert>
        </div>
        <div>
          <Alert color="danger" isOpen={visibleError} toggle={onDismissError.bind(null)}>
           {errorMessage}
          </Alert>
        </div>
    </Row>
    
  );
};

export default Property;
