/// <reference path="__init__.ts"/>
module tests {
    export class TestAdd extends turn.TestCase {

        test_works():void {
            this.trace('Thing');
            this.assert.true(blah.worksAdd(3, 5) == 8);
        }

        test_fails():void {
            this.assert.false(blah.failsAdd(3, 5) == 8);
        }
    }
}
