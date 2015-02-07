/**
 * JavaScript implementation of Laravel's Collection class
 *
 * Uses constructor function to create new object and attaches methods via the prototype chain.
 * 
 * @author Kasey Cowley
 */

/**
 * Constructor function
 * 
 * @param {Array} items - The items to be added to the collection
 * @throws TypeError
 */
function Collection(items) {
    if (!Array.isArray(items)) {
        throw {
            name: 'TypeError',
            message: 'Collections require arrays of items'
        };
    }

    this._items = items;
}

/**
 * Get all items in the collection
 * 
 * @returns {Array}
 */
Collection.prototype.all = function () {
    return this._items;
};

/**
 * Collapse the collection items into a single array
 * 
 * @returns {Array}
 */
Collection.prototype.collapse = function () {
    var results = [];

    this._items.map(function (item) {
        if (item instanceof Collection) {
            item = item.all();
        }

        results = results.concat(item);
    });

    return results;
};

/**
 * Returns whether a value exists in the collection
 * 
 * @param value
 * @returns {boolean}
 */
Collection.prototype.contains = function (value) {
    return this._items.indexOf(value) !== -1;
};

/**
 * Returns the first item in the collection
 * 
 * @returns {*}
 */
Collection.prototype.first = function () {
    return this._items[0];
};

/**
 * Returns the difference of the collection and given items
 * 
 * @param items
 * @returns {Array.<T>|*}
 */
Collection.prototype.diff = function (items) {
    var self = this;

    return self._items.filter(function (item) {
        return items.indexOf(item) < 0;
    });
};

/**
 * Execute a callback over each item in the collection
 *
 * @param {Function} callback - The callback to run on each item
 * @return {Collection}
 */
Collection.prototype.each = function(callback) {
    this._items = this._items.map(callback, this);

    return this;
};

/** Begin Tests */
var items = [1,2,3,4,5,6,7,8,9,10,[11,12]];
var collection = new Collection(items);

console.log(collection.all());
console.log(collection.collapse());
console.log(collection.contains(1));
console.log(collection.contains(20));
console.log(collection.each(Math.pow));