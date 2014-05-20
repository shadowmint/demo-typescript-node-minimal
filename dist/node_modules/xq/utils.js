/// <reference path="./defs/orm/orm.d.ts"/>
/// <reference path="./defs/q/Q.d.ts"/>
var orm = require('orm');
var Q = require('q');
function connect(uri) {
    var def = Q.defer();
    orm.connect(uri, function (err, db) {
        if (err) {
            def.reject(err);
        }
        def.resolve(db);
    });
    return def.promise;
}
exports.connect = connect;
//# sourceMappingURL=utils.js.map
