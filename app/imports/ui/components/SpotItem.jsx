import React from 'react';
import { Button, Card, Image, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Rating from '/imports/ui/components/Rating';
import SpotAttributes from '/imports/ui/components/SpotAttributes';
import { Meteor } from "meteor/meteor";

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SpotItem extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.spot.verified === true) {
      this.color = 'green';
      this.warning = '';
    } else {
      this.color = 'red';
      this.warning = <Segment inverted color='red'>UNVERIFIED</Segment>;
    }
    if (this.props.spot.owner === Meteor.user().username) {
      this.button = <Link to={`/edit/${this.props.spot._id}`}>
        <button class="ui green basic button" size='large'>
          Edit
        </button>
      </Link>
    }
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      this.button = <Link to={`/edit/${this.props.spot._id}`}>
        <button class="ui green basic button" size='large'>
          Edit
        </button>
      </Link>
    }
  }

  render() {
    return (
        <Card color={this.color} fluid>
          <Card.Content>
            <Card.Header>{this.warning}<Link to={`/view/${this.props.spot._id}`}>{this.props.spot.name}</Link>&nbsp;<Rating rating={this.props.spot.rating}/>
            </Card.Header>
            <Card.Meta>Created by {this.props.spot.owner}</Card.Meta>
            <SpotAttributes noisiness={this.props.spot.noisiness} outlets={this.props.spot.outlets} location={this.props.spot.location}/>
            <br/>
            {this.button}
            <br/>
            <Image.Group fluid floated='left'>
              <Image Style="height: 150px;" src={this.props.spot.image1} />
              <Image Style="height: 150px;" src={this.props.spot.image2} />
              <Image Style="height: 150px;" src={this.props.spot.image3} />
              <Image Style="height: 150px;" src={this.props.spot.image4} />
              <Image Style="height: 150px;" src={this.props.spot.image5} />
            </Image.Group>
            <Card.Description>{this.props.spot.description}</Card.Description>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
SpotItem.propTypes = {
  spot: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SpotItem);
