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
    return (
        <Container>
          <Header as="h2" textAlign="center">The Spots</Header>
          {this.props.doc.firstName}
          {this.props.doc.secondName}
          <br/>
          <Image Style="height: 150px;" src={this.props.doc.Image} />
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfilePage.propTypes = {
  doc: PropTypes.object,
  profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker((match) => {
  const documentId = match.params._id;
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profiles');
  return {
    doc: Profiles.findOne({ owner: documentId }),
    ready: subscription.ready(),
  };
})(ProfilePage);
