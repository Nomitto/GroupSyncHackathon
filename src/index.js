import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";

import SignIn from "./view/signin";

const API_KEY = "AIzaSyBqy78XyR_vlenpR9IxSbrW_QNAPxq2jPI";
const CLIENT_ID =
  "357613363605-s18klentru09gkgdjcqeo8q1k57r1hi1.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1080175149803-4j3oumj4pvbp8g0d1l2rm5pn18k71nnv.apps.googleusercontent.com">
      <SignIn />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
