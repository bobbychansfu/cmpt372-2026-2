import { describe, it, mock, afterEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.ts";
import { db } from "../src/db.ts";
import type { User } from "../src/app.ts";

describe("GET /users-api/db/:fname (mocked database)", () => {
  afterEach(() => mock.restoreAll());

  it("returns the user the database provides", async () => {
    const fake: User = { fname: "Tommy", lname: "Oliver" };

    mock.method(db, "getUserByName", async () => fake); // the magic!

    const res = await request(app).get("/users-api/db/Tommy");

    assert.equal(res.status, 200);
    assert.deepEqual(res.body, fake);
  });

});
