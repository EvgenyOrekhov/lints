/*jslint node, es6, maxlen: 80 */

"use strict";

const wordwrap = require("wordwrap");

const maxLineLength = 80;

const wrapTo80 = wordwrap(maxLineLength);

module.exports = function prettyPrintSummary({numbers, usedLinters}) {
    return usedLinters.length > 0
        ? wrapTo80(`Used linters: ${usedLinters.join(", ")}

Total files checked: ${numbers.totalFiles}
Files with warnings: ${numbers.filesWithWarnings}

Total warnings: ${numbers.totalWarnings}
`)
        : "Nothing to check\n";
};
