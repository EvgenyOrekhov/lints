/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/eslint");

test("eslint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve("var a = 123 ")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "ESLint",
                warnings: [
                    {
                        line: 1,
                        column: 5,
                        message: "'a' is assigned a value but never used.",
                        ruleId: "no-unused-vars"
                    }
                ]
            },
            "should lint using ESLint"
        )
    );
});

test("eslint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            rules: {
                semi: "error"
            }
        })
    });

    return lint({
        promisedFile: Promise.resolve("var a = 123 ")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "ESLint",
                warnings: [
                    {
                        line: 1,
                        column: 12,
                        message: "Missing semicolon.",
                        ruleId: "semi"
                    }
                ]
            },
            "should use options"
        )
    );
});
