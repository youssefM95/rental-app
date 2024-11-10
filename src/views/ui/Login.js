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
  const Login = () => {
   
  
    const [formData, setFormData] = useState({
        email : '',
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
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/login', formData);
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.user));
        setVisibleError(false);
        setSuccessMessage('Login successful!');
        setVisibleSuccess(true); 
        setTimeout(() => {navigate('/');},2000)
        
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
              
              Login
            </CardTitle>
            <CardBody>
              <Form onSubmit={handleSubmit}>
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
                <Button>Login</Button>
              </Form>
              <p className="forgot-password text-right">
                Pas inscrit <a href="/register">inscrivez-vous?</a>
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
  
  export default Login;
  