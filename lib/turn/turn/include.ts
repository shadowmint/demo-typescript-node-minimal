/// <reference path="__init__.ts"/>
declare var require;
module turn {

    /* Load a node module directly by path */
    export function include(f) {
        return require(f);
    };
}
