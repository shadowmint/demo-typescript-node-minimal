var Q = require('q');

/* Base class for interacting with the database */
var Base = (function () {
    function Base(def) {
        this._orm = null;
        this._def = def;
    }
    /* Check if we're ready yet */
    Base.prototype._ready = function () {
        if (!this._orm) {
            throw new Error('Must invoke sync() before any other DB operations');
        }
    };

    /* Initialize the factory with a DB instance */
    Base.prototype.sync = function (db) {
        var def = Q.defer();
        this._orm = db.define(this._def.table, this._def.fields);
        this._orm.sync(function (err) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(true);
            }
        });
        return def.promise;
    };

    /* Add a new instance to the store */
    Base.prototype.create = function (template) {
        this._ready();
        var def = Q.defer();
        this._orm.create(template, function (err, results) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(results);
            }
        });
        return def.promise;
    };

    /* Find items by attribute */
    // TODO: options, etc. --> Model.find([ conditions ] [, options ] [, limit ] [, order ] [, cb ])
    Base.prototype.find = function (query) {
        this._ready();
        var def = Q.defer();
        this._orm.find(query, function (err, results) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(results);
            }
        });
        return def.promise;
    };

    /* Count items found by attribute */
    Base.prototype.count = function (query) {
        this._ready();
        var def = Q.defer();
        this._orm.count(query, function (err, results) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(results);
            }
        });
        return def.promise;
    };

    /* Delete object */
    Base.prototype.remove = function (query) {
        this._ready();
        var def = Q.defer();
        this._orm.find(query).remove(function (err) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(true);
            }
        });
        return def.promise;
    };

    /* Check and object with the given attributes exists */
    Base.prototype.exists = function (query) {
        this._ready();
        var def = Q.defer();
        this._orm.exists(query, function (err, exists) {
            if (err) {
                def.reject(err);
            } else {
                def.resolve(exists);
            }
        });
        return def.promise;
    };
    return Base;
})();
exports.Base = Base;
//# sourceMappingURL=base.js.map
