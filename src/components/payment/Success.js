import { useParams } from 'react-router-dom'
import axios from '../../api/axios';
import { CardImg } from 'reactstrap';
import successImage from "../../assets/images/PAYMENT-SUCCESS.png";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const SuccessPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const addPayment = async () => {
            try {
                await axios.post("/payment", { bookingId: id });
                setTimeout(() => {
                    navigate('/payments');
                }, 3000);
            } catch (error) {
                console.error("Erreur lors de l'ajout du paiement :", error);
            }
        };
    
        addPayment();
    }, [id]);
    return(
        <CardImg className='success-img-top' alt="Card image cap" src={successImage} top width="100%"/>
    )
}

export default SuccessPage;