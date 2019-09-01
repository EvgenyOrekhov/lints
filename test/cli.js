/*jslint node */
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

Used linters: JSLint

Total files checked: 1
Files with warnings: 1

Total warnings: 1
`,
            "should log warnings and summary"
        );
    }

    return cli({
        rcFile: "test/stubs/.lints.json",
        log,
        lintersDirectory: "./linters/"
    // eslint-disable-next-line promise/always-return
    }).then(function (exitCode) {
        t.strictSame(exitCode, 1);
        t.strictSame(process.exitCode, 1);

        process.exitCode = 0;
    });
});

test("cli()", function (t) {
    t.plan(1);

    function log() {
        // eslint-disable-next-line fp/no-throw
        throw new Error("Mock error");
    }

    return cli({
        rcFile: "test/stubs/.lints.json",
        log,
        lintersDirectory: "./linters/"
    }).catch(function () {
        t.strictSame(process.exitCode, 1);

        process.exitCode = 0;
    });
});

test("cli()", function (t) {
    t.plan(3);

    function log(result) {
        return t.strictSame(
            result,
            "Nothing to check\n",
            "should log summary"
        );
    }

    return cli({
        rcFile: "test/stubs/.lints-nothing-to-check.json",
        log,
        lintersDirectory: "./linters/"
    // eslint-disable-next-line promise/always-return
    }).then(function (exitCode) {
        t.strictSame(exitCode, 0);
        t.strictSame(process.exitCode, 0);
    });
});

test("cli()", function (t) {
    t.plan(3);

    function log(result) {
        return t.match(
            result,
            (
                "Used linters: JSLint, JSHint, ESLint, dockerfilelint, "
                + "markdownlint,\nremark-lint"
            ),
            "should use default.lints.json if .lints.json is not found"
        );
    }

    return cli({
        rcFile: "nonexistent",
        log,
        lintersDirectory: "./linters/"
    // eslint-disable-next-line promise/always-return
    }).then(function (exitCode) {
        t.strictSame(exitCode, 1);
        t.strictSame(process.exitCode, 1);

        process.exitCode = 0;
    });
});
