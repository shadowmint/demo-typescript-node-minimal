﻿/// <reference path="__init__.ts"/>
var turn;
(function (turn) {
    /* Load a node module directly by path */
    function include(f) {
        return require(f);
    }
    turn.include = include;
    ;
})(turn || (turn = {}));
/// <reference path="__init__.ts"/>
var turn;
(function (turn) {
    /*
    * Special format an incoming string.
    * eg. format('{}....{}....{}', turn.RED, turn.GREEN, turn.RESET)
    */
    function format(msg) {
        var args = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            args[_i] = arguments[_i + 1];
        }
        var offset;
        var copy = msg;
        var aoffset = 0;
        var rtn = '';
        var marker = '{}';
        while ((offset = copy.indexOf(marker)) != -1) {
            rtn += copy.substr(0, offset);
            if (args.length > aoffset) {
                rtn += args[aoffset];
                aoffset += 1;
            }
            copy = copy.substr(offset + marker.length, copy.length - offset);
        }
        rtn += copy;
        return rtn;
    }
    turn.format = format;

    /* Colors */
    turn.BLACK = '\033[90m';
    turn.RED = '\033[91m';
    turn.GREEN = '\033[92m';
    turn.YELLOW = '\033[93m';
    turn.BLUE = '\033[94m';
    turn.MAGENTA = '\033[95m';
    turn.CYAN = '\033[96m';
    turn.WHITE = '\033[97m';
    turn.RESET = '\033[0m';
})(turn || (turn = {}));
/// <reference path="__init__.ts"/>
/// <reference path="__init__.ts"/>
/// <reference path="__init__.ts"/>
/// <reference path="__init__.ts"/>
var turn;
(function (turn) {
    /* Assertion helper */
    var Assert = (function () {
        function Assert() {
            /* Special array assertions */
            this.array = new ArrayAssert();
        }
        Assert.prototype.true = function (a) {
            if (!a) {
                throw new Error(a + ' !== true');
            }
        };

        Assert.prototype.false = function (a) {
            if (a) {
                throw new Error(a + ' !== false');
            }
        };

        Assert.prototype.equals = function (a, b) {
            if (a !== b) {
                throw new Error(a + ' !== ' + b);
            }
        };

        Assert.prototype.instanceof = function (a, b) {
            if (!(a instanceof b)) {
                throw new Error(a + ' not instanceof ' + b);
            }
        };

        /* For floats, support fuzzy matching */
        Assert.prototype.near = function (a, b, fuz) {
            if (typeof fuz === "undefined") { fuz = 0.01; }
            if (Math.abs(a - b) > fuz) {
                throw new Error(a + ' not within ' + fuz + ' of ' + b);
            }
        };
        return Assert;
    })();
    turn.Assert = Assert;

    /* Array assertions */
    var ArrayAssert = (function () {
        function ArrayAssert() {
        }
        /* Strict equality of all array elements */
        ArrayAssert.prototype.equals = function (a, b) {
            if (a.length != b.length) {
                throw new Error(a + '.length != ' + b + '.length');
            }
            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) {
                    throw new Error(a[i] + ' !== ' + b[i]);
                }
            }
        };
        return ArrayAssert;
    })();
    turn.ArrayAssert = ArrayAssert;
})(turn || (turn = {}));
/// <reference path="__init__.ts"/>
var turn;
(function (turn) {
    /* A test runner */
    var TestCase = (function () {
        function TestCase(label) {
            /* Label for this test */
            this.label = '';
            /* Asserter */
            this.assert = null;
            /* Log */
            this.trace = null;
            this.label = label;
            this.assert = new turn.Assert();
        }
        TestCase.prototype.execute = function (log) {
            var total = 0;
            var failed = 0;
            var failures = [];
            this.assert = new turn.Assert();
            this.trace = log;
            this.format = turn.format;
            for (var key in this) {
                if (key.substr(0, 4) == 'test') {
                    var tname = this.label + '.' + key;
                    try  {
                        ++total;
                        eval('this.' + key + '();');
                        log(': passed: ' + tname);
                    } catch (e) {
                        ++failed;
                        log(': failed: ' + tname);
                        log(e);
                        failures.push(tname);
                    }
                }
            }
            return {
                tests: total,
                failed: failed,
                failures: failures,
                label: this.label
            };
        };
        return TestCase;
    })();
    turn.TestCase = TestCase;
})(turn || (turn = {}));
/// <reference path="__init__.ts"/>
var turn;
(function (turn) {
    /* An aggregate reporter for test cases */
    var TestRunner = (function () {
        function TestRunner(log) {
            if (typeof log === "undefined") { log = null; }
            /* Tests */
            this.tests = [];
            /* Results */
            this.results = [];
            /* Aggregate results */
            this.total = 0;
            this.failed = 0;
            this.failures = [];
            /* Logger */
            this.log = null;
            if (log == null) {
                log = function (msg) {
                    console.log(msg);
                };
            }
            this.log = log;
        }
        /* Run all tests */
        TestRunner.prototype.execute = function () {
            for (var i = 0; i < this.tests.length; ++i) {
                var test = this.tests[i];
                var result = null;
                try  {
                    result = test.execute(this.log);
                } catch (e) {
                    this.log('Failed to run test case');
                    this.log(e);
                    result = {
                        tests: 1,
                        failed: 1,
                        label: e.toString(),
                        failures: []
                    };
                }
                this.total += result.tests;
                this.failed += result.failed;
                for (var j = 0; j < result.failures.length; ++j) {
                    this.failures.push(result.failures[j]);
                }
                this.results.push(result);
            }
        };

        /* Register a testable */
        TestRunner.prototype.register = function (t) {
            this.tests.push(t);
        };

        /* Load a module of tests */
        TestRunner.prototype.load = function (mod) {
            for (var key in mod) {
                if (key.substr(0, 4).toLocaleLowerCase() == 'test') {
                    this.register(new mod[key](key));
                }
            }
        };

        /* Print a summary */
        TestRunner.prototype.report = function () {
            this.log(':: ' + (this.total - this.failed) + '/' + this.total + ' passed');
            if (this.failed > 0) {
                for (var i = 0; i < this.failures.length; ++i) {
                    this.log(turn.format(':: {}failed{}: ' + this.failures[i], turn.RED, turn.RESET));
                }
            } else {
                this.log(turn.format(':: {}PASSED{}', turn.GREEN, turn.RESET));
            }
        };
        return TestRunner;
    })();
    turn.TestRunner = TestRunner;
})(turn || (turn = {}));
/// <reference path="../__init__.ts"/>
/// <reference path="include.ts"/>
/// <reference path="format.ts"/>
/// <reference path="test_result.ts"/>
/// <reference path="test_logger.ts"/>
/// <reference path="testable.ts"/>
/// <reference path="assert.ts"/>
/// <reference path="test_case.ts"/>
/// <reference path="test_runner.ts"/>
/// <reference path="turn/__init__.ts"/>
/// <reference path="__init__.ts"/>
/// <reference path="../../../lib/turn/__init__.ts"/>
/// <reference path="__init__.ts"/>
/// <reference path="../../../dist/core/core.d.ts"/>
turn.include('./core');
/// <reference path="../__init__.ts"/>
/// <reference path="turn.ts"/>
/// <reference path="core.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="__init__.ts"/>
var tests;
(function (tests) {
    var TestOne = (function (_super) {
        __extends(TestOne, _super);
        function TestOne() {
            _super.apply(this, arguments);
        }
        TestOne.prototype.test_works = function () {
        };
        return TestOne;
    })(turn.TestCase);
    tests.TestOne = TestOne;
})(tests || (tests = {}));
/// <reference path="../__init__.ts"/>
/// <reference path="test_core.ts"/>
/// <reference path="deps/__init__.ts"/>
/// <reference path="module/__init__.ts"/>
var runner = new turn.TestRunner();
runner.load(tests);
runner.execute();
runner.report();
//# sourceMappingURL=_tests.js.map
