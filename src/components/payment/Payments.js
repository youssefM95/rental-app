import {
    Row,
    Col,
  } from "reactstrap";
  import axios from "../../api/axios";
  import { useEffect, useState } from "react";
import PaymentCard from "../cards/PaymentCard";
  
  
    
  
  const Payments = () => {
    const [payments, setPayments] = useState([]);
  
    const fetchPayments = async () => { 
      try {
        const response = await axios.get('/user-payments', { withCredentials: true });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };
    useEffect(() => {
      
      fetchPayments();
    }, []);
    return (
      <div>
        <h5 className="mb-3">Paiements</h5>
        <Row>
          {payments.map((payment, index) => (
            <Col sm="6" lg="6" xl="3" key={index}>
              <PaymentCard
                payment={payment}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  };
  
  export default Payments;
  