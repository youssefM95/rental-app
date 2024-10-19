import { useLocation } from "react-router-dom";
import Navbar from "./NavBar";
function NavBarWrapper (){
    const noNavBarPaths = ['/login','/register'];
    const location = useLocation();
    return(
        <>
        {!noNavBarPaths.includes(location.pathname) &&<Navbar/>}
        </>
    );
}
export default NavBarWrapper;