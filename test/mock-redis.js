var redis = require("redis"),
    Util = require('util'),
    EventEmitter = require('events').EventEmitter;

function MockRedisClient() {

}
Util.inherits(MockRedisClient, EventEmitter);

MockRedisClient.prototype.auth = function (password, callback) {

};

MockRedisClient.prototype.get = function (key, cb) {

};

MockRedisClient.prototype.incr = function (key, cb) {

};

redis.createClient = function (port, hostname) { return new MockRedisClient(); };
module.exports = redis;
