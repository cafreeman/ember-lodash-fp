import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { toPairs, mapValues } from 'lodash/fp';

const someObject = {
  foo: '1',
  bar: '2',
  baz: '3',
};

export default Controller.extend({
  someObject: null,

  init() {
    this._super(...arguments);

    this.set('someObject', someObject);
  },

  pairs: computed('someObject', function() {
    return toPairs(this.get('someObject'));
  }),

  listOfInts: computed('someObject', function() {
    return mapValues(parseInt, this.get('someObject'));
  })
});
