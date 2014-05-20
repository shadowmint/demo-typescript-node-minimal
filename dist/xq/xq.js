var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var base = require('./base');
var utils = require('./utils');
var Base = (function (_super) {
    __extends(Base, _super);
    function Base() {
        _super.apply(this, arguments);
    }
    return Base;
})(base.Base);
exports.Base = Base;

exports.connect = utils.connect;
//# sourceMappingURL=xq.js.map
