import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Alert
} from "reactstrap";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "../../api/axios";

const BookingCard = ({booking,showConfirmAndRefuse,reload}) => {
 const [confirmOrRefuseOpen, setConfirmOrRefuseOpen] = useState(false);
 const [confirmationBody, setConfirmationBody] = useState('');
 const [confirmed, setConfirmed] = useState(false);
 const [refused, setRefused] = useState(false);
 const [visibleError, setVisibleError] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const toggleConfirmation = () => setConfirmOrRefuseOpen(false);
 const stripe = useStripe();
 const openModalConfirmation = (text) => {
  setConfirmationBody(text);
  setConfirmOrRefuseOpen(true);
 }
 const onDismissError = () => {
  setVisibleError(false);
};
 const updateStatus = async () => {
  let formData = {
    'status' : confirmed? 'confirmed' : 'refused'
  }
  try {
    let response = await axios.post("/booking/" + booking.id, formData);
    setConfirmOrRefuseOpen(false);
    reload();
  }
  catch(error){
    setErrorMessage('An error occurred while creating the booking.');
    setVisibleError(true);
  }
 }
 const checkout = async() => {
  if (!stripe) {
    console.error('Stripe has not loaded yet')
    return
    }
    try {
      const items = [{
      price_data: {
      currency: 'usd',
      product_data: {
      name: booking.property.title,
      images: booking.property.images && booking.property.images.length? booking.property.images[0]: [],
      },
      unit_amount: Math.round(booking.total_price),
      },
      quantity: 1
      }];
      console.log('Sending to checkout:', items)
      const response = await axios.post("payment/processpayment",JSON.stringify({
        line_items: items,
        success_url: `${window.location.origin}/payment/success/${booking.id}`,
        cancel_url: `${window.location.origin}/myreservations`
        }));

      if (response.status != 200) {
      const errorData = await response.data
      throw new Error(errorData.error || 'Network response was not ok')
      }
      const data = await response.data;
      console.log('Response from server:', data)
      if (data.id) {
      const result = await stripe.redirectToCheckout({
      sessionId: data.id
      })
      if (result.error) {
      console.error('Stripe redirect error:', result.error)
      throw new Error(result.error.message)
      }
      } else {
      throw new Error('No session ID received from server')
      }
      } catch (error) {
      console.error('Checkout error:', error)
      alert('Payment failed: ' + error.message)
      }
 }
 const statusColor = () => {
  switch(booking.status){
    case 'pending' : return "warning"; break;
    case 'confirmed' : return "success"; break;
    case 'refused' : return "danger"; break;
}
 }
 useEffect(() => {
  if (!confirmOrRefuseOpen) {
    setErrorMessage('');
    setVisibleError(false);
    setConfirmed(false);
    setRefused(false);
    setConfirmationBody('');
  }
}, [confirmOrRefuseOpen]);
useEffect(()=> {

  if(confirmationBody == "Confirmer"){
    setConfirmed(true);
  } else {
    setRefused(true);
  }
}, [confirmationBody])
  return (
    
    <Card>
      <Modal isOpen={confirmOrRefuseOpen}>
        <ModalHeader toggle={toggleConfirmation}>Confirmation</ModalHeader>
        <ModalBody>
          Vous-étes sur de {confirmationBody} cette reservation
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={updateStatus}>
            Oui
          </Button>{' '}
          <Button color="secondary" onClick={toggleConfirmation}>
            Non
          </Button>
          <div>
          <Alert color="danger" isOpen={visibleError} toggle={onDismissError.bind(null)}>
           {errorMessage}
          </Alert>
        </div>
        </ModalFooter>
      </Modal>
       <CardBody className="p-4">
        <CardTitle tag="h5">{booking.property.title}</CardTitle>
        <CardText className="mt-3">{booking.text}</CardText>
        <ListGroup  className="mt-4">
        <ListGroupItem className="d-flex align-items-center p-3 border-0 justify-content-between">
                <Badge><i className="bi bi-calendar-date"></i></Badge>
                {booking.start_date}
            </ListGroupItem>
            <ListGroupItem className="d-flex align-items-center p-3 border-0 justify-content-between">
            <Badge><i className="bi bi-calendar-date-fill"></i></Badge>
                {booking.end_date}
            </ListGroupItem>
            <ListGroupItem className="d-flex align-items-center p-3 border-0 justify-content-between">
            <Badge><i className="bi bi-cash"></i></Badge>
                {booking.total_price} TND
            </ListGroupItem>
        </ListGroup>
        <Row>
          <Col
            md={{offset: 3, size: 6}} sm="12" >
          <Badge color={statusColor()} className="ms-3">
                        {booking.status}
                      </Badge>
          </Col>
        </Row>
        {
          showConfirmAndRefuse && booking.status=="pending" && (
            <Row xs="2 mt-3" className="d-flex justify-content-between">
              <Col>
              <Button color="primary" onClick={() =>openModalConfirmation("Confirmer")}>Confirmer</Button>
              </Col>
              <Col>
              <Button color="danger" onClick={() =>openModalConfirmation("Réfuser")}>Réfuser</Button>
              </Col>
            </Row>
          )
        }
        {
          !showConfirmAndRefuse && booking.status == "confirmed" && !booking.is_payed && (
            <Row xs="1 mt-3" className="d-flex offset-3">
              <Col>
              <Button color="primary" onClick={() =>checkout()}>check-out</Button>
              </Col>
            </Row>
          )
        }
        
        
      </CardBody>
    </Card>
  );
};

export default BookingCard;
