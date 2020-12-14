import React from 'react';
import Map from './containers/Map';
import Profile from './containers/Profile';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Route exact path="/" component={Profile} />
      <Route path="/map" component={Map} />
    </>
  )
}

export default App;