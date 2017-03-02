/*jslint node, es6, maxlen: 80 */

"use strict";

const R = require("ramda");

const prettyPrintWarnings = require("./pretty-print-warnings");
const prettyPrintSummary = require("./pretty-print-summary");

module.exports = function prettyPrintReport(report) {
    return R.pipe(
        R.reject(R.isEmpty),
        R.join("\n")
    )([
        prettyPrintWarnings(report),
        prettyPrintSummary(report)
    ]);
};
