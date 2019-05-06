import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import SpotItem from '/imports/ui/components/SpotItem';
import { withRouter } from 'react-router-dom';
import { Spots } from '/imports/api/spot/spot';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ListSpotsComponent extends React.Component {

  render() {
    const location = [];
    const noisiness = [];
    const outlets = [];
    const crowd = [];
    if (this.props.outdoors) {
      location.push('outdoors');
    }
    if (this.props.indoors) {
      location.push('indoors');
    }
    if (this.props.noise0) {
      noisiness.push('Quiet');
    }
    if (this.props.noise1) {
      noisiness.push('Moderate');
    }
    if (this.props.noise2) {
      noisiness.push('Noisy');
    }
    if (this.props.outlets0) {
      outlets.push('None');
    }
    if (this.props.outlets1) {
      outlets.push('Few');
    }
    if (this.props.outlets2) {
      outlets.push('Many');
    }
    if (this.props.crowd0) {
      crowd.push('Empty');
    }
    if (this.props.crowd1) {
      crowd.push('Partially Full');
    }
    if (this.props.crowd2) {
      crowd.push('Half Full');
    }
    if (this.props.crowd3) {
      crowd.push('Crowded');
    }
    let interspots;
    if (this.props.query !== 'undefined' && this.props.query !== undefined && this.props.query !== '') {
      interspots = Spots.find({
        location: { $in: location },
        noisiness: { $in: noisiness },
        outlets: { $in: outlets },
        crowd: { $in: crowd },
        verified: true,
        name: this.props.query,
      }).fetch();
    } else {
      interspots = Spots.find({
        location: { $in: location },
        noisiness: { $in: noisiness },
        outlets: { $in: outlets },
        crowd: { $in: crowd },
        verified: true,
      }).fetch();
    }
    return (
        <Card.Group>
          {interspots.map((spot) => <SpotItem key={spot._id} spot={spot} />)}
        </Card.Group>
    );
  }
}

/** Require a document to be passed to this component. */
ListSpotsComponent.propTypes = {
  query: PropTypes.string.isRequired,
  outdoors: PropTypes.bool,
  indoors: PropTypes.bool,
  noise0: PropTypes.bool,
  noise1: PropTypes.bool,
  noise2: PropTypes.bool,
  outlets0: PropTypes.bool,
  outlets1: PropTypes.bool,
  outlets2: PropTypes.bool,
  crowd0: PropTypes.bool,
  crowd1: PropTypes.bool,
  crowd2: PropTypes.bool,
  crowd3: PropTypes.bool,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ListSpotsComponent);
