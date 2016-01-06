/*jslint es6, node, maxlen: 80 */

'use strict';

const fs = require('fs');

function requireAndRunLinters(err, data) {
    const config = err
        ? require('./default.lints.json')
        : JSON.parse(data);

    function requireAndRunLinter(linterName) {
        const linter = require(`./linters/${linterName}.js`);

        linter(config[linterName]);
    }

    Object.keys(config).forEach(requireAndRunLinter);
}

fs.readFile(`${process.cwd()}/.lints.json`, 'utf8', requireAndRunLinters);
