import React from 'react';
import { Grid, Container, Header, Segment, Image, Divider, Button, Icon, Card, Feed, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Spots } from '/imports/api/spot/spot';
import SpotItemSmall from '/imports/ui/components/SpotItemSmall';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const spots = Spots.find({}, { sort: { rating: -1 }, limit: 3 }).fetch();
    // console.log(spots);
    return (
        <Container className="ui landing top">

          <style>
            @import url('https://fonts.googleapis.com/css?family=Righteous');{/*eslint-disable-line*/}
          </style>

          <Container>

            <Grid container stackable inverted verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header
                      as='h1'
                      content='Aloha Study'
                      inverted
                      textAlign='center'
                      style={{
                        fontSize: '80px',
                        marginTop: '100px',
                        marginBottom: '20px',
                        fontFamily: 'Righteous, cursive',
                      }}
                  />
                  <Header
                      as='h1'
                      content='University of Hawaii at Manoa'
                      inverted
                      textAlign='center'
                      style={{
                        fontSize: '30px',
                        marginTop: '30px',
                        marginBottom: '20px', fontFamily: 'Righteous, cursive',
                      }}
                  />
                  <Header
                      as='h2'
                      content='Study Spots Within Reach'
                      inverted
                      textAlign='center'
                      style={{
                        fontSize: '30px',
                        marginTop: '30px',
                        marginBottom: '20px', fontFamily: 'Righteous, cursive',
                      }}
                  />
                  <Container textAlign='center'>
                    <Link to="/signup">
                      <Button size='huge'>
                        Start Studying!
                        <Icon name='right arrow'/>
                      </Button>
                    </Link>
                  </Container>

                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                  <Card>
                    <Card.Content>
                      <Card.Header>Hot Spots</Card.Header>
                    </Card.Content>
                    <Card.Content>
                      <Feed>
                        {spots.map((spot) => <SpotItemSmall key={spot._id} spot={spot}/>)}
                      </Feed>
                    </Card.Content>
                  </Card>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Container>


          <Segment style={{ padding: '4em 0em' }} vertical>
            <Grid container stackable inverted verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                    Need a place to crash and study?
                  </Header>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                    This website provides information on previously unknown areas that are free from inconvenience and
                    noise.
                  </p>
                  <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                    What can we provide?
                  </Header>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                    We provide a listings of spots with information that you will always need to be a step ahead of
                    everyone else. You will get ratings, hours of operation, capacity, accessibility, and capabilities
                    of each spot.
                  </p>
                </Grid.Column>
                <Grid.Column floated='right' width={6}>
                  <Image bordered rounded size='large' src='/images/uh.jpg'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>


          <Segment style={{ padding: '4em 0em' }} vertical>
            <Container text>
              <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                Add Spots
              </Header>
              <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                This tab allows verified users and admins to add listings and metadata of the spot. Within this, you can
                add the name, images, and attributes. Users can input data and choose attributes from a dragdown menu.
              </p>
              <Link to={'/addSpots/'}>
                <Button size='large'>
                  Add Spots
                </Button>
              </Link>

              <Divider
                  as='h4'
                  className='header'
                  horizontal
                  style={{
                    margin: '3em 0em',
                    textTransform: 'uppercase',
                    color: 'white',
                    fontFamily: 'Righteous, cursive',
                  }}
              >
                <div>How to use the Site</div>
              </Divider>

              <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                List Spots
              </Header>
              <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                This tab allows all users to view the listing of verified spots. Within this, users can view all
                verified spots with the spot<span>&#39;</span>s name and attributes describing its condition.
              </p>
              <Link to={'/listSpots/'}>
                <Button size='large'>
                  List Spots
                </Button>
              </Link>
            </Container>
          </Segment>

          <Segment style={{ padding: '0em' }} vertical>
            <Grid inverted celled='internally' columns='equal' stackable>
              <Grid.Row textAlign='center'>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                    Who Are We?
                  </Header>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>We are a team of
                    students who currently attend the University of Hawaii at Manoa within the College of
                    Engineering</p>
                  <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                    ICS 314
                  </Header>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>Our team is part
                    of ICS 314 Software and Web Development; this website was built for our final project for the
                    semester of Spring 2019.</p>
                </Grid.Column>
                <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                  <Header inverted as='h3' style={{ fontSize: '2em', fontFamily: 'Righteous, cursive' }}>
                    Contact Us!
                  </Header>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                    <Image size='tiny' avatar src='/images/isaac.jpg'/>
                    <b>&nbsp;&nbsp;Isaac Lee</b> - ilee72@hawaii.edu
                  </p>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                    <Image size='tiny' avatar src='/images/andrew.jpg'/>
                    <b>&nbsp;&nbsp;Andrew Millard</b> - millarda@hawaii.edu
                  </p>
                  <p style={{ fontSize: '1.33em', color: 'white', fontFamily: 'Righteous, cursive' }}>
                    <Image size='tiny' avatar src='/images/david.jpg'/>
                    <b>&nbsp;&nbsp;David Liang</b> - david947@hawaii.edu
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

        </Container>
    );
  }
}

// export default Landing;
/** Require an array of Stuff documents in the props. */
Landing.propTypes = {
  // query: PropTypes.string.isRequired,
  // spots: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('SpotVerified');

  return {
    ready: subscription.ready(),
  };
})(Landing);
