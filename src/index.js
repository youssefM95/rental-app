import React, { Suspense } from "react";
import {createRoot} from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { LoadingProvider } from "./api/LoadingContext";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={<Loader />}>
    <Router>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </Router>
  </Suspense>
);


