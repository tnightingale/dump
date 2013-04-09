var RSVP = require('rsvp'),
    Util = require('util'),
    EventEmitter = require('events').EventEmitter;

function Storage(store) {
    this.on('load', store.load.bind(store));
    this.on('save', store.save.bind(store));
}
Util.inherits(Storage, EventEmitter);

Storage.prototype.load = function (id) {
    var promise = new RSVP.Promise();
    this.emit("load", id, promise);

    return promise;
};

Storage.prototype.save = function (data) {
    var promise = new RSVP.Promise();
    this.emit("save", data, promise);

    return promise;
};

module.exports = Storage;
