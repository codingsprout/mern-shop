import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import { getStartingData, userLoggedIn } from './action/Action';
import './App.css';
import PrivateRoute from './components/HOC/PrivateRoute';
import Category from './pages/Category/Category';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Orders from './pages/Orders/Orders';
import Register from './pages/Register/Register';
import Service from './pages/Services/Service';


function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {

    if (!auth.authenticate) { 
      dispatch(userLoggedIn()) 
    } dispatch(getStartingData())
  }, [])

  return (
    <div className="App">
        <Switch>

          <PrivateRoute path='/' exact component={Home} />
          <PrivateRoute path='/services' component={Service} />
          <PrivateRoute path='/orders' component={Orders} />
          <PrivateRoute path='/category' component={Category} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

        </Switch>
    </div>
  );
}

export default App;
