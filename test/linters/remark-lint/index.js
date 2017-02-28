/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../../src/linters/remark-lint");

test("remark-lint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve(`# a
# b #`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "remark-lint",
                warnings: [
                    {
                        line: 2,
                        column: 1,
                        message: "Headings should use atx",
                        ruleId: "heading-style"
                    },
                    {
                        line: 1,
                        column: 1,
                        message: "Missing newline character at end of file",
                        ruleId: "final-newline"
                    }
                ]
            },
            "should lint using remark-lint"
        )
    );
});

test("remark-lint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            plugins: [
                "remark-preset-lint-consistent",
                "remark-preset-lint-recommended",
                ["remark-lint-final-newline", false]
            ]
        })
    });

    return lint({
        promisedFile: Promise.resolve(`# a
# b #`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "remark-lint",
                warnings: [
                    {
                        line: 2,
                        column: 1,
                        message: "Headings should use atx",
                        ruleId: "heading-style"
                    }
                ]
            },
            "should use options"
        )
    );
});

test("remark-lint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            plugins: [
                ["remark-lint-list-item-indent", "tab-size"]
            ]
        })
    });

    return lint({
        promisedFile: Promise.resolve(`- a`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "remark-lint",
                warnings: [
                    {
                        line: 1,
                        column: 3,
                        message: "Incorrect list-item indent: add 2 spaces",
                        ruleId: "list-item-indent"
                    }
                ]
            },
            "should use options with options"
        )
    );
});

test("remark-lint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            plugins: [
                ["remark-lint-final-newline", ["error"]],
                ["remark-lint-list-item-indent", ["error", "tab-size"]]
            ]
        })
    });

    return lint({
        promisedFile: Promise.resolve("- a")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "remark-lint",
                warnings: [
                    {
                        line: 1,
                        column: 1,
                        message: "Missing newline character at end of file",
                        ruleId: "final-newline"
                    },
                    {
                        line: 1,
                        column: 3,
                        message: "Incorrect list-item indent: add 2 spaces",
                        ruleId: "list-item-indent"
                    }
                ]
            },
            "should use options with severity"
        )
    );
});
