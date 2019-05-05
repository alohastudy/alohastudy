import React from 'react';
import { Loader, Header, Container, Grid, Image, Segment, Card, Button, Feed } from 'semantic-ui-react';
import Rating from '/imports/ui/components/Rating';
import SpotAttributes from '/imports/ui/components/SpotAttributes';
import { Spots } from '/imports/api/spot/spot';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '/imports/api/profile/profile';
import { Comments } from '/imports/api/comment/comment';
import { Link } from 'react-router-dom';
import AddComment from '/imports/ui/components/AddComment';
import Comment from '/imports/ui/components/Comment';
import { Redirect } from 'react-router';
import { Roles } from 'meteor/alanning:roles';

/** Renders the Page for editing a single document. */
class SpotInfo extends React.Component {

  constructor(props) {
    super(props);
    this.redirect = '';
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready && this.props.ready2 && this.props.ready3) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  deleter() {
    /* eslint-disable-next-line */
    if (confirm("Are you sure you want to delete this spot?")) {
      Spots.remove(this.props.doc._id);
      this.redirect = <Redirect to={'/ListSpots/'}/>;
      this.forceUpdate();
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    let verifyButton = '';
    let deleteButton = '';
    if (this.props.doc.verified === true) {
      this.warning = '';
      verifyButton = <Button class="ui green basic button" floated='right' onClick={() => {
        Spots.update(this.props.doc._id, {
          $set: { verified: false },
        });
      }}>Unverify</Button>;
    } else {
      this.warning = <Segment inverted color='red'>UNVERIFIED</Segment>;
      verifyButton = <Button floated='right' onClick={() => {
        Spots.update(this.props.doc._id, {
          $set: { verified: true },
        });
      }}>Verify</Button>;
    }
    if (Meteor.user().username === this.props.doc.owner || Roles.userIsInRole(Meteor.userId(), 'admin')) {
      deleteButton = <Button floated='right' onClick={() => {
        this.deleter();
      }}>Delete</Button>;
    }
    const imageSmall = 'height: 175px;';
    const profile = Profiles.findOne({ owner: this.props.doc.owner });
    return (
        <Container>
          <br/>
          <Segment attached>
            {this.warning}
            {verifyButton}
            {this.props.doc.verified}
            {deleteButton}
            {this.redirect}
            <Grid>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Header size='huge'>{this.props.doc.name}<Rating rating={this.props.doc.rating}/></Header>
                  <div Style="margin-top: 40px;">
                    <SpotAttributes noisiness={this.props.doc.noisiness} outlets={this.props.doc.outlets} spotLocation={this.props.doc.location} crowd={this.props.doc.crowd}/>
                  </div>
                </Grid.Column>
                <Grid.Column width={4} floated='right'>
                  <Card floated='right'>
                    <Card.Content>
                      <Image floated='right' size='mini'
                             src={profile.image}/>
                      <Card.Header><Link to={`/profile/${profile._id}`}>{this.props.doc.owner}</Link></Card.Header>
                      <Card.Meta>Creator</Card.Meta>
                      <Card.Description>
                        {profile.status}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment attached>
            <Grid columns={2} centered celled="internally">
              <Grid.Row>
                <Grid.Column width={5} verticalAlign='middle'>
                  <Image src={this.props.doc.image1} fluid/>
                </Grid.Column>

                <Grid.Column width={11} Style="padding-left: 30px;">
                  <Segment>
                    {this.props.doc.description}
                  </Segment>
                  <Image.Group floated='left'>
                    <Image Style={imageSmall} src={this.props.doc.image2}/>
                    <Image Style={imageSmall} src={this.props.doc.image3}/>
                    <Image Style={imageSmall} src={this.props.doc.image4}/>
                    <Image Style={imageSmall} src={this.props.doc.image5}/>
                  </Image.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          <Segment>
            <Grid>
              <Grid.Column>
                <AddComment owner={Meteor.user().username} spotId={this.props.doc._id}/>
                <Feed>
                  {this.props.comments.map((comment, index) => <Comment key={index} comment={comment}/>)}
                </Feed>
              </Grid.Column>
            </Grid>
          </Segment>
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
SpotInfo.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
  ready3: PropTypes.bool.isRequired,
  comments: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.  3
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('SpotAll');
  const subscription2 = Meteor.subscribe('Profiles');
  const subscription3 = Meteor.subscribe('Comments');
  const docTemp = Spots.findOne(documentId)
  return {
    doc: docTemp,
    comments: Comments.find({ spot_id: docTemp._id }).fetch(),
    ready: subscription.ready(),
    ready2: subscription2.ready(),
    ready3: subscription3.ready(),
  };
})(SpotInfo);
