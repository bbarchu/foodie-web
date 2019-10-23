import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import { Route , Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ShopsPage from './ShopsPage';
import ManageShopPage from './ManageShopPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App(){

  return (
    <div className="container-fluid">
      <ToastContainer autoClose={4000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/shops" component={ShopsPage} />
        <Route path="/shop/:slug" component={ManageShopPage} />
        <Route path="/shop" component={ManageShopPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
} 

export default App;