import request from "supertest";
import app from "../app.ts";
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../prisma.ts";

describe("Cards API", () => {

  let createdCardIds: number[] = [];

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
  });

  it("POST /api/cards/", async () => {
    const res = await request(app)
      .post("/api/cards")
      .send({
        name: "test",
        imageUrl: "test.png",
        rarity: "1"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("test");
    expect(res.body.rarity).toBe("1");
    createdCardIds.push(res.body.id);
  });

  it("POST /api/cards/ 400", async () => {
    const res = await request(app)
      .post("/api/cards")
      .send({
        imageUrl: "test.png",
        rarity: "1"
      });

    expect(res.status).toBe(400);
  });

  it("POST /api/cards/ 400", async () => {
    const res = await request(app)
      .post("/api/cards")
      .send({
        name: "test",
      });

    expect(res.status).toBe(400);
  });

  it("PUT /api/cards/:id ", async () => {
    const list = await request(app).get("/api/cards");
    const id = list.body[0].id;
    const res = await request(app)
      .put(`/api/cards/${id}`)
      .send({
        name: "update",
        imageUrl: "update.png",
        rarity: "1",
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("update");
    expect(res.body.rarity).toBe("1");
    createdCardIds.push(res.body.id);
  });

  it("PUT /api/cards/:id 404", async () => {
    const res = await request(app)
      .put(`/api/cards/999999`)
      .send({
        name: "update",
        imageUrl: "update.png",
        rarity: "1",
      });

    expect(res.status).toBe(404);
  });

  it("PUT /api/cards/:id 400", async () => {
    const list = await request(app).get("/api/cards");
    const id = list.body[0].id;
    const res = await request(app)
      .put(`/api/cards/${id}`)
      .send({
        imageUrl: "update.png",
        rarity: "1",
      });

    expect(res.status).toBe(400);
  });

    it("PUT /api/cards/:id 400", async () => {
    const list = await request(app).get("/api/cards");
    const id = list.body[0].id;
    const res = await request(app)
      .put(`/api/cards/${id}`)
      .send({
        name: "test",
        imageUrl: "update.png",
      });

    expect(res.status).toBe(400);
  });

  afterAll(async () => {
    if (createdCardIds) {
      for (const id of createdCardIds) {
        await prisma.card.delete({
          where: { id },
        });
      }
    }
    await prisma.$disconnect();
  })
});

