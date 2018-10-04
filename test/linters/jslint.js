/*jslint node, maxlen: 80, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/jslint");

test("jslint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve({white: true})
    });

    return lint({
        promisedFile: Promise.resolve("var a = 123 ")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "JSLint",
                warnings: [
                    {
                        line: 0,
                        column: 11,
                        message: "Expected ';' and instead saw '(end)'.",
                        ruleId: "expected_a_b"
                    }
                ]
            },
            "should lint using JSLint"
        )
    );
});
