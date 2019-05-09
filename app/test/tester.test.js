/* eslint-env mocha, chai */
import chai from 'chai';

import { AddComment } from '../app/imports/ui/components/AddComment.jsx';

describe('AddComment', () => {
  it('should render', () => {
    chai.equal(AddComment.updateSpotRating(), true, 'these equal');
    chai.notEqual(true, true, 'these still equal but wrong');
  });
});
