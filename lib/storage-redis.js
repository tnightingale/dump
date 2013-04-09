var redis = require("redis"),
    Util = require('util'),
    EventEmitter = require('events').EventEmitter;

var promisify = require('./promisify');

function RedisStorage () {
    this.client = promisify(redis.createClient(), ['on']);

    this.client.on('error', function (err) {
        console.log("RedisClient Error: " + Util.inspect(err));
    });

    this.client.on('ready', function () {
        this.emit('ready');
    }.bind(this));
}
Util.inherits(RedisStorage, EventEmitter);

RedisStorage.prototype.load = function (id, promise) {
    var client = this.client,
        key = Util.format("doc:%d:body", id);

    client.get(key)
        .then(function (doc) {
            try {
                doc = JSON.parse(doc);
                promise.resolve(doc);
            }
            catch (err) {
                promise.reject(err);
            }
        })
        .then(null, function (error) {
            promise.reject(error);
        });
};

RedisStorage.prototype.save = function (data, promise) {
    var client = this.client,
        doc = { data: data, stat: false };

    try {
        data = JSON.stringify(data);
    }
    catch (err) {
        promise.reject(err);
    }

    client.incr('next.doc.id')
        .then(function (id) {
            var key = Util.format("doc:%d:body", id);
            doc.id = id;
            return client.set(key, data);
        })
        .then(function (stat) {
            doc.stat = stat;
            promise.resolve(doc);
        })
        .then(null, function (error) {
            promise.reject(error);
        });
};

module.exports = RedisStorage;
