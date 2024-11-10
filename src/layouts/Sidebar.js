import {  Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  
  {
    title: "Properties",
    href: "/properties",
    icon: "bi bi-card-text",
  },
  {
    title: "Réservations",
    href: "/myreservations",
    icon: "bi bi-card-text",
  }
  
];

const Sidebar = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
      >
        <div className="bg-dark text-white p-2 opacity-75">{user.first_name} {user.last_name}</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
