var RSVP = require('rsvp'),
    redis = require('redis'),
    Util = require('util');

var promisify = require('./promisify');

function RedisStorage (options) {
    options = options || {};

    var port = options.port || null,
        hostname = options.hostname || null;

    this.KEYTEMPLATE = "%s:%d:body";

    this.client = promisify(redis.createClient(port, hostname), ['on']);

    if (options.auth) {
        this.client.auth(options.auth.split(":")[1]);
    }

    this.client.on('error', function (err) {
        console.log("RedisClient Error: " + Util.inspect(err));
    });
}

RedisStorage.prototype.load = function (id) {
    var promise = new RSVP.Promise(),
        client = this.client,
        key = Util.format(this.KEYTEMPLATE, 'doc', id),
        load = client.get(key);

    load.then(function (text) {
        try {
            var doc = JSON.parse(text);
            promise.resolve(doc);
        }
        catch (e) {
            promise.reject(e);
        }
    }, function (error) {
        promise.reject(error);
    });

    return promise;
};

RedisStorage.prototype.save = function (data) {
    var promise = new RSVP.Promise(),
        client = this.client,
        key_template = this.KEYTEMPLATE,
        id = null;

    try {
        var text = JSON.stringify(data);
    }
    catch (e) {
        return promise.reject(e);
    }

    client.incr('next.doc.id')
        .then(function (new_id) {
            id = new_id;
            return client.set(Util.format(key_template, 'doc',  new_id), text);
        })
        .then(function (res) {
            if (res === 'OK') {
                promise.resolve(id);
            }
            else {
                promise.reject(res);
            }
        })
        .then(null, function (error) {
            promise.reject(error);
        });

    return promise;
};

module.exports = RedisStorage;
