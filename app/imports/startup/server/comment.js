import { Meteor } from 'meteor/meteor';
import { Comments } from '../../api/comment/comment.js';

// function addData(data) {
//   console.log(`  Adding: ${data.firstName} (${data.owner})`);
//   Comments.insert(data);
// }
//
// /** Initialize the collection if empty. */
// if (Comments.find().count() === 0) {
//   if (Meteor.settings.defaultComments) {
//     console.log('Creating default profiles.');
//     Meteor.settings.defaultProfiles.map(data => addData(data));
//   }
// }

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Comments', function publish() {
  // if (this.userId) {
  //   const username = Meteor.users.findOne(this.userId).username;
  //   return Comments.find({ owner: username });
  // }
  return Comments.find();
  return this.ready();
});
