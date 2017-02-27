/*jslint node, es6, maxlen: 80 */

"use strict";

const {test} = require("tap");

const makeLinter = require("../../src/linters/htmlhint");

test("htmlhint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve(`invalid`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "HTMLHint",
                warnings: [
                    {
                        line: 1,
                        column: 1,
                        message: "Doctype must be declared first.",
                        ruleId: "doctype-first"
                    }
                ]
            },
            "should lint using HTMLHint"
        )
    );
});
