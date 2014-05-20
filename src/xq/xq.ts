/// <reference path="./defs/orm/orm.d.ts"/>
/// <reference path="./defs/q/Q.d.ts"/>
import orm = require('orm');
import Q = require('q');
import base = require('./base');
import utils = require('./utils');
export class Base<T> extends base.Base<T> {}
export interface Def extends base.Def {}
export var connect:{(uri:string):Q.Promise<orm.ORM>} = utils.connect;
