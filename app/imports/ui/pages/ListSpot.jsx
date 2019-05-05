import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Label, Header, Loader, Button, Input, Checkbox } from 'semantic-ui-react';
import { Spots } from '/imports/api/spot/spot';
import SpotItem from '/imports/ui/components/SpotItem';
import ListSpotsComponent from '/imports/ui/components/ListSpotsComponent';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListSpot extends React.Component {

  constructor(props) {
    super(props);
    this.inputtext = '';
    this.autoSearch = true;
    this.outdoors = true;
    this.indoors = true;
    this.noise0 = true;
    this.noise1 = true;
    this.noise2 = true;
    this.outlets0 = true;
    this.outlets1 = true;
    this.outlets2 = true;
    this.crowdedness0 = true;
    this.crowdedness1 = true;
    this.crowdedness2 = true;
    this.crowdedness3 = true;
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  handleMessage(e) {
    console.log(e.target);
    this.inputtext = e.target.value;
    this.trySearch();
    return true;
  }

  trySearch() {
    // call this function when autosearching would be done
    if (this.autoSearch) {
      this.forceUpdate();
    }
    return true;
  }

  handleSearch() {
    this.forceUpdate();
    return true;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <Container>
          <Input onChange={this.handleMessage.bind(this)} placeholder='message'/>
            <Button onClick={() => { this.handleSearch(); }}>Search</Button>
          <Label><Label>AutoSearch</Label>&nbsp;<Checkbox defaultChecked onClick={() => {
            this.autoSearch = !this.autoSearch;
            this.trySearch();
          }}
          /></Label>
          <br/><br/>

          <Label>
            <Label size="large" Style="background-color: silver;">Noise</Label>
            <Label>
              <Checkbox label="Quiet" defaultChecked onClick={() => { this.noise0 = !this.noise0; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Moderate" defaultChecked onClick={() => { this.noise1 = !this.noise1; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Noisy" defaultChecked onClick={() => { this.noise2 = !this.noise2; this.trySearch(); }} />
            </Label>
          </Label>

          <Label>
            <Label size="large" Style="background-color: silver;">Outlets</Label>
            <Label>
              <Checkbox label="None" defaultChecked onClick={() => { this.outlets0 = !this.outlets0; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Few" defaultChecked onClick={() => { this.outlets1 = !this.outlets1; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Many" defaultChecked onClick={() => { this.outlets2 = !this.outlets2; this.trySearch(); }} />
            </Label>
          </Label>

          <Label>
            <Label size="large" Style="background-color: silver;">Location</Label>
            <Label>
              <Checkbox label="Outdoors" defaultChecked onClick={() => { this.outdoors = !this.outdoors; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Indoors" defaultChecked onClick={() => { this.indoors = !this.indoors; this.trySearch(); }} />
            </Label>
          </Label>

          <Label>
            <Label size="large" Style="background-color: silver;">Crowdedness</Label>
            <Label>
              <Checkbox label="Empty" defaultChecked onClick={() => { this.crowdedness0 = !this.crowdedness0; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Partially Crowded" defaultChecked onClick={() => { this.crowdedness1 = !this.crowdedness1; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Half Full" defaultChecked onClick={() => { this.crowdedness2 = !this.crowdedness2; this.trySearch(); }} />
            </Label>
            <Label>
              <Checkbox label="Crowded" defaultChecked onClick={() => { this.crowdedness3 = !this.crowdedness3; this.trySearch(); }} />
            </Label>
          </Label>

          <Header as="h2" textAlign="center" inverted>The Spots</Header>
          <ListSpotsComponent query={this.inputtext}
                              outdoors={this.outdoors}
                              indoors={this.indoors}
                              noise0 = {this.noise0}
                              noise1 = {this.noise1}
                              noise2 = {this.noise2}
                              outlets0 = {this.outlets0}
                              outlets1 = {this.outlets1}
                              outlets2 = {this.outlets2}
                              crowd0 = {this.crowdedness0}
                              crowd1 = {this.crowdedness1}
                              crowd2 = {this.crowdedness2}
                              crowd3 = {this.crowdedness3}
          />
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListSpot.propTypes = {
  // query: PropTypes.string.isRequired,
  // spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // this.query = match.params._id;
  // const query = match.params._id;
  // console.log("params._id is "+match.params._id);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('SpotVerified');
  // let interspots = Spots.find({}).fetch();
  // if (Meteor.isServer) {
  //   Spots._ensureIndex({
  //     name: 'text',
  //   });
  // }
  // if (query !== 'undefined' && query !== undefined) {
  //   // console.log("searching for query, query found not to be undefined");
  //   interspots = Spots.find({ name: query }).fetch();
  //   // interspots = Spots.find({
  //   //   $text:
  //   //       {
  //   //         $search: 'benches',
  //   //       },
  //   // }).fetch();
  // }
  // console.log("query is " + query);
  return {
    // spots: interspots,
    ready: subscription.ready(),
    // query: query,
  };
})(ListSpot);
