import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Spots, SpotSchema } from '/imports/api/spot/spot';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditSpot extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, image1, image2, image3, image4, image5, description, rating, verified, outlets, noisiness, location, crowd, _id  } = data;
    Spots.update(_id, { $set: { name, image1, image2, image3, image4, image5, description, rating, verified, outlets, noisiness, location, crowd } }, (error) => (error ?
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
        <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center" inverted>Edit Spot</Header>
          <AutoForm schema={SpotSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <TextField name='description'/>
                <TextField name='image1'/>
                <TextField name='image2'/>
                <TextField name='image3'/>
                <TextField name='image4'/>
                <TextField name='image5'/>
                <SelectField placeholder='hello' name='outlets'/>
                <SelectField name='noisiness'/>
                <SelectField name='location'/>
                <SelectField name='crowd'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
                <HiddenField name='rating' value={this.props.doc.rating}/>
                <HiddenField name='verified' value={this.verify}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>

    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditSpot.propTypes = {
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
})(EditSpot);
