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
import  { useState } from 'react';
import axios from "../../api/axios"; // You can use fetch if preferred
import { useNavigate } from 'react-router-dom';
const NewProperty = () => {
  const categories =['Maison','Appartement','Véhicule'];

  const [formData, setFormData] = useState({
    owner_id : '',
    title: '',
    description: '',
    price_per_day: '',
    location: '',
    category:categories[0],
    images:[]
  });
  const images = [];
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
      setVisibleError(false);
      setSuccessMessage('Property created successfully!');
      setVisibleSuccess(true);
      setFormData({ title: '', description: '', price: '', location: '' }); // Reset form
      setTimeout(() => {navigate('/properties');},2000)
      
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
            
            Nouveau proprieté
          </CardTitle>
          <CardBody>
            <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="Catégorie">Catégorie</Label>
                <Input id="Catégorie" name="category" type="select" onChange={handleChange}>
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
                />
              </FormGroup>
              <FormGroup>
                <Label for="images">Images</Label>
                <Input id="images" name="file" type="file" multiple 
                onChange={handleFileChange} />
              </FormGroup>
              <Button>Ajouter</Button>
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

export default NewProperty;
