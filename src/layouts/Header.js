import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from "reactstrap";
import user1 from "../assets/images/users/user4.jpg";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();
  
  
  const gotoMyProperties = ()=>{
    navigate("/profil/properties");
  };
  const gotoMyReservationsRequest= ()=>{
    navigate("/profil/reservations");
  };
  const gotoMyPaymentsRequest= ()=>{
    navigate("/profil/payments");
  };
  const HandleLogout = async () => {
    let user = JSON.parse(localStorage.getItem('user'));
    try{
      await axios.post('/logout', user, { withCredentials: true });
      localStorage.clear();
      navigate('/login');
    }
    catch (error){
      console.log(error);
    }
  }
  return (
    <Navbar color="primary" dark expand="md" className="fix-header">
      <div className="d-flex align-items-center">
        <div className="d-lg-block d-none me-5 pe-3">
          Location
        </div>
      </div>
      

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          
          
          
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="transparent">
            <img
              src={user1}
              alt="profile"
              className="rounded-circle"
              width="30"
            ></img>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={gotoMyProperties}>Properties</DropdownItem>
            <DropdownItem onClick={gotoMyReservationsRequest}>Réservations</DropdownItem>
            <DropdownItem onClick={gotoMyPaymentsRequest}>Paiements</DropdownItem>
            <DropdownItem onClick={HandleLogout}> Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
