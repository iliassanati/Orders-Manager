import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import OrderState from './context/order/OrderState';

const App = () => {
  useEffect(() => {
    // init materialize JS
    M.AutoInit();
  });

  return (
    <OrderState>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </OrderState>
  );
};

export default App;
