/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/csslint");

test("csslint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve("a {}")
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "CSSLint",
                warnings: [
                    {
                        line: 1,
                        column: 1,
                        message: "Rule is empty.",
                        ruleId: "empty-rules"
                    }
                ]
            },
            "should lint using CSSLint"
        )
    );
});
