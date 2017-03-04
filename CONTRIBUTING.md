<!-- markdownlint-disable line-length -->

<!--lint disable list-item-content-indent-->

# Contributing

1. **Fork**
2. **Clone**

        git clone https://github.com/<your-username>/lints.git
3. **Configure remotes**

        cd lints
        git remote add upstream https://github.com/EvgenyOrekhov/lints.git
4. **Branch**

        git checkout -b my-feature-branch -t origin/master
5. **Commit**
6. **Rebase**

        git fetch upstream
        git rebase upstream/master
7. **Push**

        git push origin my-feature-branch
8. **[Open a pull request](https://help.github.com/articles/using-pull-requests/ "Using pull requests · GitHub Help")**

## Code style

The names of the functions should start with a verb: `function doSomething() {`.

The names of the variables and constants should not contain verbs:
`const someConstant`.

Prefer `const` over `var`/`let`.

A line should not exceed the 80-character limit.

There must be exactly one blank line at the end of every text file.

### By creating a pull request, you agree that your code will be licensed under the [MIT license](LICENSE) by the project owners
