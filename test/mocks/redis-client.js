var Util = require('util'),
    EventEmitter = require('events').EventEmitter;

function MockRedisClient(data) {
    this.data = data;
}
Util.inherits(MockRedisClient, EventEmitter);

MockRedisClient.prototype.auth = function () {};

MockRedisClient.prototype.get = function (key, cb) {
    cb(null, this.data[key] || null);
};

MockRedisClient.prototype.set = function (key, data, cb) {
    if (data === JSON.stringify("FAIL")) {
        cb(true, null);
    }
    else {
        cb(null, 'OK');
    }
};

MockRedisClient.prototype.incr = function (key, cb) {
    cb(null, 1);
};

module.exports = MockRedisClient;
