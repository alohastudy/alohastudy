import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Spots } from '../../api/spot/spot.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Spots.insert(data);
}

/** Initialize the collection if empty. */
if (Spots.find().count() === 0) {
  if (Meteor.settings.defaultSpots) {
    console.log('Creating default spots.');
    Meteor.settings.defaultSpots.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('SpotPersonal', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Spots.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user*/
Meteor.publish('SpotAll', function publish() {
  return Spots.find();
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('SpotVerified', function publish() {
  if (this.userId && !Roles.userIsInRole(this.userId, 'banned')) {
    return Spots.find({ verified: true});
  }
  return this.ready();
});