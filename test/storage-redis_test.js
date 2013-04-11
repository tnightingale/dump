'use strict';

var Util = require('util'),
    redis = require('redis');

var MockRedisClient = require('./mocks/redis-client'),
    RedisStorage = require('../lib/storage-redis');

exports['storage redis'] = {
    setUp: function(done) {
        this._console_log = console.log;
        this._createClient = redis.createClient;

        var mock = this.mock_client = new MockRedisClient({
            'doc:0:body': JSON.stringify({ foo: 'bar' })
        });

        redis.createClient = function () { 
            return mock;
        };

        this.store = new RedisStorage();

        done();
    },

    tearDown: function (done) {
        console.log = this._console_log;
        redis.createClient = this._createClient;

        done();
    },

    'logs errors': function(test) {
        test.expect(1);

        console.log = function (message) {
            test.equal(message, "RedisClient Error: \'TEST\'");
            test.done();
        };

        this.mock_client.emit('error', "TEST");
    },

    'load()': {
        'loads item': function (test) {
            test.expect(2);

            var load = this.store.load(0);
            test.ok('then' in load && typeof load.then === 'function', "load() should return a Promises/A promise.");

            load.then(function (doc) {
                test.deepEqual(doc, { foo: 'bar' }); test.done();
            }, function (err) {
                test.ok(false, Util.format("load(0) shouldn't error. Details: %s", Util.inspect(err))); test.done();
            });
        },

        'load non-existent item': function (test) {
            test.expect(1);

            var load = this.store.load(1);
            load.then(function (item) {
                test.ok(item === null, "Loading a non-existent item should give null."); test.done();
            },
            function () {
                test.ok(false, "Loading a non-existent item shouldn't fail."); test.done();
            });
        }
    },

    'save()': {
        'successfully save': function (test) {
            var msg = "save({ foo: 'bar' }) shouldn't fail.";
            test.expect(2);

            var save = this.store.save({ foo: 'bar' });
            test.ok('then' in save && typeof save.then === 'function', "load() should return a Promises/A promise.");

            save.then(function (id) {
                test.equal(id, 1, msg); test.done();
            }, function () {
                test.ok(false, msg); test.done();
            });
        },

        'client error': function (test) {
            var msg = 'save() should fail on client error.';
            test.expect(1);

            var save = this.store.save("FAIL");

            save.then(function () {
                test.ok(false, msg); test.done();
            }, function (err) {
                test.ok(err, msg); test.done();
            });
        }
    }
};

