/*jslint node, es6, maxlen: 80 */
/*eslint "func-names": "off" */

"use strict";

const {test} = require("tap");

const prettyPrintSummary = require("../src/pretty-print-summary");

test("prettyPrintSummary()", function (t) {
    const result = prettyPrintSummary({
        numbers: {
            totalFiles: 15,
            filesWithWarnings: 4,
            totalWarnings: 8
        },
        usedLinters: ["linterA", "linterB"]
    });

    t.strictSame(
        result,
        `Used linters: linterA, linterB

Total files checked: 15
Files with warnings: 4

Total warnings: 8
`,
        "should pretty print summary"
    );

    t.end();
});

test("prettyPrintSummary()", function (t) {
    const resultWithoutFiles = prettyPrintSummary({usedLinters: []});

    t.strictSame(
        resultWithoutFiles,
        "Nothing to check\n",
        "should pretty print if there were no used linters"
    );

    t.end();
});

test("prettyPrintSummary()", function (t) {
    const result = prettyPrintSummary({
        numbers: {
            totalFiles: 15,
            filesWithWarnings: 4,
            totalWarnings: 8
        },
        usedLinters: [
            "linterNameA",
            "linterNameB",
            "linterNameC",
            "longLinterNameD",
            "linterNameE",
            "linterNameF",
            "linterNameG",
            "linterNameH",
            "linterNameI",
            "linterNameJ"
        ]
    });

    t.strictSame(
        result,
        `Used linters: linterNameA, linterNameB, linterNameC, longLinterNameD,
linterNameE, linterNameF, linterNameG, linterNameH, linterNameI, linterNameJ

Total files checked: 15
Files with warnings: 4

Total warnings: 8
`,
        "should wrap lines to 80 characters"
    );

    t.end();
});
