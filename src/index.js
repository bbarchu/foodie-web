import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { BrowserRouter as Router} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root')
);
