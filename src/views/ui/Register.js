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
  import PhoneInput from 'react-phone-input-2';
  import 'react-phone-input-2/lib/style.css';
  const Register = () => {
   
  
    const [formData, setFormData] = useState({
        first_name : '',
        last_name : '',
        email : '',
        address : '',
        phone_number : '',
        date_of_birth : '',
        password: ''
    });
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
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    const handlePhoneChange= (value) => {
        setFormData({
            ...formData,
            ['phone_number']: value
          });
      }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/register', formData);
        
        setSuccessMessage('Registration successful!');
        setVisibleSuccess(true); 
        setTimeout(() => {navigate('/login');},5000)
        
      } catch (error) {
        setErrorMessage('Login error');
        setVisibleError(true);
      }
    };
  
    return (
      
      <Row>
        <Col>
         
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              
              Inscription
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
              <FormGroup>
                  <Label for="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    onChange={handleChange} 
                    required
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    onChange={handleChange} 
                    required
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    onChange={handleChange} 
                    required
                    type="textarea"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="date_of_birth">Date Of Birth</Label>
                  <Input
                    id="date_of_birth"
                    name="date_of_birth"
                    onChange={handleChange} 
                    required
                    type="date"
                  />
                </FormGroup>
              <FormGroup>
                  <Label for="phone_number">Phone Number</Label>
                  <PhoneInput
                  country={'tn'}
                  onChange={handlePhoneChange}
                />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    onChange={handleChange} 
                    required
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    onChange={handleChange} 
                    required
                    type="password"
                  />
                </FormGroup>
                <Button>Register</Button>
              </Form>
              <p className="forgot-password text-right">
              Déjà inscrit <a href="/login">connectez-vous?</a>
            </p>
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
  
  export default Register;
  