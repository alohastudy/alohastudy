import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SpotAttributes extends React.Component {

  render() {
    return (
        <div>
          {this.props.noisiness === 'Noisy' ? ('🔊 Noisy') : ('')}
          {this.props.noisiness === 'Moderate' ? ('🔉 Moderate') : ('')}
          {this.props.noisiness === 'Quiet' ? ('🔈 Quiet') : ('')}
          &nbsp;
          {this.props.outlets === 'None' ? ('🔋 No Outlet') : ('')}
          {this.props.outlets === 'Few' ? ('🔌 Few Outlets') : ('')}
          {this.props.outlets === 'Many' ? ('🔌 Many Outlets') : ('')}
          &nbsp;
          {this.props.location === 'outdoors' ? ('🌳 Outdoors') : ('🏚️ Indoors')}
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
SpotAttributes.propTypes = {
  noisiness: PropTypes.string.isRequired,
  outlets: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SpotAttributes);