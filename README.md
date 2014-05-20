## Quickstart

    npm install 
    grunt

## Exported module dependencies

From xq/xq.ts:

    /// <reference path="./defs/orm/orm.d.ts"/>
    /// <reference path="./defs/q/Q.d.ts"/>
    import orm = require('orm');
    import Q = require('q');
    import base = require('./base');
    import utils = require('./utils');
    export class Base<T> extends base.Base<T> {}
    export interface Def extends base.Def {}
    export var connect:{(uri:string):Q.Promise<orm.ORM>} = utils.connect;

Then imported in core.ts for use:

    /// <reference path="../../dist/node_modules/xq/xq.d.ts"/>
    import xq = require('xq/xq');
    xq.connect("sqlite://data.sqlite").then((db) => { ... }

Notice that the generated xq.d.ts file includes definitions for all of these symbols:

    /// <reference path="../../../src/xq/defs/orm/orm.d.ts" />
    /// <reference path="../../../src/xq/defs/q/Q.d.ts" />
    import orm = require('orm');
    import base = require('./base');
    export declare class Base<T> extends base.Base<T> {
    }
    export interface Def extends base.Def {
    }
    export declare var connect: (uri: string) => Q.Promise<orm.ORM>;
