/*jslint node */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/markdownlint");

test("markdownlint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve("a\n")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "markdownlint",
                warnings: [
                    {
                        line: 1,
                        column: 0,
                        message: (
                            "First line in file should be a top level "
                            + "heading"
                        ),
                        ruleId: "first-line-heading"
                    }
                ]
            },
            "should lint using markdownlint"
        )
    );
});

test("markdownlint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve(`# a

`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "markdownlint",
                warnings: [
                    {
                        line: 3,
                        column: 0,
                        message: (
                            "Multiple consecutive blank lines "
                            + "(Expected: 1; Actual: 2)"
                        ),
                        ruleId: "no-multiple-blanks"
                    }
                ]
            },
            "should use the \"errorDetail\" property if exists"
        )
    );
});

test("markdownlint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({"first-line-h1": false})
    });

    return lint({
        promisedFile: Promise.resolve(`a
`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "markdownlint",
                warnings: []
            },
            "should use options"
        )
    );
});
