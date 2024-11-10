import {
  Row,
  Col,
} from "reactstrap";
import BookingCard from "../../components/dashboard/BookingCard";
import axios from "../../api/axios";
import { useEffect, useState } from "react";


  

const MyReservations = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => { 
    try {
      const response = await axios.get('/mybooking', { withCredentials: true });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };
  useEffect(() => {
    
    fetchBookings();
  }, []);
  return (
    <div>
      <h5 className="mb-3">My Bookings</h5>
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

export default MyReservations;
