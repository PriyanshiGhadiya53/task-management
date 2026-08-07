# 📝 Task Management API

A secure Task Management REST API built using **Node.js, Express.js, MongoDB, and JWT Authentication**.

## 🚀 Features

- 👤 User Authentication
  - Register
  - Login
  - Logout
  - Refresh Access Token
  - JWT Authentication

- ✅ Task Management
  - Create Task
  - Get All Tasks
  - Get Single Task
  - Update Task
  - Delete Task

- 🔍 Search Tasks
- 🎯 Filter Tasks
- 📄 Pagination
- 📊 Task Statistics

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Cookie Parser

## ⚙️ Installation

```bash
git clone https://github.com/PriyanshiGhadiya53/task-management.git
cd task-management
npm install
npm run dev
```

## 📌 API Endpoints

| Method | Endpoint |
|---------|----------|
| POST | /api/v1/user/register |
| POST | /api/v1/user/login |
| POST | /api/v1/user/logout |
| POST | /api/v1/user/refresh |
| GET  | /api/v1/task/mytasks |
| POST | /api/v1/task/create |
| GET  | /api/v1/task/task/:taskId |
| PATCH| /api/v1/task/update/:taskId |
| DELETE | /api/v1/task/delete/:taskId |
| GET | /api/v1/task/stats |

## 🔎 Query Examples

```http
GET /api/v1/task/mytasks?search=study
GET /api/v1/task/mytasks?status=pending
GET /api/v1/task/mytasks?page=1&limit=5
```

## 👩‍💻 Author

**Priyanshi Ghadiya**

GitHub: https://github.com/PriyanshiGhadiya53

⭐ If you like this project, please star the repository.
