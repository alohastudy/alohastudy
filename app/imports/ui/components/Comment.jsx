import React from 'react';
import { Feed, Image, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Profiles } from '/imports/api/profile/profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {

  render() {
    const today = new Date();
    const time = `${today.getHours()}:${today.getMinutes()}`;
    const profile = Profiles.findOne({ owner: this.props.comment.owner });
    return (
        <Feed.Event>
          <Feed.Label>
            <Image src={profile.image}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>
                  {profile.firstName}
                  &nbsp;
                  {profile.secondName}
                  &nbsp;
              </Feed.User>
              <Feed.Date>{this.props.comment.createdAt.toLocaleDateString('en-US')}</Feed.Date>
              <Feed.Date>{time}</Feed.Date>
            </Feed.Summary>
            <Feed.Summary>
              {this.props.comment.comment}
              &nbsp;
              - <Rating defaultRating={this.props.comment.rating} maxRating={5} disabled/>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Comment);
