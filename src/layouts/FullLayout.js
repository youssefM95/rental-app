import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useLocation } from "react-router-dom";

const FullLayout = () => {
  const noNavBarPaths = ['/login','/register'];
    const location = useLocation();
  return (
    <main>
      {/********header**********/}
      {!noNavBarPaths.includes(location.pathname) &&
      <Header />
        }
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        {!noNavBarPaths.includes(location.pathname) &&
        (
          <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        )}
        
        {/********Content Area**********/}
        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
