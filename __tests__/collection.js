jest.dontMock('../collection.js');

var Collection = require('../collection.js');

describe('Collection - A Javascript implementation of Laravel\'s Collection class', function () {

  it('it can be created with an empty array and begin with zero items',
    function () {
      var collection = new Collection([]);

      expect(collection.count())
        .toBe(0);
    });

  it('is initialized w/ items given an array',
    function () {
      var items = ['one', 'two', 'three'];
      var collection = new Collection(items);

      expect(collection.items())
        .toBe(items);
    });

  it('can check if an item exists',
    function () {
      var collection = new Collection(['one', 'two', 'three']);

      expect(collection.contains('one'))
        .toBe(true);
      expect(collection.contains('no exist!!'))
        .toBe(false);
    });

  it('enforces that only an array may be passed in to the constructor',
    function () {
      var makeCollection = function () {
        return new Collection("Hi, I'm NOT an array!");
      };
      expect(makeCollection)
        .toThrow();
    });
});
