import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import axios from "axios";
import App from "./App";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.withCredentials = true;


root.render(
    <Router>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Router>
);