# Security Review Ledger

Use this Agent Skill to answer two questions about a software change. **What did we check, and with what evidence? Which known risks still need a check?** Each scenario has a stable ID so the next reviewer can follow it across revisions.

The [working example](examples/recipe-access/review.md) covers two kitchens using the same recipe service. The tests exercise the handler with synthetic sessions. The report separately tracks how the real login system would supply those sessions and how a cache would behave between requests.

## Use the skill

From the project you want to review, choose the relevant client when prompted.

```sh
npx skills add goAuD/security-review-ledger --skill security-review-ledger
```

With a local checkout, first discover the skill from the repository root.

```sh
npx skills add . --list
```

The [CLI](https://github.com/vercel-labs/skills) requires Node.js 22.20 or later at the time of writing. For a manual installation, copy the entire [skill folder](skills/security-review-ledger) into the project skill directory documented by your client. You can also give an agent the folder and ask it to follow its instructions. The review itself uses Markdown and the tools already available in the target project.

An example request:

> Use Security Review Ledger to review access to one recipe across two kitchens. Read the requirement, run the available local checks, and show the evidence alongside the known gaps. Keep any production assumptions explicit.

## What goes into a review

[SKILL.md](skills/security-review-ledger/SKILL.md) contains the operating contract. A reviewer binds each scenario to a source and version, describes the test or inspection, records the observed outcome and preserves earlier attempts. Its two output tables index a single set of scenario records. A failed check or a partially covered scenario can appear in both tables.

- [Ledger template](skills/security-review-ledger/assets/ledger-template.md) — fields for the procedure, expected and observed result, evidence, bounds and next check.
- [Standards references](skills/security-review-ledger/references/standards.md) — ISO/IEC 27034-1 for context, NIST SSDF for testing practice and OWASP ASVS for selected web application requirements. The mappings describe the scope of individual checks.
- [Magyar átadó / Hungarian handoff for VS Code](docs/HANDOFF.hu.md) — decisions and the first local exercise.

## Run the example

Use Node.js 22.20 or later from the root. The example calls the handler in memory, uses the built-in test runner and requires no package installation or server.

```sh
node --test --test-reporter=tap examples/recipe-access/read-recipe.test.mjs
```

Compare the named assertions with [the recorded run](examples/recipe-access/evidence/run.tap) and the [sample ledger](examples/recipe-access/review.md). Keep private application reports in an authorized location. The files here contain synthetic data.

## Distribution

The skill follows the [open Agent Skills format](https://agentskills.io/specification). Clients that implement the format can load its instructions. Tool availability determines which checks they can run. The [skills.sh directory](https://skills.sh/docs/faq) uses CLI installation telemetry for discovery. A public GitHub install and a visible directory listing are separate milestones.

## License

[MIT](LICENSE)
