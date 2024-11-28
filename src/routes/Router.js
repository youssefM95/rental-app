import { lazy } from "react";
import { Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Properties = lazy(() => import("../views/ui/Properties"));
const MyProperties = lazy(() => import("../views/ui/Profil/Properties.js"));
const NewPrperty = lazy(() => import("../views/ui/Profil/NewProperty.js"));
const Property = lazy(() => import("../views/ui/Property"));
const Login = lazy(() => import("../views/ui/Login.js"));
const Register = lazy(() => import("../views/ui/Register.js"));
const MyReservations = lazy(() => import("../views/ui/Reservations.js"));
const MyReservationsRequest = lazy(() => import("../views/ui/Profil/Reservations.js"));
const PropertyDetails = lazy(() => import("../views/ui/PropertyDetails.js"));
const SuccessPayment = lazy(() => import("../components/payment/Success.js"));
const Payments = lazy(() => import("../components/payment/Payments.js"));
const MyPaymentsRequest = lazy(() => import("../views/ui/Profil/Payments.js"));

/*****Routes******/
const stripePromise =
loadStripe('pk_test_51QPp1fLisSexoJvO3WjwyIsGkDVDEYgiv35jWEIDS3YDbak2w8hsiIKXAP0Ge36aoWfPqhOulyPmeF7y5tw3D9JI00ylbet3Iw');

const HomeRedirect = () => {
  const isAuthenticated = Boolean(localStorage.getItem('userToken'));
  return isAuthenticated ? <Navigate to="/properties" /> : <Navigate to="/login" />;
};

const ThemeRoutes = [
  {
    path: "/",
    element:<FullLayout />,
    children: [
      { path: "/", exact: true,element: <HomeRedirect /> },
      {path :"/login", exact : true, element : <Login/>},
      {path :"/register", exact : true, element : <Register/>},
      { path: "/properties", exact: true, element:<PrivateRoute element={<Properties />}/> },
      { path: "/profil/properties", exact: true, element:<PrivateRoute element={<MyProperties />}/> },
      { path: "/profil/properties/new", exact: true, element:<PrivateRoute element={<NewPrperty />} /> },
      {path : "/profil/properties/property/:id", exact: true,element: <PrivateRoute element={<Property />} />},
      {
        path: "/myreservations",
        exact: true,
        element: (
          <Elements stripe={stripePromise}>
            <PrivateRoute element={<MyReservations />} />
          </Elements>
        ),
      },
      {path : "/profil/reservations", exact: true, element: (
        <Elements stripe={stripePromise}>
          <PrivateRoute element={<MyReservationsRequest />} />
        </Elements>
      )},
      {path : "/propertyDetails/:id", exact: true,element: <PrivateRoute element={<PropertyDetails />} />},
      {path : "/payments", exact: true,element: <PrivateRoute element={<Payments />} />},
      {path : "/profil/payments", exact: true,element: <PrivateRoute element={<MyPaymentsRequest />} />},
      {path : "/payment/success/:id", exact: true,element: <PrivateRoute element={<SuccessPayment />} />}


    ],
  },
];

export default ThemeRoutes;
