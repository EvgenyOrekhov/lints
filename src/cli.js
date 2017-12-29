/*jslint node, maxlen: 80 */

"use strict";

const fs = require("fs");

const Bluebird = require("bluebird");
const R = require("ramda");

const lints = require("./lints");
const report = require("./report");
const prettyPrintReport = require("./pretty-print-report");

Bluebird.promisifyAll(fs);

module.exports = function cli({
    rcFile,
    log,
    lintersDirectory
}) {
    return fs
        .readFileAsync(rcFile, "utf8")
        .catch(
            () => fs.readFileAsync(`${__dirname}/default.lints.json`, "utf8")
        )
        .then(JSON.parse)
        .then((config) => lints(config, lintersDirectory))
        .then(report)
        .tap(
            R.pipe(prettyPrintReport, log)
        )
        .then(function setAndReturnExitCode({numbers}) {
            process.exitCode = Number(numbers.totalWarnings > 0);

            return process.exitCode;
        })
        .catch(function setExitCodeTo1AndRethrowError(err) {
            process.exitCode = 1;

            // eslint-disable-next-line fp/no-throw
            throw err;
        });
};
