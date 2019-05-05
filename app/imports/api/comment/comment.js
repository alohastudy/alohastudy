import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Comments = new Mongo.Collection('Comments');

/** Create a schema to constrain the structure of documents associated with this collection. */
const CommentSchema = new SimpleSchema({
  comment: String,
  rating: Number,
  spot_id: String,
  firstName: String,
  secondName: String,
  image: String,
  createdAt: Date,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Comments.attachSchema(CommentSchema);

/** Make the collection and schema available to other code. */
export { Comments, CommentSchema };
