'use strict';

var MemoryStorage = require('../lib/storage-memory.js'),
    Dump = require('../lib/dump');

exports['dump'] = {
    setUp: function (done) {
        done();
    },

    'default': function (test) {
        test.expect(1);

        var dump = new Dump();
        test.ok(dump.store instanceof MemoryStorage, 'Dump should defualt to MemoryStorage.');

        test.done();
    },

    'use': function (test) {
        test.expect(1);

        var dump = new Dump();
        dump.use('memory');
        test.ok(dump.store instanceof MemoryStorage, 'use() should set a new store.');

        test.done();
    },
};
