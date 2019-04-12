import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Spots } from '/imports/api/spot/spot';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SpotItem from '/imports/ui/components/SpotItem';

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
    return (
        <SpotItem model={this.this.props.doc} />
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
SpotInfo.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Spot');
  return {
    doc: Spots.findOne(documentId),
    ready: subscription.ready(),
  };
})(SpotInfo);
