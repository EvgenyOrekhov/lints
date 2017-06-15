/*jslint node, es6, maxlen: 80 */

"use strict";

const R = require("ramda");

module.exports = function report(lintsResult) {
    const filesWithWarnings = R.pipe(
        R.map(
            R.reject(
                R.propSatisfies(R.isEmpty, "warnings")
            )
        ),
        R.reject(R.isEmpty)
    )(lintsResult);

    return {
        raw: lintsResult,
        filesWithWarnings,
        numbers: {
            totalFiles: Object.keys(lintsResult).length,
            filesWithWarnings: Object.keys(filesWithWarnings).length,
            totalWarnings: R.pipe(
                R.values,
                R.flatten,
                R.map(
                    R.pipe(
                        R.prop("warnings"),
                        R.length
                    )
                ),
                R.sum
            )(filesWithWarnings)
        },
        usedLinters: R.pipe(
            R.values,
            R.flatten,
            R.map(
                R.prop("linterName")
            ),
            R.uniq
        )(lintsResult)
    };
};
