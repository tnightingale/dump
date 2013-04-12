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

    'save': function (test) {
        test.expect(4);
        var dump = new Dump(),
            when_saved = dump.save({ foo: 'bar' });

        test.ok('then' in when_saved && typeof when_saved.then === 'function', "save() should return a Promises/A promise.");

        when_saved.then(function (params) {
            test.ok(params.length === 2, "save() should return two parameters; [id, data].");
            test.ok(params[0] !== null, "param[0] should be a valid id.");
            test.deepEqual(params[1], { foo: 'bar' }, 'param[1] should match saved data.');
            test.done();
        }, function () {
            test.ok(false, "save({ foo: 'bar' } shouldn't fail."); test.done();
        });
    }
};
