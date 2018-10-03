/*jslint node, maxlen: 80 */
/*eslint "func-names": "off" */

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

test("eslint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({
            parserOptions: {
                ecmaVersion: 2018,
                sourceType: "module"
            },
            plugins: ["import"],
            rules: {
                "import/extensions": [
                    "error",
                    "always",
                    {js: "never"}
                ]
            }
        })
    });

    return lint({
        promisedFile: Promise.resolve(`import eslint from "./eslint";`),
        fileName: __filename
    }).then(
        (result) => t.strictSame(
            result.warnings,
            [],
            "should pass file name to ESLint"
        )
    );
});
