import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path='/' component={AppContainer}>
	  	{/* route children will go here 
	    	The components that these child routes render will be the "children" 
	    	of the component that the parent route renders!*/}
    </Route>
  </Router>,
  document.getElementById('app')
);
