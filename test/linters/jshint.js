/*jslint node, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/jshint");

test("jshint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({white: true})
    });

    return lint({
        promisedFile: Promise.resolve("var a = 123 ")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "JSHint",
                warnings: [
                    {
                        line: 1,
                        column: 12,
                        message: "Missing semicolon.",
                        ruleId: "W033"
                    }
                ]
            },
            "should lint using JSHint"
        )
    );
});
