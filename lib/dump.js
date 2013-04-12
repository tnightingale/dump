/*
 * dump
 * https://github.com/tnightingale/dump
 *
 * Copyright (c) 2013 tnightingale
 * Licensed under the MIT license.
 */

'use strict';

var RSVP = require('rsvp'),
    Util = require('util'),
    _ = require('lodash');

var stores = [
    'memory',
    'redis'
];

function Dump(store, options) {
    store = store || 'memory';
    options = options || {};

    this.store = null;

    if (_.contains(stores, store)) {
        this.use(store, options);
    }
    else {
        throw new Error(Util.format("Undefined storage: %s.", store));
    }
}

Dump.prototype.load = function (id) {
    return this.store.load(id);
};

Dump.prototype.save = function (data) {
    var promise = new RSVP.Promise(),
        when_saved = this.store.save(data);

    when_saved.then(function (id) {
        promise.resolve([id, data]);
    }, function (err) {
        promise.reject(err);
    });

    return promise;
};

Dump.prototype.use = function (type, options) {
    var Store = require(Util.format('./storage-%s', type));
    this.store = new Store(options);
};

module.exports = Dump;
