/// <reference path="__init__.ts"/>
module turn {

    /* A test runner */
    export class TestCase implements turn.Testable {

        /* Label for this test */
        public label:string = '';

        /* Asserter */
        public assert:Assert = null;

        /* Log */
        public trace:turn.TestLogger = null;

        /* Format output in a way that isn't rubbish */
        public format:{(msg:string, ...args:string[]):string};

        constructor(label:string) {
            this.label = label;
            this.assert = new turn.Assert();
        }

        public execute(log:turn.TestLogger):turn.TestResult {
            var total = 0;
            var failed = 0;
            var failures = [];
            this.assert = new turn.Assert();
            this.trace = log;
            this.format = turn.format;
            for (var key in this) {
                if (key.substr(0, 4) == 'test') {
                    var tname = this.label + '.' + key;
                    try {
                        ++total;
                        eval('this.'+key+'();');
                        log(': passed: ' + tname);
                    }
                    catch (e) {
                        ++failed;
                        log(': failed: ' + tname);
                        log(e);
                        failures.push(tname);
                    }
                }
            }
            return <turn.TestResult> {
                tests: total,
                failed: failed,
                failures: failures,
                label: this.label
            }
        }
    }
}
