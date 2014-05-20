/// <reference path="../../dist/node_modules/xq/xq.d.ts"/>
var xq = require('xq/xq');
console.log(xq);

var api;
(function (api) {
    api.Person = new xq.Base({
        table: 'person',
        fields: {
            name: String,
            stuff: Number
        }
    });
})(api || (api = {}));

xq.connect("sqlite://data.sqlite").then(function (db) {
    return api.Person.sync(db);
}).then(function () {
    return api.Person.create({
        name: 'doug',
        stuff: 1
    });
}).then(function () {
    return api.Person.find({});
}).then(function (items) {
    console.log('items: ' + items.length);
    return api.Person.exists({
        name: 'doug'
    });
}).then(function (exists) {
    console.log('exists "doug": ' + exists);
    return api.Person.remove({
        name: 'doug'
    });
}).then(function (items) {
    return api.Person.exists({
        name: 'doug'
    });
}).then(function (exists) {
    console.log('exists "doug": ' + exists);
    return api.Person.remove({
        name: 'doug'
    });
}).then(function () {
    return api.Person.count({});
}).then(function (results) {
    console.log('final: ' + results);
    console.log('completed test run');
});
//# sourceMappingURL=stuff.js.map
