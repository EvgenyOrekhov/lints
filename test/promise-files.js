/*jslint node */
/*eslint-disable func-names */

"use strict";

const {test} = require("tap");

const promiseFiles = require("../src/promise-files");

test("promiseFiles()", function (t) {
    const result = promiseFiles({
        fileLinters: {
            "test/stubs/text.txt": ["linter"]
        }
    });

    t.match(
        result,
        {
            fileLinters: {
                "test/stubs/text.txt": ["linter"]
            }
        },
        "should not modify original properties"
    );

    return result.promisedFiles["test/stubs/text.txt"].then(
        (file) => t.strictSame(
            file,
            "some text\n",
            "should resolve to file contents"
        )
    );
});
