# Session handoff

## Current state: 2026-10-01

- Repository: outputs/leet-by-company; branch codex/leet-by-company.
- Published baseline: f990fd2 on GitHub main, release 0.5.1. Prior implementation
  and rename were committed and synchronized; the entries below are historical.
- Current UX: one Build list & start practicing action in the extension starts
  extraction and immediately opens the website loading page. Complete results
  save and open practice automatically; no Extract-first or JSON-upload UI.
- Current publication scope: grouped practice lists, study-plan topic ordering,
  regression tests, architecture and setup status documentation.
- Supabase migration and owner invitation have been applied to the authorized
  project. All 10 tables have RLS, anon cannot execute import, service_role can.
- Before User Created hook is enabled; localhost Site URL/callback are configured.
  Direct SQL checks accepted the owner and rejected an uninvited address.
- Google Cloud project leetbycompany has OAuth branding and a Web application
  client named LeetByCompany Supabase. User accepted Google's policy and explicitly
  approved client creation and credential transfer. The exact Supabase callback
  is configured. Google Enabled was verified in Supabase on September 28.
- Google testing audience/test users and a real sign-in still need verification.
- Ignored apps/web/.env.local contains the project URL and working API keys.
  Ignored work/ contains setup SQL; do not rerun it on the initialized database.
- No successful OAuth login or authenticated import has been verified yet.
- Latest request: commit and publish the completed practice-view changes.
  Remaining verification: authenticated visual review and end-to-end login/import.

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

## Architecture consolidation: 2026-09-28

- Replaced the architecture overview with the implemented one-click build,
  immediate loading page, progress, automatic save, and practice navigation.
- Merged the user-flow and recovery guide into docs/architecture.md, removed
  docs/user-flow.md, and redirected its documentation links to the new section.
- Kept the actual 24-hour task access expiry in the internal extension boundary
  explanation, rather than presenting local staging as a user-facing workflow.
- Documentation-only update; no runtime behavior changed.
- Validation: pnpm format:check, git diff --check, and relative documentation
  link checks passed. Application tests were not rerun for this docs-only change.
- User authorized publishing this consolidation to GitHub main. Publication
  includes the obsolete guide deletion and updated links; local secrets remain
  excluded. Verify the published tree before synchronizing the local branch.

## Setup resumption: 2026-09-28

- Architecture consolidation was published as f990fd2 and the local branch was
  synchronized with a clean tree before resuming setup.
- Opened the existing Google Cloud project OAuth overview. Chrome tab discovery
  works, but page reads time out; the alternate DOM reader reports debugger
  unattached. Requested reconnection of the Codex browser extension.
- No remote setup changes made during this resumption. Existing database setup
  must not be rerun. Next: inspect OAuth status, complete Google configuration,
  configure local Supabase keys, then verify real sign-in and list saving.
- After user reconnection, Supabase is readable; a fresh Google Cloud tab also
  works. Google OAuth is not configured. Prepared LeetByCompany branding with
  External/testing audience and the owner's support/contact email. Stopped at
  Google's User Data Policy agreement; explicit confirmation is pending.
- Confirmed Supabase Google provider is disabled and its callback is
  https://qeswonfxsxicfqbmtpoy.supabase.co/auth/v1/callback. The visible Client IDs
  field contains the project name rather than an OAuth client ID; replace it
  with the actual client ID once created. No provider settings saved this turn.
- Local environment file remains ignored, mode 0600, with both API keys empty.
- User accepted Google's policy and created the OAuth branding configuration;
  verified the success message and absence of OAuth clients. Prepared a Web
  application client named LeetByCompany Supabase with the exact Supabase callback
  above and no JavaScript origins. Creation has not been submitted. Awaiting
  confirmation to create persistent credentials, transfer them to this Supabase
  project, and enable Google sign-in. No client secret exists yet in this workflow.

## Google provider completion and resumption: 2026-09-30

- September 28: created the authorized OAuth client, transferred its generated
  ID/secret directly to Supabase, and verified Google Enabled. Nonce checks remain
  required and email-less accounts remain disallowed. No secret was printed or
  committed. This supersedes the pending client-creation checkpoint above.
- September 30: verified local keys are still empty. Chrome tab discovery works,
  but existing-tab access and a fresh settings tab time out. Requested browser
  extension reconnection; no remote changes made during this resumption yet.
- Next: configure local API keys, verify OAuth testing access and Google login,
  then verify authenticated list saving. Do not rerun the database migration.
- Reconnection did not restore page control: a fresh tab and stable Chrome-name
  binding still timed out. Opened the ignored .env.local for direct user entry
  of the publishable and service_role keys, avoiding further reconnect loops.
  No keys have been copied and no new remote settings changed in this attempt.

## Local Supabase connection verified: 2026-09-30

- User opened API Keys and authorized continuing. Copied existing publishable and
  server secret keys directly into ignored apps/web/.env.local (mode 0600).
  The existing SUPABASE_SERVICE_ROLE_KEY variable now holds an sb_secret key;
  the Supabase client accepts it and it remains server-only. No key rotation.
- Live checks: Auth settings HTTP 200 with Google enabled; read-only database
  request with the server key HTTP 200. No database rows were changed by checks.
- pnpm build:web passed. Production server started on localhost:3000 (session
  42341). /auth/login responds HTTP 302 instead of configuration failure.
- Browser control detached again on app reload. Completed OAuth login and saved
  import remain unverified; user can now sign in from the local app. Google
  testing audience may still need the owner added if Google blocks login.

## Full topic practice list: 2026-09-30

- Replaced the 50-row practice table and pagination with expanded, collapsible
  source-topic sections showing completion counts and difficulty labels.
- Kept topic, difficulty and completion dropdowns. All matching problems render;
  multi-topic problems appear in each matching section with shared completion.
  Overall counts remain distinct; no algorithm classification is inferred.
- Added grouping tests covering 151 problems, source order, missing topics,
  overlapping tags, deduplication and combined filters. Updated architecture.md.
- Lint, typecheck, extension build passed; tests: 92 passed, one skipped. Production
  web build, formatting, and git diff --check passed.
- Authenticated browser visual verification is not yet performed for this layout.

## Practice view resumption: 2026-10-01

- Restarted the production app with network permission; localhost:3000 is ready
  (session 72433). Company Microsoft route responds HTTP 200.
- Browser showed the old connection-refused page before restart. Reload and the
  subsequent page read timed out, so authenticated visual verification remains
  unavailable. No claim that the live grouped data or completion UI was verified.
- The implementation and previously passing checks are unchanged. Changes remain
  local and uncommitted. User can refresh the company page to review the layout.

## Study plan topic ordering: 2026-10-01

- Sections and topic dropdown now share Top Interview 150 priority order, followed
  by other topics alphabetically. Explicit sorting aliases handle source tag names
  such as Hash Table and Heap (Priority Queue). Source labels/membership unchanged.
- Official study-plan browser reads timed out; public HTML did not expose section
  data. Cross-checked the 23-topic sequence against the study-plan repository
  JawadSher/LeetCode-Top-Interview-150-Problems; no live reference verification claim.
- Added regression coverage for ordering in both projections, remaining topics,
  unchanged input tags, and filtering a non-priority topic.
- Validation passed: lint, typecheck, extension build, web production build,
  formatting and diff checks; tests 93 passed, one skipped. Restarted local app
  to serve the new ordering. Changes remain uncommitted and have not been pushed.

## Practice list publication: 2026-10-01

- User authorized committing and publishing all current implementation changes.
- Scope: grouped full-list view, shared study-plan ordering, regression tests, and
  documentation. Local environment keys and setup SQL remain ignored/excluded.
- Validation from the completed implementation: lint, typecheck, extension/web
  builds and formatting passed; 93 tests passed, one skipped.
- Publish through the GitHub connector, then verify the tree and synchronize the
  local branch. Browser visual verification remains limited as recorded above.
