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
import ProductPage from './ProductPage';
import UsersPage from './UsersPage';
import LoginPage from './LoginPage'; 
import ManageUserPage from './ManageUserPage';
import ManageProductPage from './ManageProductPage';

function App(){

  return (
    <div className="container-fluid">
      <ToastContainer autoClose={4000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/shops" component={ShopsPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/shop/:slug" component={ProductPage} />
        <Route path="/add-shop" component={ManageUserPage} />
        <Route path="/add-user" component={ManageShopPage}/>
        <Route path="/add-product" component={ManageProductPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
} 

export default App;