import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums';
import Album from './components/Album';
import Artists from './components/Artists';
import Artist from './components/Artist';

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path='/' component={AppContainer}>
  		<IndexRedirect to="/albums" />
	  	<Route path='/albums' component={Albums} />
	  	<Route path='/albums/:albumId' component={Album} />
	  	<Route path='/artists' component={Artists} />
	  	<Route path='/artists/:artistId' component={Artist} />
	  	<Route path='/artists/:artistId/albums' component={Artist} />
	  	<Route path='/artists/:artistId/songs' component={Artist} />
    </Route>
  </Router>,
  document.getElementById('app')
);
