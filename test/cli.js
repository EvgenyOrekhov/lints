/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off", "no-magic-numbers": "off" */

"use strict";

const {test} = require("tap");

const cli = require("../src/cli");

test("cli()", function (t) {
    t.plan(3);

    function log(result) {
        return t.strictSame(
            result,
            `test/stubs/bad.js (JSLint)
    line 0 column 11
        Expected ';' and instead saw '(end)'. (expected_a_b)
`,
            "should log warnings"
        );
    }

    return cli({
        rcFile: "test/stubs/.lints.json",
        log
    })
        // eslint-disable-next-line promise/always-return
        .then(function (exitCode) {
            t.strictSame(exitCode, 1);
            t.strictSame(process.exitCode, 1);

            process.exitCode = 0;
        });
});

test("cli()", function (t) {
    t.plan(1);

    function log() {
        // eslint-disable-next-line fp/no-throw
        throw new Error();
    }

    return cli({
        rcFile: "test/stubs/.lints.json",
        log
    })
        .catch(function () {
            t.strictSame(process.exitCode, 1);

            process.exitCode = 0;
        });
});
