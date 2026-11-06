// The host supplies the authenticated session and the recipe collection.
export function readRecipe(request, session, recipes) {
  const headers = { 'Cache-Control': 'private, no-store' };
  if (!session?.kitchenId) {
    return Response.json({ error: 'sign-in required' }, { status: 401, headers });
  }

  const id = new URL(request.url).searchParams.get('id');
  const recipe = recipes.find(item => item.id === id && item.kitchenId === session.kitchenId);
  if (!recipe) {
    return Response.json({ error: 'not found' }, { status: 404, headers });
  }

  return Response.json({ id: recipe.id, title: recipe.title }, { headers });
}
