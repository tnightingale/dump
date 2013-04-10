/*
 * dump
 * https://github.com/tnightingale/dump
 *
 * Copyright (c) 2013 tnightingale
 * Licensed under the MIT license.
 */

'use strict';

var Util = require('util');

function Dump(options) {
    this.store = null;

    if (!options || !options.store) {
        this.use('memory');
    }
    else {
        this.use(options.store.type, options.store.options);
    }
}

Dump.prototype.load = function (id) {
    return this.store.load(id);
};

Dump.prototype.save = function (data) {
    return this.store.save(data);
};

Dump.prototype.use = function (type, options) {
    var Store = require(Util.format('./storage-%s', type));
    this.store = new Store(options);
};

module.exports = Dump;
