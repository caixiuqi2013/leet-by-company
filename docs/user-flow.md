# Build a list and start practicing

This is the current user flow for extension **0.5.1**. The website and extension
must use the same configured origin; the local build uses `http://localhost:3000`.
Saving requires configured Supabase credentials, Google sign-in, and an invitation.

## One action from LeetCode

1. Open a company page on `leetcode.com` and choose a recency.
2. Open the LeetByCompany extension at any scroll position.
3. Click **Build list & start practicing** once.
4. The extension opens the website in a new tab immediately, before reading the
   problem pages. The website shows **Building your practice list.**
5. Wait for the list to finish. If asked, sign in with your invited Google account.
   The pending list continues automatically after login.
6. After saving succeeds, the website opens the company's organized practice list
   at the selected recency. Use its topic, difficulty, and completion filters.

Keep the source LeetCode tab open with the same company and recency until reading
finishes. You can close the extension popup. No scrolling is needed; additional
LeetCode search, filters, and sorting are ignored when reading the full recency list.
The extension opens only when the user invokes it.

## What changed from the earlier flow

| Earlier interaction                                                           | Current behavior                                                                                                                         |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Click **Extract problems**, then click **Build list & start practicing**      | A single **Build list & start practicing** click starts a new extraction and opens the website.                                          |
| Export JSON, choose a file on the website, preview it, then click Build again | The extension transfers the completed list automatically. The website has no file picker, manual import preview, or second Build button. |
| Wait in the popup until the list is ready                                     | The website opens before extraction and displays progress while work continues.                                                          |
| Use a separate extension Retry button                                         | After a source failure, return to LeetCode and click **Build list & start practicing** again.                                            |

**Export a backup → Export JSON** remains an optional extension action. It is not
part of building a practice list, and the website no longer has a JSON upload UI.
The popup's small problem preview is diagnostic; it does not require confirmation.

## Loading and completion

The website displays these phases in order:

| Phase   | Website message                      | Behavior                                                                                                                                                                              |
| ------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Reading | **Gathering your problems…**         | Shows an initial connection message, then the number of problems read. A progress bar appears only when a total is available. No estimated percentage or completion time is invented. |
| Saving  | **Organizing and saving your list…** | Validates the complete result and saves it to the signed-in account.                                                                                                                  |
| Opening | **Opening your practice list…**      | Navigates automatically to the existing company practice view.                                                                                                                        |

The extension's primary button shows **Building your list…** and is disabled while
extraction is running. **Cancel** is available during extraction. Partial, cancelled,
or failed results never become a successfully saved practice list.

Opening **Add a list** directly without a pending build displays instructions to
start from the extension. It does not show a file upload control.

## Recovery

| Situation                                                                       | What to do                                                                                                                                          |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sign-in required                                                                | Click **Sign in with Google** on the website. After login, saving resumes without another Build click.                                              |
| Account/database setup missing or saving temporarily unavailable                | The completed list stays in this browser. Finish setup or restore the service, then click the website's **Try again**.                              |
| Build cancelled, interrupted, incomplete, or the source company/recency changed | Return to the intended LeetCode company page and start a new build from the extension. The website's **Try again** does not start a new extraction. |
| A newer build replaced the previous one                                         | Use the website tab opened by the newer build. Only one extension task is retained.                                                                 |
| Build expired                                                                   | Start a new build. The extension handoff expires after 24 hours.                                                                                    |
| Website cannot reach the extension                                              | Use Chrome with LeetByCompany enabled and the configured website origin. Reload the extension and refresh LeetCode after upgrading.                 |

Reload and Google sign-in preserve the pending build in the same browser and
website origin. Once saving succeeds, the website clears its pending payload.
