/*
 * dump
 * https://github.com/tnightingale/dump
 *
 * Copyright (c) 2013 tnightingale
 * Licensed under the MIT license.
 */

'use strict';

var Url = require("url"),
    restify = require('restify');

var storage = require('./storage'),
    storage_redis = require('./storage-redis');

// TODO: These config items should be defined externally.
//       Likewise the specific storage adapter should also be configurable.
var port = process.env.PORT || 8080,
    redis_info = Url.parse(process.env.REDISTOGO_URL || 'redis://localhost:6379');

function Dump () {
    var server = this.server = restify.createServer(),
        store = this.store = new storage(new storage_redis(redis_info));

    server.get('/storage/:id', function (req, res, next) {
        var success = function (doc) {
                res.send(doc);
                return next();
            },
            error = function (err) {
                return next(err);
            };

        store.load(req.params.id).then(success, error);
    });

    server.post('/storage', function (req, res, next) {
        req.setEncoding('utf-8');

        var chunks = [],
            success = function (doc) {
                res.send(doc);
                return next();
            },
            error = function (err) {
                return next(err);
            };

        req.on('data', function (chunk) {
            chunks.push(chunk);
        });

        req.on('end', function () {
            try {
                var data = JSON.parse(chunks.join());
                store.save(data).then(success, error);
            }
            catch (err) {
                error(err);
            }
        });
    });
}

Dump.prototype.start = function () {
    var server = this.server;

    server.listen(port, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};

exports.createServer = function () {
    return new Dump();
};
