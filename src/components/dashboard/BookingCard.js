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
import axios from "../../api/axios";

const BookingCard = ({booking,showConfirmAndRefuse,reload}) => {
 const [confirmOrRefuseOpen, setConfirmOrRefuseOpen] = useState(false);
 const [confirmationBody, setConfirmationBody] = useState('');
 const [confirmed, setConfirmed] = useState(false);
 const [refused, setRefused] = useState(false);
 const [visibleError, setVisibleError] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const toggleConfirmation = () => setConfirmOrRefuseOpen(false);
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
 const statusColor = () => {
  switch(booking.status){
    case 'pending' : return "warning"; break;
    case 'confirmed' : return "success"; break;
    case 'refused' : return "danger"; break;
}
 }
 useEffect(() => {
  if (confirmOrRefuseOpen) {
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
                {booking.total_price}€
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
        
        
      </CardBody>
    </Card>
  );
};

export default BookingCard;
