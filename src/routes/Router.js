import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Properties = lazy(() => import("../views/ui/Properties"));
const MyProperties = lazy(() => import("../views/ui/Profil/Properties.js"));
const NewPrperty = lazy(() => import("../views/ui/NewProperty.js"));
const Property = lazy(() => import("../views/ui/Property"));
const Login = lazy(() => import("../views/ui/Login.js"));
const Register = lazy(() => import("../views/ui/Register.js"));
const MyReservations = lazy(() => import("../views/ui/MyReservations.js"));
const MyReservationsRequest = lazy(() => import("../views/ui/Profil/MyReservationsRequest.js"));
const PropertyDetails = lazy(() => import("../views/ui/PropertyDetails.js"));

/*****Routes******/



const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true,element: <Navigate to="/properties" /> },
      {path :"/login", exact : true, element : <Login/>},
      {path :"/register", exact : true, element : <Register/>},
      { path: "/properties", exact: true, element:<PrivateRoute element={<Properties />}/> },
      { path: "/myproperties", exact: true, element:<PrivateRoute element={<MyProperties />}/> },
      { path: "/myproperties/new", exact: true, element: <NewPrperty /> },
      {path : "/myproperties/property/:id", exact: true,element: <PrivateRoute element={<Property />} />},
      {path : "/myreservations", exact: true,element: <PrivateRoute element={<MyReservations />} />},
      {path : "/myreservationsrequest", exact: true,element: <PrivateRoute element={<MyReservationsRequest />} />},
      {path : "/propertyDetails/:id", exact: true,element: <PrivateRoute element={<PropertyDetails />} />}


    ],
  },
];

export default ThemeRoutes;
