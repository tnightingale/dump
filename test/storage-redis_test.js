'use strict';

var SandboxedModule = require('sandboxed-module');

var storage_redis = SandboxedModule.require('../lib/storage-redis', {
        requires: {
            'redis': require('./mock-redis')
        }
    });

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['storage redis'] = {
  setUp: function(done) {
    done();
  },
  'no args': function(test) {
    test.expect(1);
    // tests here

    dump.awesome = 'awesome';
    test.equal(dump.awesome, 'awesome', 'should be awesome.');
    test.done();
  },
};

