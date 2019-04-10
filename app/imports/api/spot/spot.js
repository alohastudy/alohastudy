import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Spots = new Mongo.Collection('Spots');

/** Create a schema to constrain the structure of documents associated with this collection. */
const SpotSchema = new SimpleSchema({
  name: String,
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  image5: String,
  description: String,
  rating: Number,
  outlets: {
    type: String,
    allowedValues: ['None', 'Few', 'Many'],
    defaultValue: 'None',
  },
  noisiness: {
    type: String,
    allowedValues: ['Quiet', 'Moderate', 'Noisy'],
    defaultValue: 'Quiet',
  },
  location: {
    type: String,
    allowedValues: ['indoors', 'outdoors'],
    defaultValue: 'indoors',
  },
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Spots.attachSchema(SpotSchema);

/** Make the collection and schema available to other code. */
export { Spots, SpotSchema };
