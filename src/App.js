import React, { Component } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import logo from './logo.svg';
import './App.css';
import theme from "./theme";
import store from "./store";
//import SideDrawer from "./Layout/SideDrawer/SideDrawer";

class App extends Component {
  
  
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
