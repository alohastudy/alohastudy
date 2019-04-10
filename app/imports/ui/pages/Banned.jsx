import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Banned extends React.Component {
  render() {
    return (
      <Header as="h2" textAlign="center">
        <p>You have been banned and are restricted from this action</p>
      </Header>
    );
  }
}
