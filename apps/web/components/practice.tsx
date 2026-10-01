'use client';
/** Practice and history share current per-problem completion state. */
import { useEffect, useState } from 'react';
import { api, errorText } from '../lib/client';
import { RECENCIES } from '../../../packages/shared/src/recency';
import {
  groupProblems,
  summarize,
  type PracticeProblem,
} from '../lib/practice';
type List = {
  listId: string;
  company: { slug: string; name: string };
  recencyKey: string;
  snapshotId: string;
  currentSnapshotId: string;
  extractedAt: string;
  problems: PracticeProblem[];
  versions: {
    snapshotId: string;
    selectedAt: string;
    extractedAt: string;
    selectionSource: string;
  }[];
  newerVersion: { snapshotId: string; extractedAt: string } | null;
};
export default function Practice({ slug }: { slug: string }) {
  const [ranges, setRanges] = useState<{ key: string; listId: string }[]>([]),
    [range, setRange] = useState(''),
    [list, setList] = useState<List | null>(null),
    [error, setError] = useState(''),
    [dismissed, setDismissed] = useState(false),
    [busy, setBusy] = useState(false);
  const [importNotice, setImportNotice] = useState('');
  useEffect(() => {
    const raw = sessionStorage.getItem('leetbycompany.importNotice');
    if (!raw) return;
    try {
      const notice = JSON.parse(raw);
      if (notice.company === slug && typeof notice.message === 'string') {
        setImportNotice(notice.message);
        sessionStorage.removeItem('leetbycompany.importNotice');
      }
    } catch {
      sessionStorage.removeItem('leetbycompany.importNotice');
    }
  }, [slug]);
  const [topic, setTopic] = useState(''),
    [difficulty, setDifficulty] = useState(''),
    [completed, setCompleted] = useState('');
  useEffect(() => {
    let live = true;
    api('/api/me/companies')
      .then((companies) => {
        if (!live) return;
        const c = companies.find((c: any) => c.slug === slug);
        if (!c) throw new Error('This company has not been imported.');
        setRanges(c.recencies);
        const query = new URLSearchParams(location.search).get('recency');
        setRange(
          c.recencies.some((r: any) => r.key === query)
            ? query!
            : c.recencies[0].key,
        );
      })
      .catch((e) => {
        if (live) setError(errorText(e));
      });
    return () => {
      live = false;
    };
  }, [slug]);
  useEffect(() => {
    if (!range) return;
    let live = true;
    setList(null);
    setError('');
    setDismissed(false);
    setTopic('');
    api(`/api/me/lists?company=${encodeURIComponent(slug)}&recency=${range}`)
      .then((value) => {
        if (live) setList(value);
      })
      .catch((e) => {
        if (live) setError(errorText(e));
      });
    return () => {
      live = false;
    };
  }, [slug, range]);
  async function refresh() {
    if (!list?.newerVersion) return;
    setBusy(true);
    try {
      await api(`/api/me/lists/${list.listId}/refresh`, {
        method: 'POST',
        body: JSON.stringify({
          targetSnapshotId: list.newerVersion.snapshotId,
        }),
      });
      setList(await api(`/api/me/lists?company=${slug}&recency=${range}`));
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  async function history(snapshot: string) {
    if (!list) return;
    setBusy(true);
    try {
      setList(await api(`/api/me/lists/${list.listId}/versions/${snapshot}`));
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  async function progress(problem: PracticeProblem) {
    setBusy(true);
    try {
      await api(`/api/me/progress/${problem.problemId}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !problem.completed }),
      });
      setList((current) =>
        current
          ? {
              ...current,
              problems: current.problems.map((p) =>
                p.problemId === problem.problemId
                  ? { ...p, completed: !p.completed }
                  : p,
              ),
            }
          : current,
      );
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  const summary = list ? summarize(list.problems) : null;
  const grouped = list
    ? groupProblems(list.problems, { topic, difficulty, completed })
    : null;
  return (
    <>
      <p className="eyebrow">Your company workspace</p>
      <h1>{list?.company.name ?? slug}</h1>
      <p className="muted">
        Practice by topic. Completion follows you across companies, ranges, and
        versions.
      </p>
      {importNotice && (
        <div className="notice" role="status">
          {importNotice}
        </div>
      )}
      {error && (
        <div role="alert" className="notice error">
          {error}
        </div>
      )}
      <div className="toolbar">
        <label>
          Recency
          <select
            value={range}
            disabled={busy}
            onChange={(e) => setRange(e.target.value)}
          >
            {ranges.map((r) => (
              <option key={r.key} value={r.key}>
                {RECENCIES[r.key]?.label ?? r.key}
              </option>
            ))}
          </select>
        </label>
        <p className="muted">
          Missing a range? Select it on LeetCode, then choose{' '}
          <strong>Build list &amp; start practicing</strong> in the extension.
        </p>
      </div>
      {!list && !error && <p role="status">Loading your list…</p>}
      {list && (
        <>
          {list.newerVersion && !dismissed && (
            <div className="notice">
              <p>
                A newer version of this list is available. Would you like to
                update?
              </p>
              <p className="muted">
                Extracted{' '}
                {new Date(list.newerVersion.extractedAt).toLocaleString()}
              </p>
              <div className="actions">
                <button disabled={busy} onClick={() => void refresh()}>
                  Update list
                </button>
                <button
                  className="secondary"
                  onClick={() => setDismissed(true)}
                >
                  Not now
                </button>
              </div>
            </div>
          )}
          {list.snapshotId !== list.currentSnapshotId && (
            <div className="notice">
              Historical version · completion reflects your current progress.{' '}
              <button
                className="secondary"
                disabled={busy}
                onClick={() => void history(list.currentSnapshotId)}
              >
                Return to current list
              </button>
            </div>
          )}
          <div className="stats">
            <div>
              <strong>{summary?.total}</strong>distinct problems
            </div>
            <div>
              <strong>{summary?.completed}</strong>completed
            </div>
            <div>
              <strong>{summary?.topics.length}</strong>topics
            </div>
          </div>
          <div className="toolbar">
            <label>
              Topic
              <select
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              >
                <option value="">All topics</option>
                {summary?.topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
            <label>
              Difficulty
              <select
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                }}
              >
                <option value="">All difficulties</option>
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <label>
              Completion
              <select
                value={completed}
                onChange={(e) => {
                  setCompleted(e.target.value);
                }}
              >
                <option value="">Any state</option>
                <option value="false">To practice</option>
                <option value="true">Completed</option>
              </select>
            </label>
          </div>
          <p className="muted">
            {grouped?.total} distinct matching problems · source order within
            each topic · extracted{' '}
            {new Date(list.extractedAt).toLocaleDateString()}
          </p>
          <p className="muted">
            Problems can appear in more than one topic. Marking one complete
            updates it everywhere.
          </p>
          <div className="topic-sections">
            {grouped?.groups.map((group) => (
              <details className="topic-section" key={group.topic} open>
                <summary>
                  <span>{group.topic}</span>
                  <span className="topic-count">
                    {group.completed} / {group.problems.length} completed
                  </span>
                </summary>
                <ul className="problem-list">
                  {group.problems.map((p) => (
                    <li
                      className={`problem-row${p.completed ? ' is-complete' : ''}`}
                      key={p.problemId}
                    >
                      <input
                        aria-label={`Mark ${p.title} completed in ${group.topic}`}
                        type="checkbox"
                        checked={p.completed}
                        disabled={busy}
                        onChange={() => void progress(p)}
                      />
                      <div className="problem-name">
                        <a target="_blank" rel="noreferrer" href={p.url}>
                          {p.frontendId ? `${p.frontendId}. ` : ''}
                          {p.title}
                        </a>
                        <div className="problem-topics">
                          {(p.topics.length ? p.topics : ['Uncategorized']).map(
                            (t) => (
                              <button
                                className="tag"
                                key={t}
                                onClick={() => setTopic(t)}
                              >
                                {t}
                              </button>
                            ),
                          )}
                        </div>
                      </div>
                      <span
                        className={`difficulty difficulty-${p.difficulty.toLowerCase()}`}
                      >
                        {p.difficulty}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
          {grouped?.total === 0 && (
            <p role="status">No problems match these filters.</p>
          )}
          <details>
            <summary>Version history</summary>
            <p className="muted">
              Viewing history does not change your current selection.
            </p>
            {list.versions.map((v, i) => (
              <p key={`${v.snapshotId}-${i}`}>
                <button
                  className="secondary"
                  disabled={busy}
                  onClick={() => void history(v.snapshotId)}
                >
                  {new Date(v.extractedAt).toLocaleString()} ·{' '}
                  {v.selectionSource}
                </button>
              </p>
            ))}
          </details>
        </>
      )}
    </>
  );
}
