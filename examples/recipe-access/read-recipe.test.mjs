import assert from 'node:assert/strict';
import test from 'node:test';
import { readRecipe } from './read-recipe.mjs';

const recipes = [
  { id: 'r1', kitchenId: 'kitchen-a', title: 'Bean soup' },
  { id: 'r2', kitchenId: 'kitchen-b', title: 'Apple tart' },
];
const memberA = { kitchenId: 'kitchen-a' };

test('T01 member reads own recipe', async () => {
  const result = readRecipe(new Request('https://example.test/recipe?id=r1'), memberA, recipes);
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { id: 'r1', title: 'Bean soup' });
});

test('T02 foreign and absent recipes are indistinguishable even with a forged kitchen ID', async () => {
  const forged = new Request('https://example.test/recipe?id=r2&kitchenId=kitchen-b', {
    headers: { 'X-Kitchen-ID': 'kitchen-b' },
  });
  const foreign = readRecipe(forged, memberA, recipes);
  const absent = readRecipe(new Request('https://example.test/recipe?id=missing'), memberA, recipes);

  assert.equal(foreign.status, 404);
  assert.equal(absent.status, 404);
  const foreignBody = await foreign.json();
  assert.deepEqual(foreignBody, { error: 'not found' });
  assert.deepEqual(await absent.json(), foreignBody);
});

test('T03 anonymous request for a real recipe receives no recipe data', async () => {
  const result = readRecipe(new Request('https://example.test/recipe?id=r1'), null, recipes);
  assert.equal(result.status, 401);
  assert.deepEqual(await result.json(), { error: 'sign-in required' });
});
