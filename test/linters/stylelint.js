/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/stylelint");

test("stylelint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve("")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "stylelint",
                warnings: [
                    {
                        line: 1,
                        column: 1,
                        message: "Unexpected empty source",
                        ruleId: "no-empty-source"
                    }
                ]
            },
            "should lint using stylelint"
        )
    );
});

test("stylelint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            extends: "stylelint-config-standard",
            rules: {
                "no-missing-end-of-source-newline": false
            }
        })
    });

    return lint({
        promisedFile: Promise.resolve("a {}")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "stylelint",
                warnings: [
                    {
                        line: 1,
                        column: 3,
                        message: "Unexpected empty block",
                        ruleId: "block-no-empty"
                    }
                ]
            },
            "should use options"
        )
    );
});

test("stylelint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            extends: ["stylelint-config-standard"],
            rules: {
                "no-missing-end-of-source-newline": false
            }
        })
    });

    return lint({
        promisedFile: Promise.resolve("a {}")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "stylelint",
                warnings: [
                    {
                        line: 1,
                        column: 3,
                        message: "Unexpected empty block",
                        ruleId: "block-no-empty"
                    }
                ]
            },
            "should understand the \"extends\" property if it is an array"
        )
    );
});

test("stylelint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            rules: {
                "block-no-empty": true
            }
        })
    });

    return lint({
        promisedFile: Promise.resolve("a {}")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "stylelint",
                warnings: [
                    {
                        line: 1,
                        column: 3,
                        message: "Unexpected empty block",
                        ruleId: "block-no-empty"
                    }
                ]
            },
            "should not use stylelint-config-standard if the \"extends\" "
                    + "property is not defined"
        )
    );
});
