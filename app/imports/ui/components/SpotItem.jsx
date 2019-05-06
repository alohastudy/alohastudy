import React from 'react';
import { Card, Image, Segment, Button } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Rating from '/imports/ui/components/Rating';
import SpotAttributes from '/imports/ui/components/SpotAttributes';
import { Profiles } from '/imports/api/profile/profile';

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
    this.editbutton = '';
    if (this.props.spot.owner === Meteor.user().username || Roles.userIsInRole(Meteor.userId(), 'admin')) {
      this.editbutton = <div><Link to={`/edit/${this.props.spot._id}`}>
        <Button color="green" size='large' floated='right'>
          Edit
        </Button>
      </Link></div>;
    }
  }

  render() {
    const username = Profiles.findOne({ owner: this.props.spot.owner })._id;
    // const username = 'EHyoj69x5WSutxPak';
    return (
        <Card color={this.color} fluid>
          <Card.Content>
            <Card.Header>
              {this.warning}
              {this.editbutton}
              <Link to={`/view/${this.props.spot._id}`}>{this.props.spot.name}&nbsp;<Rating rating={this.props.spot.rating}/></Link>

            </Card.Header>
            <Card.Meta>Created by {this.props.spot.owner}, <Link to={`/profile/${username}`}>profile</Link></Card.Meta>
            <SpotAttributes noisiness={this.props.spot.noisiness} outlets={this.props.spot.outlets}
                            spotLocation={this.props.spot.location} crowd={this.props.spot.crowd} />
            <br/>

            <br/>
            <Image.Group fluid floated='left'>
              <Image Style="height: 150px;" src={this.props.spot.image1}/>
              <Image Style="height: 150px;" src={this.props.spot.image2}/>
              <Image Style="height: 150px;" src={this.props.spot.image3}/>
              <Image Style="height: 150px;" src={this.props.spot.image4}/>
              <Image Style="height: 150px;" src={this.props.spot.image5}/>
            </Image.Group>
            <Card.Description><p>{this.props.spot.description}</p></Card.Description>
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
