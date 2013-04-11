var RSVP = require('rsvp');

function MemoryStorage (options) {
    this.data = options && options.data ? options.data : [];
}

MemoryStorage.prototype.load = function (id) {
    var promise = new RSVP.Promise();
    promise.resolve(this.data[id] || null);
    return promise;
};

MemoryStorage.prototype.save = function (data) {
    var promise = new RSVP.Promise();
    this.data.push(data);
    promise.resolve(this.data.length - 1);
    return promise;
};

module.exports = MemoryStorage;
