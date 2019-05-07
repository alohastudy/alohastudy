import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SpotItemSmall extends React.Component {
  render() {
    return (
      <Feed.Event>
        <Feed.Label image={this.props.spot.image1} />
        <Feed.Content>
          <Link to={`/view/${this.props.spot._id}`}>
            <Feed.Summary>
              {this.props.spot.name}
            </Feed.Summary>
          </Link>
          <Feed.Label>{this.props.spot.description}</Feed.Label>
        </Feed.Content>
      </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
SpotItemSmall.propTypes = {
  spot: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SpotItemSmall);
