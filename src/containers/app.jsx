import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {MyFavorites} from '../components/my-favorites';
import {Research} from '../components/research';
import {NavBar} from '../components/nav-bar';


import {fetchAlbums, fetchFavoriteAlbums, findFavoriteAlbums, addToFavorites, removeFromFavorites} from '../actions';

// Component Layout which wrap the application and initialize list of albums and favorites
class Layout extends Component {

  componentWillMount() {
    this.props.fetchFavoriteAlbums()          // Fetch albums from the previous search
      .then(() => this.props.fetchAlbums());  // Fetch albums from favorites
  }

  render() {
    return (
      <div>
        <NavBar />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

// Main component of the application
class App extends Component {

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Layout {...this.props}>
            <Switch>
              <Route exact path='/' render={() => (<Redirect to='/research'/>)}/>
              <Route path='/research' render={() => <Research {...this.props}/>}/>
              <Route path='/my-favorites' render={() => <MyFavorites {...this.props}/>}/>
            </Switch>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    albums: state.albums,
    favoriteAlbums: state.favoriteAlbums
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchAlbums: filter => dispatch(fetchAlbums(filter)),
    fetchFavoriteAlbums: () => dispatch(fetchFavoriteAlbums()),
    findFavoriteAlbums: filter => dispatch(findFavoriteAlbums(filter)),
    addToFavorites: album => dispatch(addToFavorites(album)),
    removeFromFavorites: album => dispatch(removeFromFavorites(album))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
