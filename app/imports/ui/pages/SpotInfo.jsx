import React from 'react';
import { Loader, Header, Container, Grid, Image, Segment, Card } from 'semantic-ui-react';
import Rating from '/imports/ui/components/Rating';
import { Spots } from '/imports/api/spot/spot';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class SpotInfo extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, quantity, condition, _id } = data;
    Spots.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    const imageSmall = 'height: 175px;';
    return (
        <Container>
          <Segment>
                  <Header size='huge' attached='top'>{this.props.doc.name}<Rating rating={this.props.doc.rating}/></Header>
                  <Card floated='right'>
                    <Card.Content>
                      <Image floated='right' size='mini'
                             src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                      <Card.Header>{this.props.doc.owner}</Card.Header>
                      <Card.Meta>Friends of Elliot</Card.Meta>
                      <Card.Description>
                        Just trying to get around in the world
                      </Card.Description>
                    </Card.Content>
                  </Card>
          </Segment>
          <Segment attached>
            <Grid columns={2} centered celled="internally">
              <Grid.Row>
                <Grid.Column width={5} verticalAlign='middle'>
                  <Image src={this.props.doc.image1} fluid/>
                </Grid.Column>

                <Grid.Column width={11} Style="padding-left: 30px;">
                  <Segment>

                    <Card floated='right'>
                      <Card.Content>
                        <Image floated='right' size='mini'
                               src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                        <Card.Header>{this.props.doc.owner}</Card.Header>
                        <Card.Meta>Friends of Elliot</Card.Meta>
                        <Card.Description>
                          Just trying to get around in the world
                        </Card.Description>
                      </Card.Content>
                    </Card>
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
        </Container>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
SpotInfo.propTypes = {
  doc: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('SpotVerified');
  return {
    doc: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(SpotInfo);
