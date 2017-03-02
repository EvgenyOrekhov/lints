/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const prettyPrint = require("../src/pretty-print");

test("prettyPrint()", function (t) {
    const result = prettyPrint({
        filesWithWarnings: {
            fileNameA: [
                {
                    linterName: "linterA",
                    warnings: [
                        {
                            line: 4,
                            column: 2,
                            message: "Warning message",
                            ruleId: "ruleId"
                        }
                    ]
                },
                {
                    linterName: "linterB",
                    warnings: [
                        {
                            line: 2,
                            column: 3,
                            message: "Another warning message",
                            ruleId: "anotherRuleId"
                        }
                    ]
                }
            ],
            fileNameC: [
                {
                    linterName: "linterA",
                    warnings: [
                        {
                            line: 1,
                            column: 6,
                            message: "Warning message",
                            ruleId: "ruleId"
                        },
                        {
                            line: 1,
                            column: 5,
                            message: "Warning message",
                            ruleId: "ruleId"
                        }
                    ]
                }
            ]
        }
    });

    t.strictSame(
        result,
        `fileNameA (linterA)
    line 4 column 2
        Warning message (ruleId)

fileNameA (linterB)
    line 2 column 3
        Another warning message (anotherRuleId)

fileNameC (linterA)
    line 1 column 6
        Warning message (ruleId)
    line 1 column 5
        Warning message (ruleId)
`,
        "should pretty print file warnings"
    );

    t.end();
});

test("prettyPrint()", function (t) {
    const resultWithoutFiles = prettyPrint({filesWithWarnings: {}});

    t.strictSame(
        resultWithoutFiles,
        "",
        "should pretty print if there are no files with warnings"
    );

    t.end();
});
