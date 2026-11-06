# Requirement R1 — read one kitchen's recipe

The GET handler may return a recipe to an authenticated member of the kitchen that owns it. Membership comes from the session supplied by the server. Ignore kitchen IDs supplied in a query or header: adding either input must not change the status or JSON body of an otherwise permitted read.

The response contract is:

| Request | HTTP status | JSON body |
| --- | --- | --- |
| Authenticated member reads an existing recipe owned by their kitchen | 200 | Exactly the recipe's `id` and `title` fields, with their stored values. No other fields. |
| Unauthenticated request | 401 | Exactly `{"error":"sign-in required"}`. |
| Authenticated member requests another kitchen's recipe or an absent recipe | 404 | Exactly `{"error":"not found"}` in both cases. |

JSON equality means the parsed object's keys and values match; property order and serialization whitespace are not part of this contract. The explicit response schema was confirmed on 2026-11-06; earlier review attempts used the original, less specific wording and their recorded test expectations.

The example calls the handler directly using an in-memory recipe list, synthetic session objects and the standard Request and Response APIs. An actual session issuer, router, network, shared cache and membership revocation policy are outside this fixture. This paragraph defines the limits of the exercise.
