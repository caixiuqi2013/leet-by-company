# LeetByCompany website

Next.js + TypeScript + Tailwind, with server-side Supabase authentication and RPCs.
Run `pnpm dev:web` from the repository root.

Click **Build list & start practicing** in the Chrome extension. It starts a new
extraction and immediately opens `/import`, which shows **Gathering your problems…**,
then **Organizing and saving your list…**, then **Opening your practice list…**.
After a successful save, it navigates to `/company/<slug>?recency=<canonical-key>`.

There is no JSON file picker, manual import preview, or second Build button. A
visit to `/import` without pending work explains how to start from the extension.
Pending work survives reload and Google login in the same browser. Website
**Try again** resumes pending work; source failures need a new extension build.

Saving requires `.env.local`, the database migration, and an invited Google account.
See the [user flow](../../docs/architecture.md#user-flow-and-recovery), [setup instructions](../../docs/deployment.md),
and [codebase guide](../../docs/codebase-guide.md).
