/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

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

test("csslint", function (t) {
    const lint = makeLinter({
        promisedOptions: Promise.resolve()
    });

    return lint({
        promisedFile: Promise.resolve(`
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
a {font-size: 0;}
`)
    }).then(
        (result) => t.strictSame(
            result,
            {
                linterName: "CSSLint",
                warnings: [
                    {
                        line: 0,
                        column: 0,
                        message: "Too many font-size declarations (10), "
                                + "abstraction needed.",
                        ruleId: "font-sizes"
                    }
                ]
            },
            "should use 0 as the default value for line and column number"
        )
    );
});
