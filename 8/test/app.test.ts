import { describe, it } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.ts";
import type { User } from "../src/app.ts";

describe("Users", () => {
  it("should list ALL users on /users-api GET", async () => {
    const res = await request(app).get("/users-api");

    assert.equal(res.status, 200);
    assert.match(res.headers["content-type"], /json/);
    assert.ok(Array.isArray(res.body));
  });

  it("should add a SINGLE user on /users-api POST", async () => {
    const res = await request(app)
      .post("/users-api")
      .send({ fname: "John", lname: "Doe" });

    assert.equal(res.status, 200);
    assert.match(res.headers["content-type"], /json/);

    const body = res.body as User[];
    assert.equal(body.length, 1);
    assert.deepEqual(body[0], { fname: "John", lname: "Doe" });
  });

  it("should delete a SINGLE user on /users-api DELETE", async () => {
    const res = await request(app).delete("/users-api/John");

    assert.equal(res.status, 200);
    assert.match(res.headers["content-type"], /json/);
    assert.deepEqual(res.body, []);
  });

  it("should authenticate user on /login POST", async () => {
    const res = await request(app)
      .post("/login")
      .send({ uname: "bobbyc", password: "12345" });

    assert.equal(res.status, 200);
    const cookies = res.get("Set-Cookie") ?? [];
    assert.ok(cookies.some((c) => c.startsWith("session=")));
    assert.equal(res.text, "You are authenticated");
  });

  it("should NOT authenticate user with a wrong password", async () => {
    const res = await request(app)
      .post("/login")
      .send({ uname: "bobbyc", password: "wrong" });

    assert.equal(res.status, 200);
    assert.equal(res.text, "You are not authenticated");
  });
});
