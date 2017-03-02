/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const report = require("../src/report");

test("report()", function (t) {
    const lintsResult = {
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
            },
            {
                linterName: "linterC",
                warnings: []
            }
        ],
        fileNameB: [
            {
                linterName: "linterC",
                warnings: []
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
    };

    const result = report(lintsResult);

    t.strictSame(
        result,
        {
            raw: lintsResult,
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
            },
            numbers: {
                totalFiles: 3,
                filesWithWarnings: 2,
                totalWarnings: 4
            },
            usedLinters: ["linterA", "linterB", "linterC"]
        },
        "should make a report"
    );

    t.end();
});
