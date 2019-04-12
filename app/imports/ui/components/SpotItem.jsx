import React from 'react';
import { Card, Image, Segment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Rating from '/imports/ui/components/Rating';

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
  }

  render() {
    return (
        <Card color={this.color} fluid>
          <Card.Content>
            <Card.Header>{this.warning}<Link to={`/view/${this.props.spot._id}`}>{this.props.spot.name}</Link>&nbsp;<Rating rating={this.props.spot.rating}/>
            </Card.Header>
            <Card.Meta>Created by {this.props.spot.owner}</Card.Meta>
            {this.props.spot.noisiness === 'Noisy' ? ('🔊 Noisy') : ('')}
            {this.props.spot.noisiness === 'Moderate' ? ('🔉 Moderate') : ('')}
            {this.props.spot.noisiness === 'Quiet' ? ('🔈 Quiet') : ('')}
            &nbsp;
            {this.props.spot.outlets === 'None' ? ('🔋 No Outlet') : ('')}
            {this.props.spot.outlets === 'Few' ? ('🔌 Few Outlets') : ('')}
            {this.props.spot.outlets === 'Many' ? ('🔌 Many Outlets') : ('')}
            &nbsp;
            {this.props.spot.location === 'outdoors' ? ('🌳 Outdoors') : ('🏚️ Indoors')}
            <br/>
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
