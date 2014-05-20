/// <reference path="../../src/xq/defs/orm/orm.d.ts" />
/// <reference path="../../src/xq/defs/q/Q.d.ts" />
import orm = require('orm');
export declare class Base<T> {
    private _def;
    private _orm;
    constructor(def: Def);
    private _ready();
    public sync(db: any): Q.Promise<any>;
    public create(template: T): Q.Promise<any>;
    public find(query: any): Q.Promise<orm.Instance[]>;
    public count(query: any): Q.Promise<number>;
    public remove(query: any): Q.Promise<boolean>;
    public exists(query: any): Q.Promise<boolean>;
}
export interface Def {
    table: string;
    fields: {
        [key: string]: any;
    };
}
