/*jslint node */
/*eslint-disable func-names */

"use strict";

const {test} = require("tap");
const consistentPreset = require("remark-preset-lint-consistent");
const recommendedPreset = require("remark-preset-lint-recommended");
const listItemIndentRule = require("remark-lint-list-item-indent");

const prepareOptions = require(
    "../../../src/linters/remark-lint/prepare-options"
);

test("remark-lint/prepareOptions()", function (t) {
    const result = prepareOptions({
        plugins: [
            "remark-preset-lint-consistent",
            ["remark-preset-lint-recommended"],
            ["remark-lint-list-item-indent", false],
            ["remark-lint-list-item-indent", true],
            ["remark-lint-list-item-indent", "tab-size"],
            ["remark-lint-list-item-indent", ["error"]],
            ["remark-lint-list-item-indent", ["error", "tab-size"]]
        ]
    });

    t.strictSame(
        result,
        {
            plugins: [
                [consistentPreset],
                [recommendedPreset],
                [listItemIndentRule, false],
                [listItemIndentRule, true],
                [listItemIndentRule, "tab-size"],
                [listItemIndentRule, ["error"]],
                [listItemIndentRule, ["error", "tab-size"]]
            ]
        },
        "should prepare remark-lint options"
    );

    t.end();
});
