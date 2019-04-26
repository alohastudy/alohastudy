import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // const profile = Profiles.findOne({ owner: this.props.username })
    return (
        <Container>
          <Header as="h2" textAlign="center">The Spots {this.props.name}</Header>
          <br/>
          profile: {this.props.profiles.bio}
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfilePage.propTypes = {
  name: PropTypes.string,
  profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
// {this.props.profiles.firstName}
// profiles: Profiles.findOne({ owner: Meteor.users.find(documentId).username }),
// profiles: PropTypes.object,
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profiles');
  console.log('wow');
  console.log(Profiles.find(documentId).fetch().length === 0);
  console.log('wow again');
  let profile = '';
  if (Profiles.find(documentId).fetch().length === 0) {
    profile = Profiles.findOne({ owner: Meteor.user().username });
  } else {
    profile = Profiles.findOne(documentId);
  }
  return {
    name: documentId,
    ready: subscription.ready(),
    // profiles: Profiles.findOne({ owner: Meteor.users.findOne({ _id: documentId }).username }),
    // profiles: Profiles.findOne(documentId),
    profiles: profile,
  };
})(ProfilePage);
