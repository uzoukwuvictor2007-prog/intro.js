# Student Management API

A REST API for managing student records, built with Node.js, Express and MongoDB (Mongoose). It supports registering students, viewing, updating and deleting them, and uses JWT login to protect every student route.

**Live API:** https://student-management-api-for-group-1-c.onrender.com


## Features

- Register, view, update and delete students
- Data validation with clear error messages
- User registration and login with hashed passwords (bcryptjs)
- JWT authentication protecting all `/students` routes
- Central error handling with proper status codes
- Automated tests with Jest and Supertest

## Tech stack

Node.js, Express, MongoDB Atlas, Mongoose, bcryptjs, jsonwebtoken, Jest, Supertest

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/uzoukwuvictor2007-prog/intro.js.git
cd intro.js
npm install
```

### 2. Create a `.env` file

Create a file named `.env` in the project root (see `.env.example`):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000
```

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Never commit your `.env` file. In MongoDB Atlas, make sure your IP address is allowed under **Network Access**.

### 3. Run the server

```bash
node server.js
```

You should see `MongoDB connected` and `Server running on port 5000`.

## Student data model

| Field | Type | Rules |
|---|---|---|
| firstName | String | required, 2 to 50 characters |
| lastName | String | required, 2 to 50 characters |
| email | String | required, unique, valid email format, stored in lowercase |
| age | Number | required, 1 to 120 |
| gender | String | required, one of `Male`, `Female`, `Other` |
| department | String | required |
| level | Number | required, one of 100, 200, 300, 400, 500, 600 |

`createdAt` and `updatedAt` are added automatically.

## API endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a user account and receive a token |
| POST | `/auth/login` | Log in and receive a token |

Register body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password123"
}
```

Login body:

```json
{
  "email": "jane@example.com",
  "password": "Password123"
}
```

Response (200):

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOi..."
}
```

Tokens expire after 1 day. Passwords must be at least 6 characters.

### Students (login required)

Send the token in the header of every request:

```
Authorization: Bearer <your_token>
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/students` | Register a new student |
| GET | `/students` | Get all students |
| GET | `/students/:id` | Get one student |
| PUT | `/students/:id` | Update a student |
| DELETE | `/students/:id` | Delete a student |

Example: register a student (`POST /students`)

```json
{
  "firstName": "Ade",
  "lastName": "Bello",
  "email": "ade.bello@example.com",
  "age": 21,
  "gender": "Male",
  "department": "Computer Science",
  "level": 200
}
```

Response (201):

```json
{
  "_id": "64b7f0f2a1b2c3d4e5f60789",
  "firstName": "Ade",
  "lastName": "Bello",
  "email": "ade.bello@example.com",
  "age": 21,
  "gender": "Male",
  "department": "Computer Science",
  "level": 200,
  "createdAt": "2026-10-27T10:00:00.000Z",
  "updatedAt": "2026-10-27T10:00:00.000Z"
}
```

Example: update a student (`PUT /students/:id`). Send only the fields to change:

```json
{
  "age": 22,
  "level": 300
}
```

Example: delete a student (`DELETE /students/:id`). Response (200):

```json
{
  "message": "Student deleted"
}
```

## Error responses

| Status | When | Example response |
|---|---|---|
| 400 | Invalid data | `{ "error": "Validation failed", "details": ["..."] }` |
| 400 | Duplicate email | `{ "error": "Email already exists" }` |
| 400 | Malformed ID | `{ "error": "Invalid student ID" }` |
| 400 | Broken JSON body | `{ "error": "Invalid JSON in request body" }` |
| 401 | Missing, invalid or expired token | `{ "error": "Not authorized, no token provided" }` |
| 401 | Wrong login details | `{ "error": "Invalid email or password" }` |
| 404 | Student not found | `{ "error": "Student not found" }` |
| 404 | Unknown route | `{ "error": "Route not found" }` |
| 500 | Server error | `{ "error": "Something went wrong on the server" }` |

## Testing

Run the automated tests:

```bash
npm test
```

The tests cover registration, login, route protection and every student endpoint (15 tests). They use a separate database called `studentDB_test`, so your real data is not touched. A `test.http` file with sample requests is also included for use with the VS Code REST Client extension.

## Project structure

```
├── Models/
│   ├── student.js        Student schema and validation
│   └── user.js           User schema (password hashing)
├── middleware/
│   ├── auth.js           JWT check for protected routes
│   └── errorHandler.js   Central error handling
├── routes/
│   ├── authRoutes.js     /auth/register and /auth/login
│   └── studentRoutes.js  /students endpoints
├── tests/
│   └── api.test.js       Jest and Supertest tests
├── app.js                Express app setup
├── server.js             Database connection and server start
└── test.http             Sample requests
```

## Team


## Team

|## Team

| Name | Role |
|---|---|
| Olayinka Orisande | Student schema and validation, registration endpoint, view/update/delete endpoints, error handling, login and API protection, automated tests, README |
| Victor | Created the GitHub repository and wrote the initial README |