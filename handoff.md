# Session handoff

## Current state: 2026-09-28

- Repository: outputs/leet-by-company; branch codex/leet-by-company.
- Published baseline: 5cc0a3f on GitHub main, release 0.5.1. Prior implementation
  and rename were committed and synchronized; the entries below are historical.
- Current UX: one Build list & start practicing action in the extension starts
  extraction and immediately opens the website loading page. Complete results
  save and open practice automatically; no Extract-first or JSON-upload UI.
- Current local changes: documentation clarification and setup status records.
- Supabase migration and owner invitation have been applied to the authorized
  project. All 10 tables have RLS, anon cannot execute import, service_role can.
- Before User Created hook is enabled; localhost Site URL/callback are configured.
  Direct SQL checks accepted the owner and rejected an uninvited address.
- Google Cloud project leetbycompany was created. OAuth branding/client setup is
  unfinished; the browser form was interrupted while entering app information.
  Re-inspect its current state before continuing. Supabase Google is still disabled.
- Ignored apps/web/.env.local contains the project URL but API keys remain blank.
  Ignored work/ contains setup SQL; do not rerun it on the initialized database.
- No successful OAuth login or authenticated import has been verified yet.
- Latest request: audit/correct docs for the one-click flow. See docs/user-flow.md.
  Next: finish Google setup and local credentials, then verify login/import.

## Historical implementation record (superseded status statements)

## Completed implementation

- A: AGENTS.md, Prettier/ESLint, readable TypeScript, English requirements,
  architecture/API/codebase/deployment guides. Formatting and behavior changes are
  combined in the working diff; unchanged provenance JSON fixtures were restored.
- B: LeetByCompany branding and English extension messages, release 0.5.0.
- C: Company-independent recency parser and DOM scope validation. Every company
  uses heading/URL/visible-recency agreement; rendered source links corroborate
  scope when present. No Google-only conditional remains. Unusual heading/slug
  aliases still fail closed rather than guessing identities.
- D: Next.js/TypeScript/Tailwind dashboard, real JSON preview, company recencies,
  topic/difficulty/completion filters, Uncategorized and distinct totals.
- E: Supabase Google OAuth routes, verified-session invitation checks, migration,
  server-only RPCs, immutable snapshots, atomic import and per-user progress.
- F: Explicit target refresh, newer-version prompt, view-only dismissal, current
  progress in historical versions, conflict warnings and personal version history.
- G: Restricted external Chrome messaging with origin/path/frame/ID/expiry checks;
  one local staged import, retained website pending payload across login redirects.

## Verification actually executed

- pnpm format and pnpm format:check: passed.
- pnpm lint and pnpm typecheck: passed.
- pnpm build: extension 0.5.0 built.
- pnpm test: 86 tests, 85 passed, zero failed, one explicitly skipped.
  TEST-RESULTS.txt contains this session's output.
- pnpm build:web: production compilation, TypeScript and route generation passed.
- Database tests execute the migration on PGlite (embedded PostgreSQL). They cover
  rollback, ownership, idempotency, timestamp conflicts, immutable snapshots,
  progress across companies/history, refresh/no downgrade and invitation revocation.
- Native initdb attempted; sandbox denied shared-memory allocation. The optional
  independent-connection lock-contention test remains skipped, not passed.
- Real local in-app browser upload of checked-in 0.2 export: 152 problems, one
  Uncategorized; pending import survived reload. Narrow layout visually inspected.
- Chrome Goldman Sachs page opened but DOM inspection timed out. No live non-Google
  extraction or extension-to-site handshake was verified this session.

## External dependencies and limitations

- Supabase project URL/keys, Google OAuth settings, invitation rows and production
  origin are not configured. No authenticated end-to-end persistence claim.
- User reports all Google ranges work; historical live artifact is version 0.2.0.
  Mentioned Google_30Days.json version 0.4.0 was not supplied/found. Tests use an
  explicitly synthesized 0.4 metadata variant for compatibility only.
- All canonical source recencies are recognized, unknown ranges rejected. Aliased
  company headings may need additional observed identity evidence.
- Newer shared winner eligibility is checked at refresh; stale offers conflict.
- Filtering currently loads the authorized snapshot before in-memory pagination.
- No outstanding product decisions. Deployment/configuration needs owner action.

## Next steps

1. Review working diff and docs/deployment.md. Configure a local/staging Supabase
   project and Google OAuth when authorized; never paste service keys into chat.
2. Apply reviewed migration only when explicitly requested; seed invited emails.
3. Verify two invited users and one uninvited user through the real website.
4. Verify Goldman Sachs and another company in Chrome, and the extension handoff.
5. Run TEST_DATABASE_URL against a disposable localhost server for real contention.
6. Review/commit changes; publish/deploy only when requested. Rebuild the extension
   with the exact trusted HTTPS website origin before distributing a hosted build.

## Latest update: one-click build flow (0.5.1)

- User superseded the manual-upload/dual-button UX: only Build list & start practicing
  is needed in the extension. Existing practice rendering stays intact.
- worker.ts creates/pins the source task, opens the website, then runs extraction.
  handoff.ts exposes task-bound progress/ready/error states to the trusted origin.
- importer.tsx now polls, shows progress, automatically saves and opens the list.
  build-flow.ts retains the capability or ready payload across reload/login.
  New links supersede old pending payloads. Setup errors are now human-readable.
- Separate Extract problems, Retry and web file-picker/build confirmation removed.
  Optional JSON backup remains in extension details; API import contract unchanged.
- Current run: lint, typecheck, extension build passed; 90 tests passed, 1 skipped.
  Next.js production build and format:check passed. After localhost permission
  was granted, the production server started on port 3000. Browser reload verified
  removal of the file picker/second build button, retention of the user's Microsoft
  pending list, and the readable account/database setup error. Narrow layout checked.
- Changes remain uncommitted, layered on the prior session's uncommitted work.
  No database migrations, deployment, or push performed. Supabase setup remains
  the blocker for a live authenticated automatic-save demonstration.

## Repository rename and publication checkpoint: 2026-09-25

- User requested committing today's implementation and renaming the local and
  GitHub repositories to leet-by-company. GitHub rename is verified by stable
  repository ID 1375172750; local root is now outputs/leet-by-company.
- Origin is https://github.com/caixiuqi2013/leet-by-company.git. Root package name
  and README link match. Original local branch/history remains preserved.
- Publishing uses the connected GitHub app because the local Git credential was
  rejected. The release commit extends origin/main; local release branch will
  be synchronized to the same verified commit and tree after publication.
- Latest checks: format:check, lint, typecheck, extension build and Next.js
  production build passed. Tests: 90 passed, 1 skipped, 0 failed.
- No secret-pattern matches found in commit candidates; only .env.example is
  eligible for commit. Supabase remains unconfigured; no deployment or migration.
- Next step remains Supabase/Google setup and authenticated end-to-end validation.

## Supabase setup checkpoint: 2026-09-28

- User created project qeswonfxsxicfqbmtpoy and explicitly requested setup.
- User supplied the Google account for the application's invitation list; it is
  included only in the ignored work/supabase-setup.sql, not tracked documentation.
- Verified 001_leetbycompany.sql is present (227 lines, 16049 bytes). Earlier
  conversation links used the old repository folder; opened the correct file.
- Created ignored apps/web/.env.local with APP_URL=http://localhost:3000 and the
  supplied Supabase URL. Both API key values remain empty. File permissions: 0600.
- Prepared ignored work/supabase-preflight.sql (read-only schema inspection) and
  work/supabase-setup.sql (existing migration plus owner invitation in one transaction).
  Neither has been executed remotely. Inspect the existing schema before setup.
- Chrome tab discovery/claiming works, but dashboard DOM and screenshots fail with
  debugger-unattached/timeouts, including a fresh tab. Requested browser extension
  reconnection. No remote database, OAuth, invitation, or Auth setting changed.
- Next: restore browser connection; inspect schema; apply setup if empty; configure
  localhost callback, invitation Auth hook, Google provider, and local API keys;
  then verify real invited-user login and import. No Google OAuth client verified.

## Documentation correction: 2026-09-28

- Audited current popup, worker, handoff, importer, and build-flow implementation.
- Added docs/user-flow.md with exact controls, loading phases, automatic navigation,
  no manual upload/second confirmation, optional backup, and distinct retry paths.
- Updated README, web README, requirements, architecture, codebase and API guides.
- Marked the old preview/file-picker validation as historical and reconciled setup
  status with the remote migration and Auth changes actually completed today.
- Application behavior is unchanged by this documentation update.
- Documentation validation: format:check, git diff --check, and relative-link
  existence checks passed. No runtime changes; application tests were not rerun.

## Documentation publication checkpoint: 2026-09-28

- User requested publishing the documentation corrections to GitHub.
- Publication scope is ten documentation files, including docs/user-flow.md.
  Local environment credentials and setup SQL remain ignored and excluded.
- Publish through the connected GitHub app, then fetch and verify the commit tree
  before synchronizing the local branch. Supabase/Google setup remains unfinished
  as described in the current status above.
