import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root')
);
