import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Card, Button } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { Spots } from '/imports/api/spot/spot';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SpotItem from '/imports/ui/components/SpotItem';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready && this.props.ready2 && this.props.ready3)
        ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  verify(id) {
    // Meteor.users.update(id, { $set: { role: 'banned' } });
    /* eslint-disable-next-line */
    if (confirm("Are you sure you want to verify this user?")){
      const ProfileID = Profiles.findOne({ owner: Meteor.users.findOne(id).username })._id;
      Profiles.update(ProfileID, {
        $set: { role: 'verified' },
      });
    }
    this.forceUpdate();
    return true;
  }

  userify(id) {
    /* eslint-disable-next-line */
    if (confirm("Are you sure you want to remove this user's roles?\nNote: will not remove Admin role")){
      const ProfileID = Profiles.findOne({ owner: Meteor.users.findOne(id).username })._id;
      Profiles.update(ProfileID, {
        $set: { role: 'user' },
      });
    }
    this.forceUpdate();
    return true;
  }

  ban(id) {
    /* eslint-disable-next-line */
    if (confirm("Are you sure you want to ban this user?")){
      const ProfileID = Profiles.findOne({ owner: Meteor.users.findOne(id).username })._id;
      Profiles.update(ProfileID, {
        $set: { role: 'banned' },
      });
    }
    this.forceUpdate();
    return true;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    let profile = '';
    if (Profiles.find(this.props.name).fetch().length === 0) {
      profile = Profiles.findOne({ owner: Meteor.user().username });
    } else {
      profile = Profiles.findOne(this.props.name);
    }

    const account = Meteor.users.findOne({ username: profile.owner });
    let button = '';
    if (Meteor.user().username === profile.owner) {
      button = <Link to={`/editProfile/${profile._id}`}><Button>Edit Profile</Button></Link>;
    }
    let admin_ban = '';
    let admin_verify = '';
    // Meteor.users.allow({ // this statement is likely useless
    //   update: function (userId) {
    //     // only admin can insert
    //     const u = Meteor.users.findOne({ _id: userId });
    //     return (u.isAdmin);
    //   } });
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      // Meteor.users.allow({ // this if statement is likely useless
      //   update() {
      //   // Can only change your own documents.
      //   return true;
      //   },
      //
      //   fetch: ['owner'],
      // });
      if (Profiles.findOne({ owner: account.username }).role === 'banned') {
        admin_ban = <Button floated='right' onClick={() => { this.userify(account._id); }}>Unban</Button>;
      } else {
        admin_ban = <Button floated='right' onClick={() => { this.ban(account._id); }}>Ban</Button>;
      }
      if (Profiles.findOne({ owner: account.username }).role === 'verified') {
        admin_verify = <Button floated='right' onClick={() => { this.userify(account._id); }}>Unverify</Button>;
      } else {
        admin_verify = <Button floated='right' onClick={() => { this.verify(account._id); }}>Verify</Button>;
      }
    }
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>
            {profile.firstName}&nbsp;
          {profile.secondName}&#39;s Profile
          </Header>
          <br/>
          <Card fluid>
            <Card.Content>
              {admin_ban}{admin_verify}
              <Card.Header>
                <Image style={{ height: '150px' }} src={profile.image} />
                <br/>
                <br/>
                Status: {profile.status}
                <br/>
                <br/>
                Bio: {profile.bio}
                <br/>
                <br/>
                {button}
              </Card.Header>
            </Card.Content>
          </Card>
          <Container>
            <Header as="h3" textAlign="center" inverted>
              <br/>
              {profile.firstName}&nbsp;
            {profile.secondName}&#39;s Spots
            </Header>
            <Card.Group>
              {Spots.find({ owner: profile.owner }).fetch().map((spot) => <SpotItem key={spot._id} spot={spot} />)}
            </Card.Group>
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ProfilePage.propTypes = {
  name: PropTypes.string,
  // profiles: PropTypes.object.isRequired,
  // account: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
  ready3: PropTypes.bool.isRequired,
  // spots: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
// {this.props.profiles.firstName}
// profiles: Profiles.findOne({ owner: Meteor.users.find(documentId).username }),
// profiles: PropTypes.object,
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to Profile documents.
  const subscription = Meteor.subscribe('Profiles');
  const subscription2 = Meteor.subscribe('SpotAll');
  let subscription3a;
  let subscription3;
  if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
    subscription3a = Meteor.subscribe('userList');
    subscription3 = subscription3a.ready();
  } else {
    subscription3 = true;
  }

  // let profile = '';
  // if (Profiles.find(documentId).fetch().length === 0) {
  //   profile = Profiles.findOne({ owner: Meteor.user().username });
  // } else {
  //   profile = Profiles.findOne(documentId);
  // }
  // const account = Meteor.users.findOne({ username: profile.owner });
  return {
    name: documentId,
    ready: subscription.ready(),
    ready2: subscription2.ready(),
    ready3: subscription3,
    // profiles: Profiles.findOne({ owner: Meteor.users.findOne({ _id: documentId }).username }),
    // profiles: Profiles.findOne(documentId),
    // profiles: profile,
    // account: account,
    // spots: Spots.find({ owner: profile.owner }).fetch(),
  };
})(ProfilePage);
