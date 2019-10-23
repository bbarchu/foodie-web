import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import { Route , Switch } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import ShopsPage from './ShopsPage';

function App(){

  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/shops" component={ShopsPage} />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
} 

export default App;