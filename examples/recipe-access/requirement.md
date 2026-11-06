# Requirement R1 — read one kitchen's recipe

The GET handler may return a recipe to an authenticated member of the kitchen that owns it. Membership comes from the session supplied by the server. Ignore kitchen IDs supplied in a query or header. An unauthenticated request must receive HTTP 401. A request for another kitchen's recipe must have the same status and JSON body as a request for an absent recipe.

The example calls the handler directly using an in-memory recipe list, synthetic session objects and the standard Request and Response APIs. An actual session issuer, router, network, shared cache and membership revocation policy are outside this fixture. This paragraph defines the limits of the exercise.
