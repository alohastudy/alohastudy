import React from 'react';
import { Grid, Card, Feed, List, Menu, Container, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (

        <Container>
          <Header
              as='h1'
              content='Aloha Study'
              inverted
              textAlign='center'
              padded container centered
              style={{fontSize: '80px',
              marginTop: '15px',
              marginBottom: '10px'}}
          />
          <Header
              as='h2'
              content='Study Spots Within Reach'
              inverted
              textAlign='center'
              padded container centered
              style={{fontSize: '40px',
                marginTop: '30px',
                marginBottom: '10px'}}
          />

        <div className='img-background'>
          <Grid verticalAlign='top' borderless inverted Style='background-color: #36AA48' textAlign='center' padded container centered>


            <Grid.Column width={9}>
              <Card left fluid>
                <Card.Content>
                  <h1>Welcome to Aloha Study!</h1>
                  <p>This website is designed to provide students a listing of hidden study spots. In this site, you
                    will be provided a list of spots providing reviews, hours, capacity, accessibility, and capabilities
                    of each study spot. It also
                    will include a feature allowing students to give real-time feedback of being at the spot with a
                    timestamp.</p>
                  <h1>How to use this site:</h1>
                  <List bulleted>
                    <List.Item>The list spots tab will direct you to a list of spots</List.Item>
                    <List.Item>The add spots tab will allow you to add spots</List.Item>
                    <List.Item>Listings for spots will provide reviews, hours, capacity, accessiblity, and
                      capabilities </List.Item>
                    <List.Item>Go to spots page to view spots </List.Item>
                  </List>
                  <h1>Symbols to look out for</h1>
                  <List ordered>
                    <List.Item>This symbol is for loud</List.Item>
                    <List.Item>This symbol is for quiet</List.Item>
                    <List.Item>This symbol is for outdoors</List.Item>
                    <List.Item>This symbol is for indoors</List.Item>
                    <List.Item>This symbol is for </List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={14}>
              <Card center fluid>
                <Card.Content>
                  <h1>Who We Are</h1>
                  <Feed>
                    This website was created for our ICS 314 final project. The creators of this website are Andrew Millard, David Liang, and Isaac Lee.
                  </Feed>
                  <h2>Contact Us!</h2>
                  <List bulleted>
                    <List.Item>Andrew Millard: millarda@hawaii.edu</List.Item>
                    <List.Item>David Liang: david947@hawaii.edu</List.Item>
                    <List.Item>Isaac Lee: ilee72@hawaii.edu</List.Item>
                  </List>
                </Card.Content>
              </Card>
            </Grid.Column>

          </Grid>
        </div>
        </Container>
    );
  }
}

export default Landing;
