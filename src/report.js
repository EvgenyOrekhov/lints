/*jslint node */

"use strict";

const R = require("ramda");

function getProperty(propertyName) {
    return R.pipe(
        R.values,
        R.flatten,
        R.map(
            R.prop(propertyName)
        )
    );
}

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
                getProperty("warnings"),
                R.flatten,
                R.length
            )(filesWithWarnings)
        },
        usedLinters: R.pipe(
            getProperty("linterName"),
            R.uniq
        )(lintsResult)
    };
};
