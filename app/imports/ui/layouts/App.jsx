import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListSpot from '../pages/ListSpot';
import ListSpotAdmin from '../pages/ListSpotAdmin';
import AddSpot from '../pages/AddSpot';
import EditSpot from '../pages/EditSpot';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Banned from '../pages/Banned';
import SpotInfo from '../pages/SpotInfo';
import ProfilePage from '../pages/ProfilePage';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div Style='background-color: #36AA48'>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/listSpots" component={ListSpot}/>
              <ProtectedRoute path="/addSpots" component={AddSpot}/>
              <ProtectedRoute path="/edit/:_id" component={EditSpot}/>
              <ProtectedRoute path="/view/:_id" component={SpotInfo}/>
              <ProtectedRoute path="/profile/:_id" component={ProfilePage}/>
              <AdminProtectedRoute path="/adminSpots" component={ListSpotAdmin}/>
              <Route path="/signout" component={Signout}/>
              <Route path="/banned" component={Banned}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and not banned before routing to the requested page, otherwise goes to
 * signin page if not logged in or banned page if banned.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isBanned = Roles.userIsInRole(Meteor.userId(), 'banned');
          if (isBanned) {
            return <Redirect to={{ pathname: '/banned', state: { from: props.location } }}/>;
          }
          if (isLogged) {
            return <Component {...props} />;
          }
          return <Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>;
        }}
    />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
