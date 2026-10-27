require("dotenv").config();
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Student = require("../Models/student");
const User = require("../Models/user");

jest.setTimeout(30000);

let token;

const validStudent = {
  firstName: "Ade",
  lastName: "Bello",
  email: "ade.bello@example.com",
  age: 21,
  gender: "Male",
  department: "Computer Science",
  level: 200,
};

const authHeader = () => ({ Authorization: `Bearer ${token}` });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "studentDB_test" });
  await Student.init();
  await User.init();
  await Student.deleteMany({});
  await User.deleteMany({});
});

beforeEach(async () => {
  await Student.deleteMany({});
});

afterAll(async () => {
  await Student.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Auth", () => {
  const user = {
    name: "Test User",
    email: "test.user@example.com",
    password: "Password123",
  };

  test("registers a user and returns a token", async () => {
    const res = await request(app).post("/auth/register").send(user);
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.password).toBeUndefined();
    token = res.body.token;
  });

  test("rejects a duplicate user email", async () => {
    const res = await request(app).post("/auth/register").send(user);
    expect(res.status).toBe(400);
  });

  test("logs in with the right password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("rejects a wrong password", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: user.email, password: "wrongpassword" });
    expect(res.status).toBe(401);
  });
});

describe("Route protection", () => {
  test("returns 401 without a token", async () => {
    const res = await request(app).get("/students");
    expect(res.status).toBe(401);
  });

  test("returns 401 with an invalid token", async () => {
    const res = await request(app)
      .get("/students")
      .set("Authorization", "Bearer notarealtoken");
    expect(res.status).toBe(401);
  });
});

describe("Students", () => {
  test("registers a student", async () => {
    const res = await request(app)
      .post("/students")
      .set(authHeader())
      .send(validStudent);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(validStudent.email);
    expect(res.body._id).toBeDefined();
  });

  test("rejects invalid student data", async () => {
    const res = await request(app)
      .post("/students")
      .set(authHeader())
      .send({ firstName: "A", email: "abc", age: 200 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation failed");
  });

  test("rejects a duplicate student email", async () => {
    await Student.create(validStudent);
    const res = await request(app)
      .post("/students")
      .set(authHeader())
      .send(validStudent);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Email already exists");
  });

  test("gets all students", async () => {
    await Student.create(validStudent);
    const res = await request(app).get("/students").set(authHeader());
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test("gets one student", async () => {
    const student = await Student.create(validStudent);
    const res = await request(app)
      .get(`/students/${student._id}`)
      .set(authHeader());
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("Ade");
  });

  test("returns 400 for an invalid ID", async () => {
    const res = await request(app).get("/students/123").set(authHeader());
    expect(res.status).toBe(400);
  });

  test("returns 404 for a student that does not exist", async () => {
    const res = await request(app)
      .get("/students/64b7f0f2a1b2c3d4e5f60789")
      .set(authHeader());
    expect(res.status).toBe(404);
  });

  test("updates a student", async () => {
    const student = await Student.create(validStudent);
    const res = await request(app)
      .put(`/students/${student._id}`)
      .set(authHeader())
      .send({ age: 23, level: 300 });
    expect(res.status).toBe(200);
    expect(res.body.age).toBe(23);
    expect(res.body.level).toBe(300);
  });

  test("deletes a student", async () => {
    const student = await Student.create(validStudent);
    const res = await request(app)
      .delete(`/students/${student._id}`)
      .set(authHeader());
    expect(res.status).toBe(200);

    const check = await request(app)
      .get(`/students/${student._id}`)
      .set(authHeader());
    expect(check.status).toBe(404);
  });
});