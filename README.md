Finance Dashboard Backend API

Overview:
This project is a ** RESTful backend API ** for managing financial records and user access control.
It allows users to track ** income and expenses **, while enforcing role-based permissions for different types of users.

The system supports:
1. User authentication
2. Role-based access control (RBAC)
3. Financial record management
4. Dashboard summaries for financial insights

The goal of this project is to demonstrate backend architecture, API design, and access control implementation using Node.js and MongoDB.

Tech Stack:
1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT (JSON Web Tokens) for authentication
6. bcryptjs for password hashing


Project Structure:
finance-dashboard-backend
│
├── controllers
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── record.controller.js
│   └── dashboard.controller.js
│
├── middleware
│   ├── auth.js
│   └── rbac.js
│
├── models
│   ├── User.js
│   └── FinancialRecord.js
│
├── routes
│   ├── auth.js
│   ├── user.js
│   ├── record.js
│   └── dashboard.js
│
├── .env
├── app.js
└── package.json

User Roles:-
The system supports three types of users:

| Role    | Permissions                                               |
| ------- | --------------------------------------------------------- |
| Viewer  | Can view financial records                                |
| Analyst | Can view records and dashboard summaries                  |
| Admin   | Full access including user management and record creation |

Installation:

1. Clone the repository

git clone <repository-url>

2. Install dependencies using:

npm install

3. Create a `.env` file with:

PORT=8080
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key

4. Start the server using:
node app.js

Server will start at:
http://localhost:8080


Authentication:-
Authentication is handled using JWT tokens.
After logging in, the server returns a token which must be included in request headers.


API Endpoints:-

Authentication:

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/auth/register` | Register a new user         |
| POST   | `/api/auth/login`    | Login and receive JWT token |


User Management (Admin Only):

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/users`            | Get all users              |
| GET    | `/api/users/:id`        | Get a single user          |
| PATCH  | `/api/users/:id/role`   | Update user role           |
| PATCH  | `/api/users/:id/status` | Activate / deactivate user |
| DELETE | `/api/users/:id`        | Delete user                |


Financial Records:

| Method | Endpoint           | Access              |
| ------ | ------------------ | ------------------- |
| GET    | `/api/records`     | All logged-in users |
| GET    | `/api/records/:id` | All logged-in users |
| POST   | `/api/records`     | Admin only          |
| PUT    | `/api/records/:id` | Admin only          |
| DELETE | `/api/records/:id` | Admin only          |


Dashboard:-
| Method | Endpoint                    | Access         |
| ------ | --------------------------- | -------------- |
| GET    | `/api/dashboard/summary`    | Analyst, Admin |
| GET    | `/api/dashboard/categories` | Analyst, Admin |
| GET    | `/api/dashboard/recent`     | Analyst, Admin |


Key Features:
1. JWT-based authentication
2. Role-based access control
3. Financial record filtering
4. Soft deletion of records
5. Dashboard financial summaries
6. Secure password hashing

Assumptions:
1. Only admins can create or modify financial records.
2. Deleted records are **soft deleted** and not permanently removed from the database.
3. JWT tokens expire after 7 days.

Future Improvements:-

Possible improvements that could be added:
* Pagination for large record lists
* API documentation using Swagger
* Unit tests for controllers
* Rate limiting for security
* Docker containerization

Author:
Prince Gupta

This project was developed as part of a backend development assignment to demonstrate API design, database modeling, and access control implementation.# Finance-Dashboard-Backend
