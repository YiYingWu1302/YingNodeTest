var supertest = require("supertest")
// var should = require("should")

var server = supertest.agent("http://localhost:4000")

describe("Sample unit test", () => {
  it("should return home page", (done) => {
    server
    .get("/")
    .expect("Content-type", /json/)
    .expect(200)
    .end ((err, res) => {
      done()
    })
  })
})