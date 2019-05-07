import React from 'react';
import { Spots, SpotSchema } from '/imports/api/spot/spot';
import { Grid, Segment, Header, Loader } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Profiles } from '/imports/api/profile/profile';
import { Redirect } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddSpot extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
    this.verify = false;
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      this.verify = true;
    }
    if (Profiles.findOne({ owner: Meteor.user().username }).role === 'verified') {
      this.verify = true;
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, image1, image2, image3, image4, image5, description, rating, verified, outlets, noisiness, location, crowd } = data;
    const owner = Meteor.user().username;
    Spots.insert({ name, image1, image2, image3, image4, image5, description, rating, verified, outlets, noisiness, location, crowd, owner }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  /** Render the page once subscriptions have been received. */
  renderPage() {
    if (Profiles.findOne({ owner: Meteor.user().username }).role === 'banned') {
      return <Redirect to={'/banned/'}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Spots</Header>
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={SpotSchema} onSubmit={this.submit}>
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
                <HiddenField name='rating' value={0}/>
                <HiddenField name='verified' value={this.verify}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

// export default AddSpot;
/** Require an array of Stuff documents in the props. */
AddSpot.propTypes = {
  // query: PropTypes.string.isRequired,
  // spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('Profiles');

  return {
    ready: subscription.ready(),
  };
})(AddSpot);