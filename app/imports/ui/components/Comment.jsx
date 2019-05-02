import React from 'react';
import { Feed, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Comment extends React.Component {
  render() {
    return (
        <Feed.Event>
          <Feed.Label>
            <Image src={this.props.comment.image}/>
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>
                  {this.props.comment.firstName}
                  &nbsp;
                  {this.props.comment.secondName}
                  &nbsp;
              </Feed.User>
              <Feed.Date>{this.props.comment.createdAt.toLocaleDateString('en-US')}</Feed.Date>
            </Feed.Summary>
            <Feed.Summary>
              {this.props.comment.comment}
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
