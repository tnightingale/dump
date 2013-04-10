var MemoryStorage = require('../lib/storage-memory.js');

exports['Storage: Memory'] = {
    setUp: function(done) {
        this.store = new MemoryStorage({
            data: [{ foo: 'bar' }]
        });

        done();
    },

    'load()': {
        'loads item': function (test) {
            test.expect(2);

            var load = this.store.load(0);
            test.ok('then' in load && typeof load.then === 'function', "load() should return a Promises/A promise.");

            load.then(function (doc) {
                test.deepEqual(doc, { foo: 'bar' }); test.done();
            }, function () {
                test.ok(false, "load(0) shouldn't fail."); test.done();
            });
        },

        'load non-existent item': function (test) {
            test.expect(1);

            var load = this.store.load(1);
            load.then(function () {
                test.ok(false, "Loading a non-existent item should fail."); test.done();
            },
            function (err) {
                test.ok(err, "Loading a non-existent item should fail."); test.done();
            });
        }
    },

    'save()': {
        'saves item': function (test) {
            test.expect(2);

            var save = this.store.save({ foo: 'bar' });
            test.ok('then' in save && typeof save.then === 'function', "load() should return a Promises/A promise.");

            save.then(function (id) {
                test.ok(id, 'save() must return an identifier for the item saved.'); test.done();
            }, function () {
                test.ok(false, "save(0) shouldn't fail."); test.done();
            });
        }
    }
};
