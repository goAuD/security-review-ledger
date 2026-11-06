# Releases

This directory holds the text for GitHub Releases. A note in this directory is preparation, not evidence that a release has been published. Published versions are listed on the [GitHub Releases page](https://github.com/goAuD/security-review-ledger/releases).

- [v0.1.0 — initial public release](v0.1.0.md)

The first version is `0.1.0`: the workflow is usable, while the instructions and ledger format may still evolve. Keep each release's changes and compatibility limits in its own note. A separate changelog would duplicate these notes.

## Maintainer procedure

1. Review the complete diff, run the example command from [CONTRIBUTING.md](../CONTRIBUTING.md), and check links from the files that will actually be committed. Preserve historical evidence; append a new run when its target or environment changes. Update the release note with what was verified and what remains open.
2. Commit and push the reviewed changes. On GitHub, wait for every **Example checks** job to succeed for that exact commit. Check that the working tree is clean, `HEAD` is the intended release commit, and the tag does not already exist. Then create and push an annotated tag:

   ```sh
   git tag -a v0.1.0 -m "Security Review Ledger v0.1.0"
   git push origin v0.1.0
   ```

3. From a fresh temporary project, test the tagged installation below and compare the installed skill files with that tag:

   ```sh
   npx skills add goAuD/security-review-ledger@v0.1.0 --skill security-review-ledger
   ```

   Return to the repository root before creating the GitHub Release draft from the existing tag:

   ```sh
   gh release create v0.1.0 --repo goAuD/security-review-ledger --verify-tag --draft --title "v0.1.0 — Security Review Ledger" --notes-file releases/v0.1.0.md
   ```

   Review the draft on GitHub. Replace its pending-verification paragraph with the successful CI run URL and the tagged installation's CLI version, client, environment and result. Publish only once those checks have completed successfully.

   The tag syntax is documented by the [skills CLI](https://github.com/vercel-labs/skills/blob/main/docs/commands.md). The installation check itself is still required for the chosen release. GitHub supplies source archives for the tag; this Markdown skill does not need a separate build or hand-made ZIP.

For later releases, replace the version and note path. Never move a published tag to different code. Keep published notes intact and document subsequent changes in the next version.
