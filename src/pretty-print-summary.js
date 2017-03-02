/*jslint node, es6, maxlen: 80 */

"use strict";

const wordwrap = require("wordwrap");
const chalk = require("chalk");

const maxLineLength = 80;

const wrapTo80 = wordwrap(maxLineLength);

module.exports = function prettyPrintSummary({numbers, usedLinters}) {
    if (usedLinters.length === 0) {
        return "Nothing to check\n";
    }

    const color = numbers.totalWarnings > 0
        ? chalk.red
        : chalk.green;

    const totalWarningsMessage = color(
        `Total warnings: ${numbers.totalWarnings}`
    );

    return wrapTo80(
        `Used linters: ${usedLinters.join(", ")}

Total files checked: ${numbers.totalFiles}
Files with warnings: ${numbers.filesWithWarnings}

${totalWarningsMessage}
`
    );
};
