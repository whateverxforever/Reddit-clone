const supertest = require("supertest");

const app = require("../../app");

describe("GET /api/v1/users", () => {
  it("should return array of users", async () => {
    const response = await supertest(app)
      .get("/api/v1/users")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual([]);
  });
});
