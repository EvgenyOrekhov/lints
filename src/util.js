/*jslint node */

"use strict";

const R = require("ramda");

module.exports = {
    pipeP: R.pipeWith(R.then)
};
