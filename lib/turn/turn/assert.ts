/// <reference path="__init__.ts"/>
module turn {

    /* Assertion helper */
    export class Assert {

        true(a:boolean):void {
            if (!a) {
                throw new Error(a + ' !== true');
            }
        }

        false(a:boolean):void {
            if (a) {
                throw new Error(a + ' !== false');
            }
        }

        equals(a:any, b:any):void {
            if (a !== b) {
                throw new Error(a + ' !== ' + b);
            }
        }

        instanceof(a:any, b:any):void {
            if (!(a instanceof b)) {
                throw new Error(a + ' not instanceof ' + b);
            }
        }

        /* For floats, support fuzzy matching */
        near(a:number, b:number, fuz=0.01):void {
            if (Math.abs(a - b) > fuz) {
                throw new Error(a + ' not within ' + fuz + ' of ' + b);
            }
        }

        /* Special array assertions */
        public array:ArrayAssert = new ArrayAssert();
    }

    /* Array assertions */
    export class ArrayAssert {

        /* Strict equality of all array elements */
        public equals(a:any[], b:any[]):void {
            if (a.length != b.length) {
                throw new Error(a + '.length != ' + b + '.length');
            }
            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) {
                    throw new Error(a[i] + ' !== ' + b[i]);
                }
            }
        }
    }
}
