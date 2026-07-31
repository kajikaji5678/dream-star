import request from "supertest";
import app from "../app.ts";
import { describe, it, expect } from "vitest";

describe("Cards API", () => {
  it("GET /api/cards", async () => {
    const res = await request(app).get("/api/cards");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/cards/:id", async () => {
    const list = await request(app).get("/api/cards");
    const id = list.body[0].id;
    const res = await request(app).get(`/api/cards/${id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  })

  it("GET /api/cards/:id 404", async () => {
    const res = await request(app).get("/api/cards/99999");

    expect(res.status).toBe(404);
  });

  it("GET /api/cards/:id 400", async () => {
    const res = await request(app).get("/api/cards/abc");

    expect(res.status).toBe(400);
  })
});

