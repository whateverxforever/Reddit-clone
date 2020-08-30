const supertest = require("supertest");

const app = require("./app");

describe("GET /", () => {
  it("it should respond with welcome message", async () => {
    const response = await supertest(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.message).toEqual("🐱‍🏍 Reddit clone api home 🐱‍🏍");
  });
});
