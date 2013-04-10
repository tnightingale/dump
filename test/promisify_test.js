'use strict';

var RSVP = require('rsvp');

var promisify = require('../lib/promisify');

function noop(err, value) { err = value; }

exports['promisify'] = {
  setUp: function(done) {
    this.api = {
        one: function (foo, cb) {
            cb(null, foo);
        },
        two: function (foo, cb) {
            cb(foo);
        }
    };
    done();
  },

  'promisify an api': function(test) {
    test.expect(2);

    var api = promisify(this.api, ['two']),
        promise = api.one(null, noop),
        not_promise = api.two(null, noop);

    test.ok(promise instanceof RSVP.Promise, "Methods of a Promisified API should return a promise.");
    test.ok(!(not_promise instanceof RSVP.Promise), "Excluded API methods should not return a promise.");

    test.done();
  },
};
