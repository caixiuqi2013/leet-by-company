/** Practice projections count distinct problem identities even across overlapping topics. */
import { z } from 'zod';
/** Top Interview 150 section order. Aliases affect sorting only, not classification.
 * Reference: https://leetcode.com/studyplan/top-interview-150/
 */
const STUDY_PLAN_TOPICS = [
  ['Array / String', 'Array', 'String'],
  ['Two Pointers'],
  ['Sliding Window'],
  ['Matrix'],
  ['Hashmap', 'Hash Map', 'Hash Table'],
  ['Intervals'],
  ['Stack'],
  ['Linked List'],
  ['Binary Tree General', 'Binary Tree'],
  ['Binary Tree BFS'],
  ['Binary Search Tree'],
  ['Graph General', 'Graph'],
  ['Graph BFS'],
  ['Trie'],
  ['Backtracking'],
  ['Divide & Conquer', 'Divide and Conquer'],
  ["Kadane's Algorithm"],
  ['Binary Search'],
  ['Heap', 'Heap (Priority Queue)'],
  ['Bit Manipulation'],
  ['Math'],
  ['1D DP', '1D Dynamic Programming', 'Dynamic Programming'],
  ['Multidimensional DP', 'Multidimensional Dynamic Programming'],
];
const topicPriority = new Map(
  STUDY_PLAN_TOPICS.flatMap((names, index) =>
    names.map((name) => [name.toLowerCase(), index] as const),
  ),
);
export function compareTopics(a: string, b: string) {
  return (
    (topicPriority.get(a.toLowerCase()) ?? STUDY_PLAN_TOPICS.length) -
      (topicPriority.get(b.toLowerCase()) ?? STUDY_PLAN_TOPICS.length) ||
    a.localeCompare(b)
  );
}

export const Filters = z
  .object({
    topic: z.string().max(500).optional(),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).optional(),
    completed: z.enum(['true', 'false']).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(50),
  })
  .strict();
export type PracticeProblem = {
  problemId: string;
  title: string;
  url: string;
  leetcodeId: string;
  frontendId: string | null;
  position: number;
  difficulty: string;
  topics: string[];
  completed: boolean;
  rank: number | null;
  frequency: string | number | null;
};
export function summarize(problems: PracticeProblem[]) {
  const unique = [...new Map(problems.map((p) => [p.problemId, p])).values()];
  return {
    total: unique.length,
    completed: unique.filter((p) => p.completed).length,
    topics: [
      ...new Set(
        unique.flatMap((p) => (p.topics.length ? p.topics : ['Uncategorized'])),
      ),
    ].sort(compareTopics),
  };
}
export function filterProblems(
  problems: PracticeProblem[],
  filters: z.infer<typeof Filters>,
) {
  const filtered = problems.filter(
    (p) =>
      (!filters.topic ||
        (p.topics.length ? p.topics : ['Uncategorized']).includes(
          filters.topic,
        )) &&
      (!filters.difficulty || p.difficulty === filters.difficulty) &&
      (!filters.completed || p.completed === (filters.completed === 'true')),
  );
  return {
    problems: filtered.slice(
      (filters.page - 1) * filters.limit,
      filters.page * filters.limit,
    ),
    filteredTotal: filtered.length,
    page: filters.page,
    limit: filters.limit,
    summary: summarize(problems),
  };
}

/** Group the entire matching list using source topics; never invent a primary topic. */
export function groupProblems(
  problems: PracticeProblem[],
  filters: { topic?: string; difficulty?: string; completed?: string } = {},
) {
  const unique = [
    ...new Map(problems.map((p) => [p.problemId, p])).values(),
  ].sort((a, b) => a.position - b.position);
  const matching = unique.filter(
    (p) =>
      (!filters.difficulty || p.difficulty === filters.difficulty) &&
      (!filters.completed || p.completed === (filters.completed === 'true')) &&
      (!filters.topic ||
        (p.topics.length ? p.topics : ['Uncategorized']).includes(
          filters.topic,
        )),
  );
  const groups = new Map<string, PracticeProblem[]>();
  for (const problem of matching) {
    for (const topic of new Set(
      problem.topics.length ? problem.topics : ['Uncategorized'],
    )) {
      if (filters.topic && filters.topic !== topic) continue;
      groups.set(topic, [...(groups.get(topic) ?? []), problem]);
    }
  }
  return {
    total: matching.length,
    groups: [...groups]
      .sort(([a], [b]) => compareTopics(a, b))
      .map(([topic, problems]) => ({
        topic,
        problems,
        completed: problems.filter((p) => p.completed).length,
      })),
  };
}
