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

            function lintFile(error, data) {
                if (error) {
                    throw error;
                }
                settings.lintAndLogWarnings({
                    data,
                    options,
                    logWarnings
                });
            }

            fs.readFile(file, 'utf8', lintFile);
        }

        function readAndLintFiles(error, files) {
            if (error) {
                throw error;
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
