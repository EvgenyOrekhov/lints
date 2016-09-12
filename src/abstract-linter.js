/*jslint es6, node, maxlen: 80 */

"use strict";

const fs = require("fs");
const glob = require("glob");
const Bluebird = require("bluebird");

const globAsync = Bluebird.promisify(glob);

function logError(err) {
    process.exitCode = 1;
    console.error(err);
}

function parseGlobsAndLintFiles(settings) {
    function lintFiles(options) {
        function readAndLintFile(file) {
            function logWarnings(warnings) {
                if (warnings.length > 0) {
                    console.log();
                    console.log(`${file} (${settings.linterName})`);
                    process.exitCode = 1;
                }
                warnings.forEach(settings.logWarning || console.log);
            }

            function lintFile(data) {
                return settings.lintAndLogWarnings({
                    file,
                    data,
                    options,
                    logWarnings
                });
            }

            return fs
                .readFileAsync(file, "utf8")
                .then(lintFile);
        }

        function parseGlob(globPattern) {
            return globAsync(globPattern, {
                ignore: settings.ignore,
                nodir: true
            });
        }

        const globs = settings.files || [];

        console.log(`Running ${settings.linterName}...`);

        return Bluebird
            .map(globs, parseGlob)
            .reduce((allFiles, files) => allFiles.concat(files), [])
            .each(readAndLintFile)
            .catch(logError);
    }

    return fs
        .readFileAsync(settings.rcFile, "utf8")
        .then(JSON.parse)
        .then(lintFiles, () => lintFiles());
}

Bluebird.promisifyAll(fs);

module.exports = parseGlobsAndLintFiles;
