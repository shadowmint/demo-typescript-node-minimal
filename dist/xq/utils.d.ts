/// <reference path="../../src/xq/defs/orm/orm.d.ts" />
/// <reference path="../../src/xq/defs/q/Q.d.ts" />
import orm = require('orm');
export declare function connect(uri: string): Q.Promise<orm.ORM>;
