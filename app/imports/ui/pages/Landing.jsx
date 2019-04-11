import React from 'react';
import { Grid, Card, Feed, List } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='img-background'>
          <Grid verticalAlign='top' textAlign='left' padded container centered>

            <Grid.Column width={9}>
              <Card centered fluid>
                <Card.Content>
                  <h1>Welcome to Aloha Study!</h1>
                  <p>designed to provide students a listing of hidden study spots. In this site, you will be provided a
                    listing with ratings, hours, capacity, accessibility, and capabilities of each study spot. It will
                    also include a feature allowing students to give real-time feedback if it’s either used or not used
                    with a timestamp.</p>
                  <h1>How to use this site:</h1>
                  <List bulleted>
                    <List.Item>Go to spots page to view spots </List.Item>
                    <List.Item>Go to spots page to view spots </List.Item>
                    <List.Item>Go to spots page to view spots </List.Item>
                    <List.Item>Go to spots page to view spots </List.Item>
                  </List>
                  <h1>Symbols to look out for</h1>
                  <List ordered>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={5}>
              <Card right fluid>
                <Card.Content>
                  <h1>Hot Spots</h1>
                  <Feed>
                    cool stuff about bench
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>

          </Grid>
        </div>
    );
  }
}

export default Landing;
