## Problem and change

Describe the concrete problem and the resulting behavior. Link an issue if one exists.

## Verification

List the exact checks performed, their results and any limits. For instruction changes, describe the scenario tried and the agent client used. Mark checks that did not run.

```sh
node --test --test-reporter=tap examples/recipe-access/read-recipe.test.mjs
```

## Review notes

- [ ] Shared examples and evidence use synthetic data only and contain no secrets or private information.
- [ ] Expected outcomes have a source, or assumptions are explicit.
- [ ] Existing scenario IDs and historical evidence are preserved where applicable.
