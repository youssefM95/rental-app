import {
  Row,
  Col,
} from "reactstrap";
import BookingCard from "../../components/cards/BookingCard";
import axios from "../../api/axios";
import { useEffect, useState } from "react";


  

const Reservations = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => { 
    try {
      const response = await axios.get('/mybooking', { withCredentials: true });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };
  useEffect(() => {
    
    fetchBookings();
  }, []);
  return (
    <div>
      <h5 className="mb-3">Réservations</h5>
      <Row>
        {bookings.map((booking, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <BookingCard
              booking={booking}

            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Reservations;
