const supertest = require("supertest");

const app = require("../app");

describe("GET /api/v1", () => {
  it("should return welcoming message of api", async () => {
    const response = await supertest(app)
      .get("/api/v1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toEqual(
      "🐱‍👤 Reddit clone v1 api home 🐱‍👤"
    );
  });
});
