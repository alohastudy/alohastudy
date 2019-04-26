import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Loader } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const subscription = Meteor.subscribe('Profiles');
    return (subscription.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const menuStyle = { marginBottom: '10px' };
    const itemStyle = { marginTop: 'auto', fontSize: '25px', fontFamily: 'Righteous, cursive' };
    // const profileID = Profiles.findOne({ owner: 'john@foo.com' })._id;
    // const profileID = 'YEWw8gagcdJQrqRZc';
    const profileID = 'myProfile';
    return (
      <Menu style={menuStyle} size='massive' attached='top' borderless inverted Style='background-color: #0ed145'>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Righteous');
        </style>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Image size='medium' src='/images/logo10.png'/>
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/addSpots" key='addSpots' style={itemStyle}>Add Spots</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/listSpots" key='listSpots' style={itemStyle}>List Spots</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin' style={itemStyle}>
              Admin
            </Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/adminSpots" key='adminSpots' style={itemStyle}>
              Admin Spots
            </Menu.Item>]
        ) : ''}
        <Menu.Item position="right" style={itemStyle}>
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="user" text="view profile" as={NavLink} exact to={`/profile/${profileID}`}/>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  profile: PropTypes.object,
  // profileID: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  // profileID: Profiles.findOne({ owner: 'john@foo.com' })._id,
  // profileID: Profiles.findOne()._id,
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
