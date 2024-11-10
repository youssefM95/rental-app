import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Button,
  ListGroup,
  ListGroupItem,
  Badge,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert
} from "reactstrap";
import bg1 from "../../assets/images/bg/bg1.jpg";
import { useState, useEffect  } from "react";
import axios from "../../api/axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

const PropertyCard = ({property,showEditAndDelete,reload,edit}) => {
  const [id, setpropertyId]=useState(property?.id);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [reservationModal, setReservationModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 1));
  });
  const [totalPrice, setTotalPrice] = useState();
  const [bookedDates, setBookedDates] = useState([]);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const [visibleError, setVisibleError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState('1');

  const toggleDelete = () => setDeleteConfirmation(false);
  const toggleReservation = () => setReservationModal(false);
  const navigate = useNavigate();
  const onDismissError = () => {
    setVisibleError(false);
  };
  const onDismissSuccess = () => {
    setVisibleSuccess(false);
  };
  const openModalConfirmDeleteProperty = () => {
    setDeleteConfirmation(true);
  }
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const openModalReservation = () => {
    axios.get(`/booking/booked-dates/${property.id}`)
            .then(response => setBookedDates(response.data))
            .catch(error => console.error(error));
    setReservationModal(true);
    calculateTotalPrice();
  }
  const deleteProperty = async ()=> {
    let response = await axios.delete("/property/"+id);
    setDeleteConfirmation(false);
    reload()
  }
  const editProperty = ()=>{
    edit(id)
  }
  const isDateBooked = (date, bookedDates) => {
    return bookedDates.length && bookedDates.some(({ start_date, end_date }) => {
        const start = new Date(start_date);
        const end = new Date(end_date);
        return date >= start && date <= end;
  })};
    const isStartDateBooked = startDate && isDateBooked(startDate, bookedDates);
    const isEndDateBooked = endDate && isDateBooked(endDate, bookedDates);
  const calculateTotalPrice = () => {
    setTotalPrice(((endDate - startDate)/(1000*3600*24)) * property.price_per_day);
  }
  const changeStartDate = (date) =>{
    setStartDate(date);
  }
  const changeEndDate = (date) =>{
    setEndDate(date);
  }
  const goToDetails = () => {
    navigate('/propertyDetails/' + property.id)
  }
  const categoryColor = () => {
    switch(property.category){
      case 'Véhicule' : return "warning"; break;
      case 'Appartement' : return "success"; break;
      case 'Maison' : return "danger"; break;
  }
}
  const reserver = async () => {
    let formData = {
      property_id : property.id,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      total_price: totalPrice,
      status: 'pending'
    };
    try {
    let response = await axios.post("/booking", formData);
    setSuccessMessage('Booking created successfully!');
    setVisibleSuccess(true);
    setTimeout(() => {setReservationModal(false);},3000)
    }
    catch (error) {
      setErrorMessage('An error occurred while creating the booking.');
      setVisibleError(true);
    }
  }
  useEffect(() => {
    if (reservationModal) {
      setStartDate(new Date());
      const today = new Date();
      setEndDate(new Date(today.setDate(today.getDate() + 1)));
      setSuccessMessage('');
      setVisibleSuccess(false);
      setErrorMessage('');
      setVisibleError(false);
      calculateTotalPrice();
    }
  }, [reservationModal]);
  useEffect(() => {
    calculateTotalPrice();
}, [startDate, endDate]);

  return (
    
    <Card>
      <Modal isOpen={deleteConfirmation}>
        <ModalHeader toggle={toggleDelete}>Confirmation de suppression</ModalHeader>
        <ModalBody>
          Vous-étes sur de supprimer cette proprieté
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteProperty}>
            Oui
          </Button>{' '}
          <Button color="secondary" onClick={toggleDelete}>
            Non
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={reservationModal}>
        <ModalHeader toggle={toggleReservation}>Reservation</ModalHeader>
        <ModalBody>
        <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Date de réservation</AccordionHeader>
          <AccordionBody accordionId="1">
          <DatePicker
                selected={startDate}
                onChange={(date) => changeStartDate(date)}
                excludeDates={bookedDates.map(({ start_date, end_date }) => {
                    const dates = [];
                    for (let d = new Date(start_date); d <= new Date(end_date); d.setDate(d.getDate() + 1)) {
                        dates.push(new Date(d));
                    }
                    return dates;
                }).flat()}
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => changeEndDate(date)}
                excludeDates={bookedDates.map(({ start_date, end_date }) => {
                    const dates = [];
                    for (let d = new Date(start_date); d <= new Date(end_date); d.setDate(d.getDate() + 1)) {
                        dates.push(new Date(d));
                    }
                    return dates;
                }).flat()}
            />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">Resumé</AccordionHeader>
          <AccordionBody accordionId="2">
            <h4>Date début : {startDate ? startDate.toLocaleDateString() : ''}</h4>
            <h4>Date fin : {endDate ? endDate.toLocaleDateString() : ''}</h4>
            <h4> Total : {totalPrice}$</h4>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
        </ModalBody>
        <ModalFooter>
          {
            (!isStartDateBooked && !isEndDateBooked) && (
            <Button color="primary" onClick={reserver}>
              Reserver
            </Button>
            )
          }
          
          <Button color="secondary" onClick={toggleReservation}>
            Annuler
          </Button>
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
        </ModalFooter>
      </Modal>
      <CardImg alt="Card image cap" src={property.images && property.images.length? property.images[0]:bg1} top width="100%"/>
      <CardBody className="p-4">
        <Row>
          <Col
            md={{offset: 3, size: 6}} sm="12" >
          <Badge color={categoryColor()} className="ms-3">
                        {property.category}
                      </Badge>
          </Col>
        </Row>
        <CardTitle tag="h5">{property.title}</CardTitle>
        <CardText className="mt-3">{property.text}</CardText>
        <ListGroup  className="mt-4">
        <ListGroupItem className="d-flex align-items-center p-3 border-0 justify-content-between">
                <Badge><i className="bi bi-geo-alt-fill"></i></Badge>
                {property.location}
            </ListGroupItem>
            <ListGroupItem className="d-flex align-items-center p-3 border-0 justify-content-between">
            <Badge><i className="bi bi-cash"></i></Badge>
                {property.price_per_day}€
            </ListGroupItem>
        </ListGroup>
        {
          showEditAndDelete && (
            <Row xs="2" className="d-flex justify-content-between">
              <Col>
              <Button color="primary" onClick={editProperty}>Edit</Button>
              </Col>
              <Col className="d-flex justify-content-end">
              <Button color="danger" onClick={openModalConfirmDeleteProperty}><i className="bi bi-trash3-fill"></i></Button>
              </Col>
            </Row>
          )
        }
        {
          !showEditAndDelete && (
            <Row xs="2" className="d-flex justify-content-between">
              <Col>
              <Button color="primary" onClick={openModalReservation}>Reserver</Button>
              </Col>
              <Col>
              <Button color="primary" onClick={goToDetails}>Voir détails</Button>
              </Col>
            </Row>
          )
        }
        
        
      </CardBody>
    </Card>
  );
};

export default PropertyCard;
