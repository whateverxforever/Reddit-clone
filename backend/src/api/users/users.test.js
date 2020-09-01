const supertest = require("supertest");

const app = require("../../app");

describe("GET /api/v1/users", () => {
  it("should return array of users", async () => {
    const response = await supertest(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /api/v1/users/1", () => {
  it("should return user with id 1", async () => {
    const response = await supertest(app)
      .get("/api/v1/users/1")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.id).toEqual(1);
  });
});

describe("GET /api/v1/users/-1", () => {
  it("should return a 404 error message", async () => {
    const response = await supertest(app)
      .get("/api/v1/users/-1")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
