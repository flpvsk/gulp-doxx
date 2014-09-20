/*!
 * Module dependencies.
 */

var _ = require('lodash');


/**
 * Simplifies things.
 *
 * *Examples:*
 *
 *      var things = [{
 *        "stuff": {
 *          "evenMoreStuff": {
 *            "evenMoreStuff": null
 *          }
 *        }
 *      }];
 *
 *      // returns ["stuff"]
 *      simplify(things);
 *
 *
 * @param {object[]} - things
 * @see exports.simplify
 * @api public
 */
exports.simplify = function simplify(things) {
  return _.map(things, function(thing) {
    return _.keys(thing)[0];
  });
};
