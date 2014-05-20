/// <reference path="./defs/orm/orm.d.ts"/>
/// <reference path="./defs/q/Q.d.ts"/>
import orm = require('orm');
import Q = require('q');
export function connect(uri:string):Q.Promise<orm.ORM> {
    var def = Q.defer<orm.ORM>();
    orm.connect(uri, function (err, db) {
        if (err) {
            def.reject(err);
        }
        def.resolve(db);
    });
    return def.promise;
}
