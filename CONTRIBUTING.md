# Contributing

Contributions to the skill, examples and documentation are welcome. You do not need a collaborator invitation: fork this repository and open a pull request.

## Start small

- Add a synthetic example showing a `partial` result or a `recheck-needed` update while preserving the earlier evidence.
- Run the workflow in an actual agent client and document the client version, target revision, steps, observed results and limits. Installing files alone does not demonstrate that the workflow ran.
- Clarify an instruction that led to an ambiguous or unsupported review conclusion.

Use [Discussions](https://github.com/goAuD/security-review-ledger/discussions) for questions, experiences and early ideas. Use an [issue](https://github.com/goAuD/security-review-ledger/issues/new/choose) to describe a larger concrete change before implementing it. Small fixes can go straight to a pull request.

## Make a change

1. Fork the repository, clone your fork and create a branch:

   ```sh
   git switch -c improve-ledger-example
   ```

2. Read [the skill](skills/security-review-ledger/SKILL.md) and [the example requirement](examples/recipe-access/requirement.md). Keep the change focused. Use English for shared instructions and documentation; generated reviews use the user's language.

   Use an EditorConfig-aware editor to keep UTF-8, LF line endings and two-space indentation. [.editorconfig](.editorconfig) controls editing defaults; [.gitattributes](.gitattributes) keeps checked-out text consistent across platforms. File digests in recorded reviews refer to exact bytes.

3. Run the example from the repository root with Node.js 22.20 or later:

   ```sh
   node --test --test-reporter=tap examples/recipe-access/read-recipe.test.mjs
   ```

   For instruction or template changes, also try one relevant scenario with an agent. Record what actually ran and what remains unverified. If you cannot run a check, explain that in the pull request.

4. Commit and push your branch to your fork, then open a pull request against `main`. Explain the problem, the resulting behavior and the checks performed.

The [main branch ruleset](https://github.com/goAuD/security-review-ledger/rules/26684736) requires a pull request, an up-to-date branch, all four recipe-example CI checks and resolved review conversations before merging. Force pushes and deletion of `main` are blocked, with no bypass actors. The required approval count is currently zero so the solo maintainer can merge their own pull requests after checks pass.

If a change renames CI jobs or changes the Node.js matrix, coordinate the required check names in the ruleset with the maintainer so merges do not wait for a check that no longer runs.

## Preserve the review contract

- State the source of an expected outcome. Label assumptions explicitly.
- Keep stable scenario IDs and historical attempts. Add new evidence instead of rewriting an old run as if it were fresh.
- Distinguish source inspection, installation and actual workflow execution. A green example test does not establish complete security coverage.
- Use synthetic data only in contributions, screenshots and logs. Remove secrets, real identities, private paths and customer information before sharing.
- Keep discussions respectful and specific. Explain disagreements using requirements or evidence.

Report security concerns through [SECURITY.md](SECURITY.md). Maintainers follow the [release instructions](releases/README.md) when publishing a version.
