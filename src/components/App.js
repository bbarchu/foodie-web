import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import { Route , Switch, withRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ShopsPage from './ShopsPage';
import ManageShopPage from './ManageShopPage';
import { ToastContainer } from 'react-toastify';
import ProductPage from './ProductPage';
import UsersPage from './UsersPage';
import ManageUserPage from './ManageUserPage';
import ManageProductPage from './ManageProductPage';
import EditShop from './EditShop';
import EditProduct from './EditProduct';
import EditUser from './EditUser';
import LoginPage from './LoginPage';
import DeliveriesStatusPage from './DeliveriesStatusPage';
import Balance from './Balance';
import ManageSuscription from './ManageSuscription';
import StatsPage from './StatsPage';

function App(){
  const HeaderWithRouter = withRouter(props => <Header {...props}/>);
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={4000} hideProgressBar />
     
      

      <HeaderWithRouter />
      
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/shops" component={ShopsPage} />
        <Route path="/users" component={UsersPage} />
        <Route path="/deliveries_status" component={DeliveriesStatusPage} />
        <Route path="/shop/:slug" component={ProductPage} />
        <Route path="/add-shop" component={ManageShopPage} />
        <Route path="/add-user" component={ManageUserPage}/>
        <Route path="/add-product" component={ManageProductPage}/>
        <Route path="/editar-shop/:slug" component={EditShop}/>
        <Route path="/editar-user/:slug" component={EditUser}/>
        <Route path="/editar-producto/:slug" component={EditProduct}/>
        <Route path="/balance" component={Balance}/>
        <Route path="/suscription" component={ManageSuscription}/>
        <Route path="/stats" component={StatsPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
} 

export default App;