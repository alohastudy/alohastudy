import React from 'react';
import { Notes, NoteSchema } from '/imports/api/note/note';
import { Segment } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';
import PropTypes from 'prop-types';

/** Renders the Page for adding a document. */
class AddNote extends React.Component {

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
      Bert.alert({ type: 'danger', message: `Add Note failed: ${error.message}` });
    } else {
      Bert.alert({ type: 'success', message: 'Add Note succeeded' });
      this.formRef.reset();
    }
  }

  /** On submit, insert the data. */
  submit(data) {
    const { note, owner, contactId, createdAt } = data;
    Notes.insert({ note, owner, contactId, createdAt }, this.insertCallback);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
            <AutoForm ref={(ref) => { this.formRef = ref; }} schema={NoteSchema} onSubmit={this.submit}>
              <Segment>
                <TextField label="Add a timestamped note" name='note'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='contactId' value={this.props.contactId}/>
                <HiddenField name='createdAt' value={new Date()}/>
              </Segment>
            </AutoForm>
    );
  }
}

AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
};

export default AddNote;
