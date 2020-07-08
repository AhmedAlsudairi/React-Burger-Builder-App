import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
class App extends Component {
  render() {
    return (
      <div >

        <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/checkout' component={CheckOut}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/auth' component={Auth}/>
            <Route path='/' exact component={BurgerBuilder}/>
         
          </Switch>
         
        </Layout>
        </BrowserRouter>
        
       

       
      </div>
    );
  }
}

export default App;
