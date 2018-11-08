/*jslint node */

"use strict";

const R = require("ramda");

module.exports = R.evolve({
    plugins: R.map(
        R.pipe(
            R.when(
                R.is(String),
                R.of
            ),
            R.adjust(require, 0)
        )
    )
});
