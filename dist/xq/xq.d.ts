/// <reference path="../../src/xq/defs/orm/orm.d.ts" />
/// <reference path="../../src/xq/defs/q/Q.d.ts" />
import orm = require('orm');
import base = require('./base');
export declare class Base<T> extends base.Base<T> {
}
export interface Def extends base.Def {
}
export declare var connect: (uri: string) => Q.Promise<orm.ORM>;
