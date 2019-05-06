import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Profiles } from '/imports/api/profile/profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserItem extends React.Component {
  constructor(props) {
    super(props);
    this.color = 'blue';
    this.username = Profiles.findOne({ owner: this.props.user.owner });
    this.status = this.username.role;
    if (Profiles.findOne({ owner: this.props.user.owner }).role === 'admin') {
      this.color = 'black';
    }
    if (Roles.userIsInRole(Meteor.userId(), 'verified')) {
      this.color = 'blue';
    }
    if (Roles.userIsInRole(Meteor.userId(), 'banned')) {
      this.color = 'red';
    }
  }

  render() {
    // const username = Profiles.find({ _id })._id;
    return (
        <Card color={this.color} fluid as={NavLink} exact to={`/profile/${this.username._id}`}>
          <Card.Content>
            <Image floated='right' src={this.props.user.image} size="tiny"/>
            <Card.Header>
              {this.props.user.firstName}
              &nbsp;
              {this.props.user.secondName}
            </Card.Header>
            <Card.Meta>
              {this.props.user.owner}
              <br/><br/>
              Status: {this.status}
            </Card.Meta>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserItem);
