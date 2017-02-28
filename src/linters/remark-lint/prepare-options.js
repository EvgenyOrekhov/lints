/*jslint node, es6, maxlen: 80 */

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
