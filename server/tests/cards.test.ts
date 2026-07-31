import request from "supertest";
import app from "../app.ts";
import {describe, it, expect} from "vitest";

describe("Cards API", () => {
  it ("GET /api/cards", async () => {
    const res = await request(app).get("/api/cards");
    expect(res.status).toBe(200);  
    expect(Array.isArray(res.body)).toBe(true);  
  });
});