var RSVP = require('rsvp'),
    Util = require('util');

function proxy(property, obj) {
    return function () {
        obj[property].apply(obj, Array.prototype.slice.call(arguments));
    };
}

function Promisify(obj, except) {
    var newObj = {},
        promisify = function (property, obj) {
            return function () {
                var promise = new RSVP.Promise(),
                    args = Array.prototype.slice.call(arguments),
                    handler = function (error, thing) {
                        if (error) {
                            return promise.reject(error);
                        }
                        return promise.resolve(thing);
                    };

                args.push(handler);
                obj[property].apply(obj, args);

                return promise;
            };
        };

    except = except || [];

    for (var i = 0, len = except.length; i < len; i++) {
        if (except[i] in obj) {
            newObj[except[i]] = proxy(except[i], obj);
        }
        else {
            var message = Util.format("%s %s has no method '%s'", obj, typeof obj, i);
            throw new TypeError(message);
        }
    }

    for (var property in obj) {
        if (!(property in newObj)) {
            newObj[property] = promisify(property, obj);
        }
    }

    return newObj;
}

module.exports = Promisify;

