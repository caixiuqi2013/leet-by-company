import test from 'node:test';
import assert from 'node:assert/strict';
import {
  groupProblems,
  summarize,
  type PracticeProblem,
} from '../apps/web/lib/practice';
const rows: PracticeProblem[] = Array.from({ length: 151 }, (_, i) => ({
  problemId: String(i),
  leetcodeId: String(i),
  frontendId: String(i + 1),
  title: `Problem ${i}`,
  url: `https://leetcode.com/problems/problem-${i}/`,
  position: i + 1,
  difficulty: i % 2 ? 'Medium' : 'Easy',
  topics: i === 150 ? [] : ['Array', 'Hash Table'],
  completed: i === 0,
  rank: null,
  frequency: null,
}));
test('all source topics include every matching problem beyond the old page limit', () => {
  const result = groupProblems([...rows].reverse());
  assert.equal(result.total, 151);
  assert.equal(result.groups[0].problems.length, 150);
  assert.equal(result.groups[0].problems[0].position, 1);
  assert.equal(result.groups[0].completed, 1);
  assert.equal(
    result.groups.find((g) => g.topic === 'Uncategorized')?.problems.length,
    1,
  );
});
test('topic, difficulty and completion filters compose without duplicate counts', () => {
  const result = groupProblems([...rows, rows[0]], {
    topic: 'Hash Table',
    difficulty: 'Easy',
    completed: 'true',
  });
  assert.equal(result.total, 1);
  assert.deepEqual(
    result.groups.map((g) => g.topic),
    ['Hash Table'],
  );
  assert.equal(result.groups[0].completed, 1);
  assert.equal(groupProblems(rows, { topic: 'Unknown' }).total, 0);
});

test('study plan topics lead in reference order, with other topics alphabetically last', () => {
  const topics = [
    'Sorting',
    'Dynamic Programming',
    'Heap (Priority Queue)',
    'Hash Table',
    'String',
    'Array',
    'Binary Search',
    'Two Pointers',
    'Matrix',
    'Sliding Window',
    'Graph',
    'Binary Tree',
    'Trie',
    'Bit Manipulation',
    'Math',
    'Backtracking',
    'Divide and Conquer',
    'Stack',
    'Linked List',
    'Binary Search Tree',
    'Greedy',
    'Uncategorized',
  ];
  const problems = topics.map((topic, i) => ({ ...rows[i], topics: [topic] }));
  const expected = [
    'Array',
    'String',
    'Two Pointers',
    'Sliding Window',
    'Matrix',
    'Hash Table',
    'Stack',
    'Linked List',
    'Binary Tree',
    'Binary Search Tree',
    'Graph',
    'Trie',
    'Backtracking',
    'Divide and Conquer',
    'Binary Search',
    'Heap (Priority Queue)',
    'Bit Manipulation',
    'Math',
    'Dynamic Programming',
    'Greedy',
    'Sorting',
    'Uncategorized',
  ];
  assert.deepEqual(
    groupProblems(problems).groups.map((g) => g.topic),
    expected,
  );
  assert.deepEqual(summarize(problems).topics, expected);
  assert.deepEqual(
    problems.map((p) => p.topics[0]),
    topics,
  );
  assert.deepEqual(
    groupProblems(problems, { topic: 'Sorting' }).groups.map((g) => g.topic),
    ['Sorting'],
  );
});
