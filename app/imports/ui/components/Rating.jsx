import React from 'react';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Rating extends React.Component {

  render() {
    return (
        <Label basic>
          {this.props.rating > 4 ? (<div><Icon name='star' color='yellow'/>
          <Icon name='star' color='yellow'/><Icon name='star' color='yellow'/><Icon name='star' color='yellow'/>
          <Icon name='star' color='yellow'/></div>) : ('')}
          {this.props.rating > 3 && this.props.rating <= 4 ? (<div><Icon name='star' color='yellow'/>
          <Icon name='star' color='yellow'/><Icon name='star' color='yellow'/>
            <Icon name='star' color='yellow'/><Icon name='star outline' color='yellow'/></div>) : ('')}
          {this.props.rating > 2 && this.props.rating <= 3 ? (<div><Icon name='star' color='yellow'/>
          <Icon name='star' color='yellow'/><Icon name='star' color='yellow'/>
          <Icon name='star outline' color='yellow'/><Icon name='star outline' color='yellow'/>
            </div>) : ('')}
          {this.props.rating > 1 && this.props.rating <= 2 ? (<div><Icon name='star' color='yellow'/>
            <Icon name='star' color='yellow'/><Icon name='star outline' color='yellow'/>
            <Icon name='star outline' color='yellow'/>
            <Icon name='star outline' color='yellow'/>
          </div>) : ('')}
          {this.props.rating <= 1 && this.props.rating > 0 ? (<div><Icon name='star' color='yellow'/><Icon name='star outline' color='yellow'/>
          <Icon name='star outline' color='yellow'/>
            <Icon name='star outline' color='yellow'/><Icon name='star outline' color='yellow'/></div>) : ('')}
          {this.props.rating === 0 ? (<div><Icon name='star outline' color='grey'/><Icon name='star outline' color='grey'/>
            <Icon name='star outline' color='grey'/><Icon name='star outline' color='grey'/>
            <Icon name='star outline' color='grey'/></div>) : ('')}
        </Label>
    );
  }
}

/** Require a document to be passed to this component. */
Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Rating);
