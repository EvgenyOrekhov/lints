/*jslint es6, node, maxlen: 80 */

'use strict';

const fs = require('fs');
const glob = require('glob');

function parseGlobsAndLintFiles(settings) {
    const globs = settings.files || [];

    function parseOptionsAndLint(err, optionsAsData) {
        const options = err
            ? undefined
            : JSON.parse(optionsAsData);

        function readAndLintFile(file) {
            function logWarnings(warnings) {
                if (warnings.length > 0) {
                    console.log();
                    console.log(file);
                    process.exitCode = 1;
                }
                warnings.forEach(settings.logWarning || console.log);
            }

            function lintFile(err, data) {
                if (err) {
                    throw err;
                }
                settings.lintAndLogWarnings({
                    data: data,
                    options: options,
                    logWarnings: logWarnings
                });
            }

            fs.readFile(file, 'utf8', lintFile);
        }

        function readAndLintFiles(err, files) {
            if (err) {
                throw err;
            }
            files.forEach(readAndLintFile);
        }

        function parseGlobAndLintFiles(globPattern) {
            glob(
                globPattern,
                {
                    ignore: settings.ignore
                },
                readAndLintFiles
            );
        }

        globs.forEach(parseGlobAndLintFiles);
    }

    if (settings.rcFile) {
        return fs.readFile(settings.rcFile, 'utf8', parseOptionsAndLint);
    }

    parseOptionsAndLint(true);
}

module.exports = parseGlobsAndLintFiles;
