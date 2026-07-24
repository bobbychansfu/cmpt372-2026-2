import { describe, it } from "node:test";
import assert from "node:assert/strict";

import spec from "../src/swagger.ts";

interface OpenApiDoc {
  openapi: string;
  paths: Record<string, Record<string, unknown>>;
  components?: { schemas?: Record<string, unknown> };
}

describe("OpenAPI spec", () => {
  const doc = spec as OpenApiDoc;

  it("is a valid OpenAPI 3 document", () => {
    assert.match(doc.openapi, /^3\./);
  });

  it("documents every route the app exposes", () => {
    assert.ok(doc.paths["/users-api"]?.get, "GET /users-api missing");
    assert.ok(doc.paths["/users-api"]?.post, "POST /users-api missing");
    assert.ok(doc.paths["/users-api/{fname}"]?.delete, "DELETE missing");
    assert.ok(doc.paths["/login"]?.post, "POST /login missing");
  });

  it("defines the User schema", () => {
    assert.ok(doc.components?.schemas?.User, "User schema missing");
  });
});
