import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Alert
} from "reactstrap";
import axios from "../../api/axios";

const PaymentCard = ({payment,showConfirmAndRefuse,reload}) => {
const [accept,setAccept]= useState(false);
const [refuse,setRefuse]= useState(false);
const [acceptOrRefuseOpen, setAccepdOrRefuseOpen] = useState(false);
const [confirmationBody, setConfirmationBody] = useState('');
const [visibleError, setVisibleError] = useState(false);
 const [errorMessage, setErrorMessage] = useState('');
 const toggleConfirmation = () => setAccepdOrRefuseOpen(false);
 const statusColor = () => {
  switch(payment.payment_status.name){
    case 'pending' : return "warning"; break;
    case 'accepted' : return "success"; break;
    case 'refused' : return "danger"; break;
}
 }
 const openAcceptModal = () => {
  setConfirmationBody("accepter");
  setAccepdOrRefuseOpen(true);
  setAccept(true);
  setRefuse(false);
 }
 const openRefuseModal = () => {
  setConfirmationBody("réfuser");
  setAccepdOrRefuseOpen(true);
  setRefuse(true);
  setAccept(false);
 }
 const updateStatus = async () => {
  let formData = {
    'id' : payment.id
  }
  try {
     await axios.post("/payment/" + accept == true?"accept":"refuse", formData);
     setAccepdOrRefuseOpen(false);
    reload();
  }
  catch(error){
    setErrorMessage('An error occurred while creating the booking.');
    setVisibleError(true);
  }
 }
 const onDismissError = () => {
  setVisibleError(false);
};
 useEffect(() => {
  if (!acceptOrRefuseOpen) {
    setErrorMessage('');
    setVisibleError(false);
    setAccept(false);
    setRefuse(false);
    setConfirmationBody('');
  }
}, [acceptOrRefuseOpen]);
  return (
    
    <Card>
      <Modal isOpen={acceptOrRefuseOpen}>
        <ModalHeader toggle={toggleConfirmation}>Confirmation</ModalHeader>
        <ModalBody>
          Vous-étes sur de {confirmationBody} cette paiement
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
        <CardTitle tag="h5">Paiement par :<Badge color={"success"} className="ms-3">
                          {payment.payment_method.name}
                      </Badge> </CardTitle>
        <ListGroup  className="mt-4">
            <ListGroupItem className="d-flex align-items-center p-3 border-0 justify-content-between">
            <Badge><i className="bi bi-cash"></i></Badge>
                {payment.amount} TND
            </ListGroupItem>
        </ListGroup>
        <Row>
          <Col
            md={{offset: 3, size: 6}} sm="12" >
          <Badge color={statusColor()} className="ms-3">
                        {payment.payment_status.name}
                      </Badge>
          </Col>
        </Row>
        
        {
          showConfirmAndRefuse && payment.payment_status.name=="pending" && (
            <Row xs="2 mt-3" className="d-flex justify-content-between">
              <Col>
              <Button color="primary" onClick={() =>openAcceptModal()}>Confirmer</Button>
              </Col>
              <Col>
              <Button color="danger" onClick={() =>openRefuseModal()}>Réfuser</Button>
              </Col>
            </Row>
          )
        }
      </CardBody>
    </Card>
  );
};

export default PaymentCard;
