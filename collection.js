/**
 * JavaScript implementation of Laravel's Collection class
 *
 * @author Kasey Cowley
 * @author Erik Aybar
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
Collection.prototype.items = function () {
    return this._items;
};

/**
 * Get all items in the collection
 *
 * @returns {Array}
 */
Collection.prototype.all = function () {
  return this.items();
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


/**
 * Get the current number of items in the collection
 * @returns {Number}
 */
Collection.prototype.count = function() {
    return this._items.length;
};


module.exports = Collection;
