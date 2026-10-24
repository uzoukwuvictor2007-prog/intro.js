# Student Management API

A RESTful API for managing student records, academic performance, attendance, etc. This project is designed to help schools, colleges, and training centers efficiently store, retrieve, update, and manage their student data.

## Overview

The Student Management API provides endpoints for:
- Adding and updating student profiles
- Managing student enrollment and academic status
- Tracking attendance and marks
- Assigning students to courses or departments
- Viewing student summaries and reports
- Managing admin or staff-level access

This project is ideal for learning backend development, API design, and database integration using modern web technologies.

## Features

- Student registration and profile management
- CRUD operations for students
- Course enrollment management
- Attendance tracking
- Grade/marks management
- Department and class management
- Search and filtering by student ID, name, class, department, or status
- Authentication and authorization for admin/staff users
- Validation and error handling for API requests
- Structured JSON responses
- Ready for deployment in a production-like environment

## Tech Stack

Recommended stack:
- Node.js
- Express.js
- MongoDB (or MySQL/PostgreSQL)
- JWT for authentication
- Mongoose (if using MongoDB)
- dotenv for environment configuration
- Nodemon for development

## Project Structure

```bash
student-management-api/
├── config/
│   └── db.js
├── controllers/
│   ├── studentController.js
│   ├── courseController.js
│   ├── attendanceController.js
│   └── authController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── Student.js
│   ├── Course.js
│   ├── Attendance.js
│   └── User.js
├── routes/
│   ├── studentRoutes.js
│   ├── courseRoutes.js
│   ├── attendanceRoutes.js
│   └── authRoutes.js
├── utils/
│   └── responseHelper.js
├── .env
├── app.js
├── server.js
├── package.json
└── README.md
```

## Prerequisites

Before running the project, make sure you have:
- Node.js installed
- npm or yarn installed
- MongoDB or another database service running
- A code editor like VS Code

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd student-management-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the required configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student-management
   JWT_SECRET=your_secret_key
   ```

4. Start the server
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin or staff user
- `POST /api/auth/login` - Login and get a JWT token

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a single student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update student details
- `DELETE /api/students/:id` - Delete a student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance record

### Results / Grades
- `GET /api/results` - Get all student results
- `POST /api/results` - Add student marks
- `PUT /api/results/:id` - Update marks

## Example Request

### Create Student
```http
POST /api/students
Content-Type: application/json
Authorization: Bearer <token>

{
  "studentId": "STU-1001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "department": "Computer Science",
  "className": "BSc-2026",
  "status": "Active"
}
```

### Response
```json
{
  "success": true,
  "message": "Student created successfully",
  "data": {
    "_id": "64d8e9e9d1f3b2f1d2e3a4b5",
    "studentId": "STU-1001",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com"
  }
}
```

## Database Schema (Example)

### Student
```json
{
  "studentId": "STU-1001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "department": "Computer Science",
  "className": "BSc-2026",
  "dateOfBirth": "2003-05-12",
  "status": "Active",
  "createdAt": "2026-10-22T12:00:00Z"
}
```

### Course
```json
{
  "courseCode": "CS101",
  "courseName": "Introduction to Programming",
  "credits": 3,
  "department": "Computer Science"
}
```

## Security

- Use JWT for authentication
- Protect admin-only routes using middleware
- Validate all input data
- Prevent unauthorized access to student records
- Use environment variables for secrets and configuration



## Contributing

Contributions are welcome. If you want to contribute:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is licensed under the MIT License.

## Author

Group 1C / BD Backend

## Contact

For questions or collaboration, reach out on the whatsapp group 
