/*jslint es6, node, maxlen: 80 */

"use strict";

const fs = require("fs");
const glob = require("glob");
const Bluebird = require("bluebird");

const globAsync = Bluebird.promisify(glob);

function throwError(err) {
    process.exitCode = 1;
    console.error(err);

    throw err;
}

function parseGlobsAndLintFiles(settings) {
    function lintFiles(options) {
        function readAndLintFile(file) {
            function logWarnings(warnings) {
                if (warnings.length > 0) {
                    console.log();
                    console.log(file);
                    process.exitCode = 1;
                }
                warnings.forEach(settings.logWarning || console.log);
            }

            function lintFile(data) {
                settings.lintAndLogWarnings({
                    file,
                    data,
                    options,
                    logWarnings
                });
            }

            fs
                .readFileAsync(file, "utf8")
                .then(lintFile)
                .catch(throwError);
        }

        function parseGlob(globPattern) {
            return globAsync(globPattern, {ignore: settings.ignore});
        }

        const globs = settings.files || [];

        Bluebird
            .map(globs, parseGlob)
            .reduce((allFiles, files) => allFiles.concat(files), [])
            .each(readAndLintFile)
            .catch(throwError);
    }

    fs
        .readFileAsync(settings.rcFile, "utf8")
        .then(JSON.parse)
        .then(lintFiles)
        .catch(() => lintFiles());
}

Bluebird.promisifyAll(fs);

module.exports = parseGlobsAndLintFiles;
