import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { useAxiosSetup } from "./api/axiosSetup";
import GlobalSpinner from './api//GlobalSpinner'; 

const App = () => {
  useAxiosSetup();
  const routing = useRoutes(Themeroutes);

  return (
    <div className="dark">
    <GlobalSpinner />
    {routing}
  </div>
  );
};

export default App;
