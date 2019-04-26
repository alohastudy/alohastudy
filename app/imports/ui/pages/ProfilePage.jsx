import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Card } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { Spots } from '/imports/api/spot/spot';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SpotItem from '/imports/ui/components/SpotItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready && this.props.ready2) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // const profile = Profiles.findOne({ owner: this.props.username })
    return (
        <Container>
          <Header as="h2" textAlign="center">{this.props.profiles.firstName} {this.props.profiles.secondName}&#39;s Profile</Header>
          <br/>

          <Card fluid>
            <Card.Content>
              <Card.Header>
                <Image Style="height: 150px;" src={this.props.profiles.image} />
                <br/>
                <br/>
                Status: {this.props.profiles.status}
                <br/>
                <br/>
                Bio: {this.props.profiles.bio}
              </Card.Header>
            </Card.Content>
          </Card>
          <Container>
            <Header as="h3" textAlign="center">{this.props.profiles.firstName} {this.props.profiles.secondName}&#39;s Spots</Header>
            <Card.Group>
              {this.props.spots.map((spot) => <SpotItem key={spot._id} spot={spot} />)}
            </Card.Group>
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfilePage.propTypes = {
  name: PropTypes.string,
  profiles: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
  spots: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
// {this.props.profiles.firstName}
// profiles: Profiles.findOne({ owner: Meteor.users.find(documentId).username }),
// profiles: PropTypes.object,
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profiles');
  const subscription2 = Meteor.subscribe('SpotVerified');
  let profile = '';
  if (Profiles.find(documentId).fetch().length === 0) {
    profile = Profiles.findOne({ owner: Meteor.user().username });
  } else {
    profile = Profiles.findOne(documentId);
  }
  return {
    name: documentId,
    ready: subscription.ready(),
    ready2: subscription2.ready(),
    // profiles: Profiles.findOne({ owner: Meteor.users.findOne({ _id: documentId }).username }),
    // profiles: Profiles.findOne(documentId),
    profiles: profile,
    spots: Spots.find({ owner: profile.owner }).fetch(),
  };
})(ProfilePage);
