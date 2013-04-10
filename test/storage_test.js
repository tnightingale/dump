'use strict';

var Util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Storage = require('../lib/storage');

exports['storage interface'] = {
    setUp: function (done) {
        var mockStorage = {
                load: function (id, promise) { promise.resolve(id); },
                save: function (data, promise) { promise.resolve(data); }
            };
        Util.inherits(mockStorage, EventEmitter);

        this.storage = new Storage(mockStorage);
        done();
    },

    tearDown: function (done) {
        this.storage = null;
        done();
    },

    'load': function (test) {
        test.expect(2);

        this.storage.load(5).then(function(doc) {
            test.ok(true);
            test.equal(doc, 5);
            test.done();
        });
    },

    'save': function (test) {
        test.expect(2);

        this.storage.save(5).then(function(doc) {
            test.ok(true);
            test.equal(doc, 5);
            test.done();
        });
    }
};

