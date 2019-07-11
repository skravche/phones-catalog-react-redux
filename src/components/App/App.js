import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductList from '../ProductListView';
import Product from '../ProductView';
import Navbar from './../Navbar/Navbar';
// import Cart from './../Cart/Cart';

import '../App/App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Navbar />
          <Switch>
            <Route path="/" component={ProductList} exact />
            <Route path="/:product" component={Product} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
