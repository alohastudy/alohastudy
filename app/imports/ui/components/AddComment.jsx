import React from 'react';
import { Comments, CommentSchema } from '/imports/api/comment/comment';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import { Profiles } from '/imports/api/profile/profile';
import PropTypes from 'prop-types';
import { Meteor } from "meteor/meteor";

/** Renders the Page for adding a document. */
class AddComment extends React.Component {

  /** Bind 'this' so that a ref to the Form can be saved in formRef and communicated between render() and submit(). */
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.insertCallback = this.insertCallback.bind(this);
    this.formRef = null;
  }

  /** Notify the user of the results of the submit. If successful, clear the form. */
  insertCallback(error) {
    if (error) {
      Bert.alert({ type: 'danger', message: `Add Comment failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add Comment succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { comment, owner, firstName, secondName, image, spot_id, createdAt } = data;
    Comments.insert({ comment, owner, firstName, secondName, image, spot_id, createdAt }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    console.log(this.props.owner);
    const userProfile = Profiles.findOne({ owner: this.props.owner });
    return (
        <AutoForm ref={(ref) => { this.formRef = ref; }} schema={CommentSchema} onSubmit={this.submit}>
          <Segment>
            <TextField label="Add a timestamped comment" name='comment'/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
            <HiddenField name='owner' value={this.props.owner}/>
            <HiddenField name='firstName' value={userProfile.firstName}/>
            <HiddenField name='secondName' value={userProfile.secondName}/>
            <HiddenField name='image' value={userProfile.image}/>
            <HiddenField name='spot_id' value={this.props.spotId}/>
            <HiddenField name='createdAt' value={new Date()}/>
          </Segment>
        </AutoForm>
    );
  }
}

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
  spotId: PropTypes.string.isRequired,
};

export default AddComment;
