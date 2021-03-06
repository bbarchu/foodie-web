import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import { Route , Switch, withRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ShopsPage from './ShopsPage';
import ShopsMap from './ShopsMap';
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
import DeliveriesMap from './DeliveriesMap';
import Balance from './Balance';
import ManageSuscription from './ManageSuscription';
import StatsPage from './StatsPage';
import OrdersPage from './OrdersPage';
import RulesPage from './RulesPage';

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
        <Route path="/shops_map" component={ShopsMap} />
        <Route path="/users" component={UsersPage} />
        <Route path="/deliveries_status" component={DeliveriesStatusPage} />
        <Route path="/deliveries_map" component={DeliveriesMap} />
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
        <Route path="/orders" component={OrdersPage}/>
        <Route path="/rules" component={RulesPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
} 

export default App;