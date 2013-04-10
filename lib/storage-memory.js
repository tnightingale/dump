var Util = require('util'),
    RSVP = require('rsvp');

function MemoryStorage (options) {
    this.data = options && options.data ? options.data : [];
}

MemoryStorage.prototype.load = function (id) {
    var promise = new RSVP.Promise();
    if (this.data[id]) {
        promise.resolve(this.data[id]);
    }
    else {
        promise.reject(new Error(Util.format("Could not find value with '%s'.", id)));
    }
    return promise;
};

MemoryStorage.prototype.save = function (data) {
    var promise = new RSVP.Promise();
    this.data.push(data);
    promise.resolve(this.data.length - 1);
    return promise;
};

module.exports = MemoryStorage;
